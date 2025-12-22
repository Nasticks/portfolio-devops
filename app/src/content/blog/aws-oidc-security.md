---
title: "Arrêtez d'utiliser des Access Keys : Authentification AWS sécurisée avec GitHub OIDC"
description: "Comment j'ai sécurisé mon pipeline CI/CD en supprimant définitivement les clés d'accès longue durée grâce à OpenID Connect."
pubDate: 2025-01-10
author: "Nasticks"
image: 
  url: "https://docs.github.com/assets/cb-35799/images/help/actions/aws-oidc-diagram.png"
  alt: "Schéma OIDC GitHub AWS"
tags: ["Sécurité", "AWS", "GitHub Actions", "DevSecOps"]
---

En tant qu'ingénieur DevOps, la gestion des secrets est souvent notre cauchemar. Qui n'a jamais eu peur de commiter par erreur une paire de clés `AWS_ACCESS_KEY_ID` et `AWS_SECRET_ACCESS_KEY` ?

Pour mon portfolio, j'ai décidé d'appliquer une politique **"Zéro Clé Longue Durée"**. Voici comment j'ai connecté GitHub Actions à AWS en utilisant le protocole **OIDC (OpenID Connect)**.

## Le Problème des Clés Classiques

Traditionnellement, pour que GitHub puisse déployer sur AWS, on crée un utilisateur IAM, on génère des clés, et on les stocke dans les "Secrets" du repository.

**Les risques sont majeurs :**
1.  **Rotation difficile :** On oublie souvent de changer ces clés régulièrement.
2.  **Fuite possible :** Si un script malveillant tourne dans la CI, il peut exfiltrer ces clés.
3.  **Maintenance :** C'est une charge mentale inutile.

## La Solution : OIDC (Identity Federation)

L'idée est simple : Au lieu de donner une clé (comme un double des clés de chez vous) à GitHub, on lui donne un **badge temporaire**.

1.  GitHub Actions demande un jeton (Token) à son propre fournisseur d'identité.
2.  Il présente ce jeton à AWS.
3.  AWS vérifie la signature et l'origine (ex: "Cela vient bien du repo `Nasticks/portfolio-devops`").
4.  Si tout est bon, AWS délivre des credentials temporaires valables uniquement pour la durée du job.

## L'Implémentation Terraform

J'ai tout codé en Terraform pour que ce soit reproductible.

```hcl
# 1. On déclare GitHub comme fournisseur de confiance
resource "aws_iam_openid_connect_provider" "github" {
  url             = "[https://token.actions.githubusercontent.com](https://token.actions.githubusercontent.com)"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1"]
}

# 2. On crée un Rôle que GitHub pourra "endosser" (AssumeRole)
resource "aws_iam_role" "github_actions" {
  name = "portfolio-devops-github-actions"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRoleWithWebIdentity"
      Effect = "Allow"
      Principal = {
        Federated = aws_iam_openid_connect_provider.github.arn
      }
      Condition = {
        StringLike = {
          # Sécurité CRITIQUE : Seul MON repo peut utiliser ce rôle
          "token.actions.githubusercontent.com:sub" = "repo:Nasticks/portfolio-devops:*"
        }
      }
    }]
  })
}
```
Le Résultat
Dans mon pipeline GitHub Actions, je n'ai plus aucun secret à gérer. Juste une configuration propre :

```
permissions:
  id-token: write # Indispensable pour demander le token OIDC

steps:
  - name: Configure AWS Credentials
    uses: aws-actions/configure-aws-credentials@v4
    with:
      role-to-assume: arn:aws:iam::123456789:role/portfolio-devops-github-actions
      aws-region: eu-north-1
``` 
C'est plus sûr, plus propre, et c'est exactement le genre de standard "Enterprise-Grade" qu'on attend d'une infrastructure moderne.
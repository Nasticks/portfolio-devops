---
title: "FinOps : Héberger une infrastructure Cloud Native pour 0€/mois"
description: "Comment j'exploite le Free Tier AWS et l'optimisation statique pour avoir une disponibilité de 99.9% sans sortir la carte bleue."
pubDate: 2025-01-20
author: "Nasticks"
image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1000"
tags: ["FinOps", "AWS", "Terraform", "Optimisation"]
---

Dans le Cloud, il est très facile de laisser tourner des services comme un compteur de taxi. Une instance EC2 oubliée, un Load Balancer non utilisé, et la facture grimpe.

Pour mon portfolio, je me suis fixé une contrainte stricte : **Coût Zéro.**

Voici comment j'ai architecturé ma solution pour rester dans le "Free Tier" d'AWS tout en gardant des performances professionnelles.

## 1. Le choix du "Serverless Static" vs Conteneurs

Mon premier réflexe aurait été de déployer un conteneur Docker sur ECS ou EKS.
* **Coût ECS/Fargate :** Minimum ~15-20$/mois (pour le Control Plane + ressources).
* **Coût S3 Website Hosting :** Quelques centimes par Go (et gratuit la première année).

En choisissant de générer un site statique avec **Astro** et de l'héberger sur **S3**, je supprime totalement le coût de "calcul" (Compute). Je ne paie que pour le stockage (quasi nul pour du texte/images compressées).

## 2. Terraform pour les Budgets (AWS Budgets)

La peur du "Bill Shock" (la facture surprise) est réelle. J'ai utilisé Terraform pour configurer une alerte budgétaire automatique.

```hcl
resource "aws_budgets_budget" "zero_cost" {
  name              = "budget-zero-limit"
  budget_type       = "COST"
  limit_amount      = "1.0" # Alerte dès 1$
  limit_unit        = "USD"
  time_unit         = "MONTHLY"

  notification {
    comparison_operator = "GREATER_THAN"
    threshold           = 80
    threshold_type      = "PERCENTAGE"
    notification_type   = "ACTUAL"
    subscriber_email_addresses = [var.billing_email]
  }
}
```
C'est du FinOps as Code. Si mon trafic explose (attaque DDoS ou buzz soudain), je suis alerté avant d'être ruiné.

3. ## Optimisation de la Bande Passante
AWS facture la sortie de données (Egress) après les 100 Go gratuits. Pour protéger mon bucket S3, j'utilise une stratégie de mise en cache agressive :

Les assets (images, CSS) sont compressés à la build.

(Optionnel) L'ajout de Cloudflare devant S3 permet d'absorber 90% du trafic gratuitement grâce à leur CDN, évitant que les requêtes ne touchent AWS.

## Conclusion
La performance ne coûte pas forcément cher. En comprenant les modèles de facturation Cloud et en adaptant l'architecture (Static vs Dynamic), on peut obtenir une infrastructure résiliente et gratuite.
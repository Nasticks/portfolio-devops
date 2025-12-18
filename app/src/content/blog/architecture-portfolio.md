---
title: "Architecture Cloud Native : Mon Portfolio avec AWS, Terraform et Astro"
description: "Comment j'ai déployé un site statique haute performance en utilisant l'Infrastructure as Code et une pipeline CI/CD moderne."
pubDate: 2025-12-18
author: "Nasticks"
tags: ["DevOps", "AWS", "Terraform", "CI/CD", "Astro"]
image: ""
---

## 🎯 L'Objectif

En tant qu'ingénieur DevOps, mon portfolio ne devait pas être une simple page web. Il devait être la **démonstration vivante** de mes compétences.

Je me suis fixé trois contraintes :
1.  **Performance** : Le site doit charger instantanément.
2.  **Automatisation** : Aucun déploiement manuel (ClickOps interdit !).
3.  **Infrastructure as Code** : Toute l'infra doit être reproductible via Terraform.

---

## 🏗️ L'Architecture

J'ai opté pour une architecture **Serverless Statique** pour réduire les coûts et maximiser la sécurité.

**Le flux est le suivant :**
1.  Le code est hébergé sur **GitHub**.
2.  **GitHub Actions** construit le site (Build) et le teste.
3.  L'artefact est déployé sur un **Bucket AWS S3**.
4.  **Cloudflare** gère le DNS, le SSL et le cache (CDN) devant S3.

<pre class="mermaid">
graph LR
    User(Visiteur) --> CF[Cloudflare CDN]
    CF --> S3[AWS S3 Bucket]
    
    subgraph Pipeline [CI/CD Pipeline]
        Git[GitHub] --> Action[GitHub Actions]
        Action -->|Build & Deploy| S3
    end
</pre>

---

## 🛠️ La Stack Technique

### 1. Le Framework : Astro 🚀
Pourquoi Astro ? Contrairement à React ou Next.js qui envoient beaucoup de JavaScript au navigateur, Astro génère du **HTML statique pur** par défaut. Résultat : un site ultra-léger et rapide, parfait pour le SEO et l'expérience utilisateur.

### 2. Infrastructure as Code : Terraform 💜
Plutôt que de créer le bucket S3 à la main dans la console AWS, j'ai tout défini en HCL (HashiCorp Configuration Language).

Voici un extrait de mon `main.tf` :

```hcl
resource "aws_s3_bucket" "portfolio" {
  bucket = "nasticks.me"

  tags = {
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}

resource "aws_s3_bucket_website_configuration" "portfolio" {
  bucket = aws_s3_bucket.portfolio.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}
````
### 3. Pipeline CI/CD : GitHub Actions 🤖

L'automatisation est le cœur du métier DevOps. Chaque `git push` déclenche un workflow qui :

* Installe les dépendances (`npm install`).
* Construit le site (`npm run build`).
* Synchronise les fichiers vers AWS S3.

Extrait de mon workflow `.github/workflows/deploy.yml` :

```yaml
name: Deploy to AWS S3
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Astro Site
        run: |
          npm install
          npm run build
      - name: Deploy to S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --acl public-read --follow-symlinks --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```


### 📊 Monitoring & Observabilité
Un bon DevOps ne déploie pas à l'aveugle. J'ai mis en place une stack de monitoring externe hébergée sur un VPS séparé pour surveiller la disponibilité du site.
- Uptime Kuma : Vérifie toutes les 60 secondes que le site répond (HTTP 200).
- Traefik : Gère le routage et les certificats SSL du VPS de monitoring.

### 💡 Conclusion
Ce projet m'a permis de consolider mes connaissances sur l'écosystème AWS et l'automatisation moderne. La migration vers Astro a divisé par 4 le temps de chargement par rapport à mon ancienne version.

Le code source complet est disponible sur mon GitHub (lien dans le header). N'hésitez pas à me contacter pour discuter infrastructure !

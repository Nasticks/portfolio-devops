# 🚀 Portfolio DevOps : Astro + AWS + Terraform

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Nasticks/portfolio-devops/deploy.yml?label=Build%20%26%20Deploy&style=for-the-badge)
![Terraform](https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Astro](https://img.shields.io/badge/astro-%232C2052.svg?style=for-the-badge&logo=astro&logoColor=white)

Ce projet est un portfolio technique et une preuve de concept (POC) d'une architecture **GitOps** moderne et sécurisée.
Il démontre l'automatisation complète du déploiement d'un site statique sur AWS sans utiliser de clés d'accès longue durée (Passwordless).

---

## 🏗 Architecture

Le déploiement est piloté par **GitHub Actions**. La sécurité est assurée par une fédération d'identité **OIDC**, permettant à GitHub d'assumer un rôle IAM temporaire uniquement le temps du déploiement.

```mermaid
flowchart LR
    User([👤 Utilisateur]) -- HTTP --> S3["🪣 AWS S3 Bucket\n(Static Website Hosting)"]
    
    subgraph CI_CD ["🔄 GitHub Actions CI/CD"]
        direction TB
        Code["📦 Checkout Code"] --> Build["🛠 Build Astro"]
        Build --> Auth["🔑 Auth OIDC"]
        Auth --> Deploy["🚀 S3 Sync"]
    end
    
    subgraph AWS_Cloud ["☁️ AWS Cloud"]
        IAM["🛡 IAM OIDC Provider"]
        Role["👮 IAM Role"]
        Budget["💰 AWS Budgets"]
    end
    
    CI_CD -- 1. Request Token --> IAM
    IAM -- 2. Trust Policy (Repo Check) --> Role
    CI_CD -- 3. Assume Role --> Role
    Role -- 4. Write Permissions --> S3
    
    style S3 fill:#FF9900,stroke:#232F3E,color:white
    style CI_CD fill:#2088FF,stroke:#24292E,color:white
    style IAM fill:#DD344C,stroke:#232F3E,color:white




## 🛠 Stack Technique

| Domaine | Technologie | Usage |
| :--- | :--- | :--- |
| **Frontend** | [Astro](https://astro.build/) | Framework web performant pour sites statiques. |
| **IaC** | [Terraform](https://www.terraform.io/) | Provisioning de l'infrastructure (S3, IAM, Budgets). |
| **CI/CD** | GitHub Actions | Pipeline d'intégration et déploiement continu. |
| **Sécurité** | AWS IAM OIDC | Authentification sans clés d'accès permanentes. |
| **FinOps** | AWS Budgets | Alerting automatique en cas de dépassement de coûts. |

📂 Structure du Projet (Monorepo)
Le projet suit une séparation stricte entre le code applicatif et le code d'infrastructure.

.
├── app/                  # 📦 Code source de l'application (Site Astro)
│   ├── src/              # Pages et composants
│   └── package.json
├── infra/                # ☁️ Infrastructure as Code (Terraform)
│   ├── main.tf           # Configuration principale
│   ├── github_oidc.tf    # Configuration de la sécurité OIDC
│   └── billing.tf        # Configuration du budget AWS
└── .github/workflows/    # ⚙️ Pipeline CI/CD (YAML)

## 🚀 Déploiement Automatisé

Le pipeline suit la philosophie **GitOps**. Aucune action manuelle n'est requise pour la mise en production.

1.  **Déclencheur :** Tout `git push` sur la branche `main`.
2.  **Workflow :**
    * Installation des dépendances (`npm ci`).
    * Construction du site statique (`npm run build`).
    * Authentification AWS via OIDC (Role Assumption).
    * Synchronisation des fichiers vers le Bucket S3.

## 🚧 Roadmap & Limitations Connues

* **CDN (CloudFront) :** L'architecture actuelle expose directement le S3 via son endpoint web statique. Une migration vers **CloudFront (CDN) + ACM (HTTPS)** est prévue.
    * *Raison :* Limitation temporaire sur les nouveaux comptes AWS empêchant la création immédiate de distributions CloudFront.
* **Tests E2E :** Ajout de tests Cypress ou Playwright dans le pipeline.

## ✍️ Auteur

Projet réalisé dans le cadre d'une montée en compétences DevOps.
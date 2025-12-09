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
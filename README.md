# Portfolio Cloud Native & DevOps 🚀

[![Production Pipeline](https://github.com/Nasticks/portfolio-devops/actions/workflows/deploy.yml/badge.svg)](https://github.com/Nasticks/portfolio-devops/actions/workflows/deploy.yml)
[![Infrastructure](https://img.shields.io/badge/Infrastructure-Terraform-purple)](https://www.terraform.io/)
[![Cloud Provider](https://img.shields.io/badge/Provider-AWS-orange)](https://aws.amazon.com/)
[![Built With](https://img.shields.io/badge/Built%20With-Astro-ff5a03)](https://astro.build/)

Ce dépôt héberge l'infrastructure et le code source de mon portfolio professionnel.
Il sert de **Preuve de Concept (POC)** pour démontrer une approche moderne du DevOps : **GitOps, Infrastructure as Code (IaC) et Automatisation SRE.**

🔗 **Site en ligne :** [https://nasticks.me](https://nasticks.me)

---

## 🏗️ Architecture Technique

Le projet repose sur une architecture **Serverless** hébergée sur AWS, entièrement provisionnée par code.

```mermaid
graph TD
    User([Utilisateur]) -->|HTTPS| S3[AWS S3 Bucket<br>(Hosting)]
    
    subgraph "CI/CD Factory (GitHub Actions)"
        Code[Code Source] -->|Push| CI[Pipeline CI/CD]
        CI -->|Terraform Plan/Apply| AWS[AWS Infrastructure]
        CI -->|Build & Sync| Content[Contenu Statique]
        CI -->|Playwright| Test[Tests E2E & Monitoring]
    end
    
    subgraph "Sécurité & State"
        OIDC[OpenID Connect<br>(Sans clés d'accès)]
        State[S3 Bucket<br>(Terraform State)]
        Lock[DynamoDB<br>(State Locking)]
    end

    CI -.->|Auth OIDC| OIDC
    AWS -.->|Store State| State
    AWS -.->|Lock| Lock
````

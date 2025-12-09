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

    Architecte DevOps Senior
Gem personnalisé
C'est très simple. En Markdown (le langage du fichier README.md), les tableaux se dessinent avec des barres verticales | et des tirets -.

Tu n'as pas besoin d'un éditeur spécial. Tu dois juste écrire le texte avec la bonne ponctuation.

Voici le code exact pour générer le tableau "Stack Technique" de ta capture d'écran, ainsi que le reste du fichier complet (avec le diagramme Mermaid corrigé).

1. Le code du tableau seul (pour comprendre)
Voici ce que tu dois écrire pour obtenir le tableau :

Markdown
## 🛠 Stack Technique

| Domaine | Technologie | Usage |
| :--- | :--- | :--- |
| **Frontend** | [Astro](https://astro.build/) | Framework web performant pour sites statiques. |
| **IaC** | [Terraform](https://www.terraform.io/) | Provisioning de l'infrastructure (S3, IAM, Budgets). |
| **CI/CD** | GitHub Actions | Pipeline d'intégration et déploiement continu. |
| **Sécurité** | AWS IAM OIDC | Authentification sans clés d'accès permanentes. |
| **FinOps** | AWS Budgets | Alerting automatique en cas de dépassement de coûts. |
Ligne 1 : Les titres des colonnes séparés par |.

Ligne 2 : | :--- | définit l'alignement (à gauche) et crée la ligne de séparation.

Lignes suivantes : Le contenu. Les crochets []() servent à faire des liens cliquables.

2. Le fichier README.md COMPLET et FINAL
Pour être sûr que tout soit parfait (le diagramme Mermaid corrigé avec les guillemets + le tableau + les badges), je te conseille de supprimer tout le contenu de ton fichier actuel et de coller ce bloc entier à la place :

Markdown
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
🛠 Stack Technique
Domaine	Technologie	Usage
Frontend	Astro	Framework web performant pour sites statiques.
IaC	Terraform	Provisioning de l'infrastructure (S3, IAM, Budgets).
CI/CD	GitHub Actions	Pipeline d'intégration et déploiement continu.
Sécurité	AWS IAM OIDC	Authentification sans clés d'accès permanentes.
FinOps	AWS Budgets	Alerting automatique en cas de dépassement de coûts.
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

Architecte DevOps Senior
Gem personnalisé
C'est très simple. En Markdown (le langage du fichier README.md), les tableaux se dessinent avec des barres verticales | et des tirets -.

Tu n'as pas besoin d'un éditeur spécial. Tu dois juste écrire le texte avec la bonne ponctuation.

Voici le code exact pour générer le tableau "Stack Technique" de ta capture d'écran, ainsi que le reste du fichier complet (avec le diagramme Mermaid corrigé).

1. Le code du tableau seul (pour comprendre)
Voici ce que tu dois écrire pour obtenir le tableau :

Markdown
## 🛠 Stack Technique

| Domaine | Technologie | Usage |
| :--- | :--- | :--- |
| **Frontend** | [Astro](https://astro.build/) | Framework web performant pour sites statiques. |
| **IaC** | [Terraform](https://www.terraform.io/) | Provisioning de l'infrastructure (S3, IAM, Budgets). |
| **CI/CD** | GitHub Actions | Pipeline d'intégration et déploiement continu. |
| **Sécurité** | AWS IAM OIDC | Authentification sans clés d'accès permanentes. |
| **FinOps** | AWS Budgets | Alerting automatique en cas de dépassement de coûts. |
Ligne 1 : Les titres des colonnes séparés par |.

Ligne 2 : | :--- | définit l'alignement (à gauche) et crée la ligne de séparation.

Lignes suivantes : Le contenu. Les crochets []() servent à faire des liens cliquables.

2. Le fichier README.md COMPLET et FINAL
Pour être sûr que tout soit parfait (le diagramme Mermaid corrigé avec les guillemets + le tableau + les badges), je te conseille de supprimer tout le contenu de ton fichier actuel et de coller ce bloc entier à la place :

Markdown
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
🛠 Stack Technique
Domaine	Technologie	Usage
Frontend	Astro	Framework web performant pour sites statiques.
IaC	Terraform	Provisioning de l'infrastructure (S3, IAM, Budgets).
CI/CD	GitHub Actions	Pipeline d'intégration et déploiement continu.
Sécurité	AWS IAM OIDC	Authentification sans clés d'accès permanentes.
FinOps	AWS Budgets	Alerting automatique en cas de dépassement de coûts.
📂 Structure du Projet (Monorepo)
Le projet suit une séparation stricte entre le code applicatif et le code d'infrastructure.

Bash
.
├── app/                  # 📦 Code source de l'application (Site Astro)
│   ├── src/              # Pages et composants
│   └── package.json
├── infra/                # ☁️ Infrastructure as Code (Terraform)
│   ├── main.tf           # Configuration principale
│   ├── github_oidc.tf    # Configuration de la sécurité OIDC
│   └── billing.tf        # Configuration du budget AWS
└── .github/workflows/    # ⚙️ Pipeline CI/CD (YAML)
🚀 Déploiement Automatisé
Le pipeline suit la philosophie GitOps. Aucune action manuelle n'est requise pour la mise en production.

Déclencheur : Tout git push sur la branche main.

Workflow :

Installation des dépendances (npm ci).

Construction du site statique (npm run build).

Authentification AWS via OIDC (Role Assumption).

Synchronisation des fichiers vers le Bucket S3.

🚧 Roadmap & Limitations Connues
CDN (CloudFront) : L'architecture actuelle expose directement le S3 via son endpoint web statique. Une migration vers CloudFront (CDN) + ACM (HTTPS) est prévue.

Raison : Limitation temporaire sur les nouveaux comptes AWS empêchant la création immédiate de distributions CloudFront.

Tests E2E : Ajout de tests Cypress ou Playwright dans le pipeline.

✍️ Auteur
Projet réalisé dans le cadre d'une montée en compétences DevOps.
## Action à faire :

1.  Copie tout le bloc ci-dessus.
2.  Colle-le dans ton `README.md`.
3.  Commit et Push :
    ```bash
    git add README.md
    git commit -m "docs: complete readme with table and fixed diagram"
    git push
    ```

Une fois sur GitHub, tu verras le tableau, le diagramme et les badges s'afficher parfaitement comme sur tes captures !
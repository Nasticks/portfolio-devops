terraform {
  required_providers {
    # On stabilise sur la version 5 pour éviter les breaking changes de la v6 pour l'instant
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
  }

  backend "s3" {
    bucket = "tf-state-portfolio-nasticks-dev"
    key    = "portfolio/terraform.tfstate"
    region = "eu-north-1"

    # --- AJOUTS DE SÉCURITÉ (OBLIGATOIRES) ---
    dynamodb_table = "terraform-lock" # La table que tu as créée via CLI
    encrypt        = true             # Chiffre tes données sensibles sur S3
  }
}

provider "aws" {
  region = "eu-north-1"
  default_tags {
    tags = {
      Project     = "Portfolio-DevOps"
      ManagedBy   = "Terraform"
      Environment = "Production"
    }
  }
}

provider "github" {
  token = var.github_token
}

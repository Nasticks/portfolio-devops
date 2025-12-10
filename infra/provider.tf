terraform {
  required_providers {
    # ON CHANGE ICI : On accepte la version 6
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
  }

  backend "s3" {
    # Vérifie que c'est bien le nom de ton bucket d'état ici
    bucket = "tf-state-portfolio-nasticks-dev"
    key    = "portfolio/terraform.tfstate"
    region = "eu-north-1"
  }
} # <--- C'EST CETTE ACCOLADE QUI MANQUAIT !

# Les providers doivent être en dehors du bloc terraform {}
provider "aws" {
  region = "eu-north-1"
  default_tags {
    tags = {
      Project = "Portfolio-DevOps"
    }
  }
}

provider "github" {
  token = var.github_token
}

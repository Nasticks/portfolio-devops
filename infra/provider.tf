terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
    # Suppression du provider "github" qui causait le conflit
  }

  backend "s3" {
    bucket         = "tf-state-portfolio-nasticks-dev"
    key            = "portfolio/terraform.tfstate"
    region         = "eu-north-1"
    dynamodb_table = "terraform-lock"
    encrypt        = true
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

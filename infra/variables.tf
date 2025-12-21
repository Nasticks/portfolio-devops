variable "billing_email" {
  description = "L'adresse email qui recevra les alertes de budget AWS"
  type        = string
  # Pas de défaut -> fourni via TF_VAR_billing_email dans le pipeline
}

variable "project_name" {
  description = "Nom du projet pour les tags"
  type        = string
  default     = "Portfolio-DevOps"
}

# Suppression des variables github_token et github_repo

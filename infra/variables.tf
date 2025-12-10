variable "billing_email" {
  description = "L'adresse email qui recevra les alertes de budget AWS"
  type        = string
  # Pas de valeur par défaut pour te forcer à la définir
}

variable "project_name" {
  description = "Nom du projet pour les tags"
  type        = string
  default     = "Portfolio-DevOps"
}
variable "github_token" {
  description = "Token d'accès personnel GitHub (PAT)"
  type        = string
  sensitive   = true # Masque la valeur dans les logs
}

variable "github_repo" {
  description = "Nom du dépôt GitHub (ex: portfolio-devops)"
  type        = string
  default     = "portfolio-devops"
}

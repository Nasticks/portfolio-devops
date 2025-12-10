# Récupération automatique de ton dépôt existant
data "github_repository" "portfolio" {
  full_name = "Nasticks/${var.github_repo}" # Remplace 'Nasticks' si besoin
}

# 1. Secret AWS_S3_BUCKET
resource "github_actions_secret" "s3_bucket" {
  repository      = data.github_repository.portfolio.name
  secret_name     = "AWS_S3_BUCKET"
  plaintext_value = aws_s3_bucket.website.id
}

# 2. Secret AWS_ROLE_ARN
resource "github_actions_secret" "role_arn" {
  repository      = data.github_repository.portfolio.name
  secret_name     = "AWS_ROLE_ARN"
  plaintext_value = aws_iam_role.github_actions.arn
}

# 3. Secret AWS_REGION
resource "github_actions_secret" "aws_region" {
  repository      = data.github_repository.portfolio.name
  secret_name     = "AWS_REGION"
  plaintext_value = "eu-north-1" # Ou var.aws_region si tu as une variable
}

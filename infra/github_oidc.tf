# infra/github_oidc.tf

# 1. Le lien avec GitHub (Reste identique)
resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1", "1c58a3a8518e8759bf075b76b750d4f2df264fcd"]
}

# 2. Le Rôle (Reste identique, vérifie juste la majuscule à "Nasticks" si besoin)
resource "aws_iam_role" "github_actions" {
  name = "github-actions-portfolio-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRoleWithWebIdentity"
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }
        Condition = {
          StringLike = {
            # ⚠️ VERIFIE BIEN LA CASSE : "Nasticks" ou "nasticks" selon ton url GitHub
            "token.actions.githubusercontent.com:sub" = "repo:Nasticks/portfolio-devops:*"
          }
        }
      }
    ]
  })
}

# 3. LA CORRECTION : On donne les clés de la maison à Terraform
# (Indispensable pour qu'il puisse gérer le State S3 et le Lock DynamoDB)
resource "aws_iam_role_policy_attachment" "admin" {
  role       = aws_iam_role.github_actions.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

output "github_role_arn" {
  value = aws_iam_role.github_actions.arn
}

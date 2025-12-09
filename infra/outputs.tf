output "s3_bucket_name" {
  value = aws_s3_bucket.website.id
}

output "website_endpoint" {
  description = "URL temporaire du site (HTTP S3)"
  value       = aws_s3_bucket_website_configuration.website.website_endpoint
}

output "role_arn" {
  description = "ARN du role pour GitHub Actions"
  value       = aws_iam_role.github_actions.arn
}
"arn:aws:iam::593734035095:role/github-actions-portfolio-role"

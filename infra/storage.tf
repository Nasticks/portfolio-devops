resource "aws_s3_bucket" "website" {
  bucket_prefix = "portfolio-site-"
  force_destroy = true

  tags = {
    Name = "S3-Portfolio"
  }
}

# --- NOUVEAU : Configuration Site Web Statique ---
resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}

# --- NOUVEAU : On ouvre les vannes (Public Access) ---
resource "aws_s3_bucket_public_access_block" "website" {
  bucket = aws_s3_bucket.website.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# --- NOUVEAU : Politique de lecture publique ---
resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.website.id
  # On attend que le blocage public soit levé avant d'appliquer la politique
  depends_on = [aws_s3_bucket_public_access_block.website]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.website.arn}/*"
      },
    ]
  })
}

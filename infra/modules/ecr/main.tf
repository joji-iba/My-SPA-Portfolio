// ECRのリポジトリを作成するモジュール
resource "aws_ecr_repository" "this" {
  name                 = var.name
  image_tag_mutability = var.image_tag_mutability // タグの変更可否設定

  // 脆弱性スキャン
  image_scanning_configuration {
    scan_on_push = var.scan_on_push
  }

  // イメージの暗号化方式
  encryption_configuration {
    encryption_type = "AES256"
  }

  tags = {
    Name        = var.name
    Environment = var.environment
    Component   = "ecr"
    ManagedBy   = "terraform"
  }
}

// 古いイメージを自動削除するライフサイクルポリシー
resource "aws_ecr_lifecycle_policy" "this" {
  repository = aws_ecr_repository.this.name
  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep last ${var.lifecycle_keep} images"
      selection = {
        tagStatus   = "any"
        countType   = "imageCountMoreThan"
        countNumber = var.lifecycle_keep
      }
      action = { type = "expire" }
    }]
  })
}

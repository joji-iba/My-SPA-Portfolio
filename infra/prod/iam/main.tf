terraform {
  required_version = ">= 1.5.0"
  backend "s3" {
    bucket  = "tf-state-portfolio-prod"
    key     = "prod/iam/terraform.tfstate"
    region  = "ap-northeast-1"
    encrypt = true
  }
}

data "terraform_remote_state" "ecr" {
  backend = "s3"
  config = {
    bucket = "tf-state-portfolio-prod"
    key    = "prod/ecr/terraform.tfstate"
    region = "ap-northeast-1"
  }
}

data "terraform_remote_state" "rds" {
  backend = "s3"
  config = {
    bucket = "tf-state-portfolio-prod"
    key    = "prod/rds/terraform.tfstate"
    region = "ap-northeast-1"
  }
}

# prod 環境専用 GitHub Actions ロール
module "iam_oidc" {
  source            = "../../modules/iam"
  environment       = var.environment
  github_org        = var.github_org
  github_repository = var.github_repository
  branch            = var.branch
  ecr_repository_arns = [
    data.terraform_remote_state.ecr.outputs.ecr_repository_arn
  ]

  # ここで ECS タスク実行ロールも一緒に作る
  enable_ecs_task_execution_role = true

  ecs_task_execution_additional_policies = [
    aws_iam_policy.ecs_task_secrets_access.arn
  ]
}

// ECS タスクが RDS の DATABASE_URL シークレットにアクセスするためのポリシー
resource "aws_iam_policy" "ecs_task_secrets_access" {
  name        = "ecs-task-secrets-access"
  description = "Allow ECS tasks to read specific Secrets Manager secrets (e.g., DATABASE_URL)"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue",
          "secretsmanager:DescribeSecret"
        ]
        Resource = data.terraform_remote_state.rds.outputs.db_secret_arn
      }
    ]
  })
}

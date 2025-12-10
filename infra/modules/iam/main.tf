resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = var.oidc_thumbprints
  tags = {
    Environment = var.environment
    Component   = "iam-oidc"
  }
}

# Trust policy for GitHub Actions restricted to specific repo + branch
# Condition references: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp_oidc.html
locals {
  repo_ref = "repo:${var.github_org}/${var.github_repository}:ref:refs/heads/${var.branch}"
}

resource "aws_iam_role" "github_actions" {
  name = var.role_name
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }
        Action = ["sts:AssumeRoleWithWebIdentity"]
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
            "token.actions.githubusercontent.com:sub" = local.repo_ref
          }
        }
      }
    ]
  })
  tags = {
    Environment = var.environment
    Component   = "iam-oidc"
  }
}

# Minimal ECR push/pull + auth + logs (optional future) policy
# Keep granular; list repository ARNs passed in module input.
resource "aws_iam_policy" "ecr_push" {
  name        = "${var.role_name}-ecr"
  description = "Least-privilege permissions for GitHub Actions to build and push images to ECR"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid      = "GetAuthToken"
        Effect   = "Allow"
        Action   = ["ecr:GetAuthorizationToken"]
        Resource = "*"
      },
      {
        Sid    = "EcrPullBasic"
        Effect = "Allow"
        Action = [
          "ecr:BatchGetImage",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer"
        ]
        Resource = var.ecr_repository_arns
      },
      {
        Sid    = "EcrPush"
        Effect = "Allow"
        Action = [
          "ecr:PutImage",
          "ecr:InitiateLayerUpload",
          "ecr:UploadLayerPart",
          "ecr:CompleteLayerUpload"
        ]
        Resource = var.ecr_repository_arns
      },
      {
        Sid      = "DescribeRepo"
        Effect   = "Allow"
        Action   = ["ecr:DescribeRepositories"]
        Resource = var.ecr_repository_arns
      }
    ]
  })
  tags = {
    Environment = var.environment
    Component   = "iam-oidc"
  }
}

resource "aws_iam_role_policy_attachment" "ecr_attach" {
  role       = aws_iam_role.github_actions.name
  policy_arn = aws_iam_policy.ecr_push.arn
}

# ECS task execution role for Fargate tasks
resource "aws_iam_role" "ecs_task_execution" {
  count = var.enable_ecs_task_execution_role ? 1 : 0

  name = var.ecs_task_execution_role_name

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })

  tags = {
    Environment = var.environment
    Component   = "iam-ecs-task-execution"
  }
}

data "aws_iam_policy" "ecs_task_execution_managed" {
  count = var.enable_ecs_task_execution_role ? 1 : 0

  arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_managed_attach" {
  count = var.enable_ecs_task_execution_role ? 1 : 0

  role       = aws_iam_role.ecs_task_execution[0].name
  policy_arn = data.aws_iam_policy.ecs_task_execution_managed[0].arn
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_additional_attach" {
  count = var.enable_ecs_task_execution_role ? length(var.ecs_task_execution_additional_policies) : 0

  role       = aws_iam_role.ecs_task_execution[0].name
  policy_arn = var.ecs_task_execution_additional_policies[count.index]
}

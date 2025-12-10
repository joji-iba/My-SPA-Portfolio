output "github_actions_role_arn" {
  value       = aws_iam_role.github_actions.arn
  description = "IAM role ARN that GitHub Actions can assume via OIDC"
}

output "github_oidc_provider_arn" {
  value       = aws_iam_openid_connect_provider.github.arn
  description = "OIDC provider ARN for GitHub Actions"
}

output "ecs_task_execution_role_arn" {
  description = "ECSタスク実行ロールのARN (有効な場合)"
  value       = var.enable_ecs_task_execution_role && length(aws_iam_role.ecs_task_execution) > 0 ? aws_iam_role.ecs_task_execution[0].arn : null
}

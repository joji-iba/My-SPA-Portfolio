output "github_actions_role_arn" {
  value = module.iam_oidc.github_actions_role_arn
}

output "ecs_task_execution_role_arn" {
  description = "IAM role ARN for ECS task execution"
  value       = module.iam_oidc.ecs_task_execution_role_arn
}

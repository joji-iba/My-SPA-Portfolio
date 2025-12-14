variable "environment" {
  type        = string
  description = "Environment name (e.g. prod, staging)"
}

variable "cluster_name" {
  type        = string
  description = "ECS Cluster name"
}

variable "task_family" {
  type        = string
  description = "Task definition family name"
}

variable "container_name" {
  type        = string
  description = "Container name in task definition"
}

variable "container_image" {
  type        = string
  description = "Full container image URI (e.g. ECR URI with tag)"
}

variable "container_port" {
  type        = number
  description = "Container port to expose (e.g. 8080)"
}

variable "cpu" {
  type        = number
  description = "Fargate task CPU units"
}

variable "memory" {
  type        = number
  description = "Fargate task memory (MiB)"
}

variable "subnet_ids" {
  type        = list(string)
  description = "Subnets for ECS service (private subnets recommended)"
}

variable "security_group_ids" {
  type        = list(string)
  description = "Security groups to attach to ECS tasks"
}

variable "ecs_task_execution_role_arn" {
  type        = string
  description = "IAM role ARN for ECS task execution"
}

variable "assign_public_ip" {
  type        = bool
  description = "Whether to assign public IP to tasks (should be false for private subnets)"
  default     = false
}

variable "desired_count" {
  type        = number
  description = "Desired task count for ECS service"
  default     = 1
}

variable "log_group_name" {
  type        = string
  description = "CloudWatch Logs log group name"
}

variable "log_retention_in_days" {
  type        = number
  description = "Retention days for application logs"
  default     = 30
}

variable "load_balancer_enabled" {
  type        = bool
  description = "Whether to attach the ECS service to an ALB target group"
  default     = false
}

variable "target_group_arn" {
  type        = string
  description = "ALB target group ARN for this ECS service (used when load_balancer_enabled is true)"
  default     = ""
}

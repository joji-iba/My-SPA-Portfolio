variable "environment" {
  type        = string
  description = "Environment name (e.g. prod)"
  default     = "prod"
}

variable "cluster_name" {
  type        = string
  description = "ECS Cluster name"
  default     = "portfolio-backend-cluster"
}

variable "task_family" {
  type        = string
  description = "Task definition family name"
  default     = "portfolio-backend-task"
}

variable "container_name" {
  type        = string
  description = "Container name in task definition"
  default     = "portfolio-backend"
}

variable "container_port" {
  type        = number
  description = "Container port to expose (backend listens on 8080)"
  default     = 8080
}

variable "cpu" {
  type        = number
  description = "Fargate task CPU units"
  default     = 256
}

variable "memory" {
  type        = number
  description = "Fargate task memory (MiB)"
  default     = 512
}

variable "desired_count" {
  type        = number
  description = "Desired task count for ECS service"
  default     = 1
}

variable "image_tag" {
  type        = string
  description = "ECR image tag to deploy (e.g. git SHA or version tag)"
}

variable "log_group_name" {
  type        = string
  description = "CloudWatch Logs log group name"
  default     = "/ecs/portfolio-backend"
}

variable "log_retention_in_days" {
  type        = number
  description = "Retention days for application logs"
  default     = 30
}

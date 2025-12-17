variable "environment" {
  type        = string
  description = "Environment name (e.g. prod)"
  default     = "prod"
}

variable "db_name" {
  type        = string
  description = "Initial database name for the portfolio app"
  default     = "portfolio"
}

variable "master_username" {
  type        = string
  description = "Master username for PostgreSQL"
}

variable "master_password" {
  type        = string
  description = "Master password for PostgreSQL"
  sensitive   = true
}

// 学習目的でコスト削減のため、Multi-AZは無効化しておく。本番運用時はこれを有効化すれば耐障害性が向上する。
variable "multi_az" {
  type        = bool
  description = "Whether to enable Multi-AZ deployment for RDS"
  default     = false
}

variable "engine_version" {
  type        = string
  description = "PostgreSQL engine version to use in prod"
  default     = "17"
}

variable "instance_class" {
  type        = string
  description = "RDS instance class for prod"
  default     = "db.t4g.micro"
}

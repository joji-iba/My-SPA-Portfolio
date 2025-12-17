variable "name" {
  type        = string
  description = "Base name for RDS resources (e.g. portfolio)"
}

variable "environment" {
  type        = string
  description = "Environment name (e.g. prod)"
}

variable "vpc_id" {
  type        = string
  description = "VPC ID where RDS will be created"
}

variable "private_subnet_ids" {
  type        = list(string)
  description = "Private subnet IDs for the DB subnet group (at least 2 for Multi-AZ)"
}

variable "engine" {
  type        = string
  description = "Database engine (e.g. postgres)"
  default     = "postgres"
}

variable "engine_version" {
  type        = string
  description = "PostgreSQL engine version"
  default     = "17"
}

variable "instance_class" {
  type        = string
  description = "RDS instance class"
  default     = "db.t4g.micro"
}

variable "allocated_storage" {
  type        = number
  description = "Allocated storage in GiB"
  default     = 20
}

variable "storage_type" {
  type        = string
  description = "Storage type for the RDS instance (e.g. gp3)"
  default     = "gp3"
}

variable "db_security_group_id" {
  type        = string
  description = "Security group ID to attach to the RDS instance"
}

variable "db_name" {
  type        = string
  description = "Initial database name"
}

variable "master_username" {
  type        = string
  description = "Master username for PostgreSQL"
  sensitive   = true
}

variable "master_password" {
  type        = string
  description = "Master password for PostgreSQL"
  sensitive   = true
}

variable "port" {
  type        = number
  description = "Port number for PostgreSQL"
  default     = 5432
}

variable "publicly_accessible" {
  type        = bool
  description = "RDSインスタンスをパブリックにアクセス可能にするかどうか"
  default     = false
}

// 学習目的でコスト削減のため、Multi-AZは無効化しておく。本番運用時はこれを有効化すれば耐障害性が向上する。
variable "multi_az" {
  type        = bool
  description = "Whether to enable Multi-AZ deployment"
  default     = false
}

variable "backup_retention_period" {
  type        = number
  description = "Number of days to retain automated backups"
  default     = 7
}

variable "copy_tags_to_snapshot" {
  type        = bool
  description = "Whether to copy tags to DB snapshots"
  default     = true
}

variable "auto_minor_version_upgrade" {
  type        = bool
  description = "Whether to enable auto minor version upgrades"
  default     = true
}

variable "apply_immediately" {
  type        = bool
  description = "Whether to apply modifications immediately"
  default     = true
}

variable "deletion_protection" {
  type        = bool
  description = "Whether to enable deletion protection for the DB instance"
  default     = false
}

variable "skip_final_snapshot" {
  type        = bool
  description = "Whether to skip final snapshot on DB instance deletion (for learning environments)"
  default     = true
}

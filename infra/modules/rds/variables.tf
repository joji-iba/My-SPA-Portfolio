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

variable "db_security_group_id" {
  type        = string
  description = "Security group ID to attach to the RDS instance"
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

variable "db_name" {
  type        = string
  description = "Initial database name"
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

variable "backup_retention_period" {
  type        = number
  description = "Number of days to retain automated backups"
  default     = 7
}

variable "multi_az" {
  type        = bool
  description = "Whether to enable Multi-AZ deployment"
  default     = false
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

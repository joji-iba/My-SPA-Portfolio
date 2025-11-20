variable "environment" {
  type        = string
  description = "Deployment environment name"
  default     = "prod"
}

variable "github_org" {
  type        = string
  description = "GitHubリポジトリのオーナー名"
}

variable "github_repository" {
  type        = string
  description = "GitHubリポジトリ名"
}

variable "branch" {
  type        = string
  description = "OIDCを使用するブランチ名"
}

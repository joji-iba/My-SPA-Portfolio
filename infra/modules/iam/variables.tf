variable "environment" {
  type        = string
  description = "Environment name"
}

variable "github_org" {
  type        = string
  description = "OIDCを許可するGitHubのユーザーまたは組織"
}

variable "github_repository" {
  type        = string
  description = "OIDCを許可するGitHubのリポジトリ名"
}

variable "branch" {
  type        = string
  description = "GitHubリポジトリのブランチ名"
}

variable "oidc_thumbprints" {
  type        = list(string)
  description = "OIDCの公開証明書のルートCAサムプリントのリスト"
  default     = ["6938fd4d98bab03faadb97b34396831e3780aea1"]
}

variable "role_name" {
  type        = string
  description = "IAM role name for GitHub Actions"
  default     = "github-actions-oidc-role"
}

variable "ecr_repository_arns" {
  type        = list(string)
  description = "アクセスを許可するECRリポジトリのARNリスト"
}

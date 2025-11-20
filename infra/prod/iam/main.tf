terraform {
  required_version = ">= 1.5.0"
  backend "s3" {
    bucket  = "tf-state-portfolio-prod"
    key     = "prod/iam/terraform.tfstate"
    region  = "ap-northeast-1"
    encrypt = true
  }
}

data "terraform_remote_state" "ecr" {
  backend = "s3"
  config = {
    bucket = "tf-state-portfolio-prod"
    key    = "prod/ecr/terraform.tfstate"
    region = "ap-northeast-1"
  }
}

# prod 環境専用 GitHub Actions ロール
module "iam_oidc" {
  source            = "../../modules/iam"
  environment       = var.environment
  github_org        = var.github_org
  github_repository = var.github_repository
  branch            = var.branch
  ecr_repository_arns = [
    data.terraform_remote_state.ecr.outputs.ecr_repository_arn
  ]
}

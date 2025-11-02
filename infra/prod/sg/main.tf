terraform {
  required_version = ">= 1.5.0"
  backend "s3" {
    bucket  = "tf-state-portfolio-prod"
    key     = "prod/sg/terraform.tfstate"
    region  = "ap-northeast-1"
    encrypt = true
  }
}

data "terraform_remote_state" "vpc" {
  backend = "s3"
  config = {
    bucket = "tf-state-portfolio-prod"
    key    = "prod/vpc/terraform.tfstate"
    region = "ap-northeast-1"
  }
}

module "security" {
  source      = "../../modules/sg"
  name        = "portfolio"
  environment = "prod"
  vpc_id      = data.terraform_remote_state.vpc.outputs.vpc_id

  allowed_http_cidrs  = ["0.0.0.0/0"]
  allowed_https_cidrs = ["0.0.0.0/0"]
  enable_bastion      = true
  allowed_ssh_cidrs   = ["203.0.113.10/32"]
}

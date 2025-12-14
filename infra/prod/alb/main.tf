terraform {
  required_version = ">= 1.5.0"
  backend "s3" {
    bucket  = "tf-state-portfolio-prod"
    key     = "prod/alb/terraform.tfstate"
    region  = "ap-northeast-1"
    encrypt = true
  }
}

provider "aws" {
  region = "ap-northeast-1"
}

data "terraform_remote_state" "vpc" {
  backend = "s3"
  config = {
    bucket = "tf-state-portfolio-prod"
    key    = "prod/vpc/terraform.tfstate"
    region = "ap-northeast-1"
  }
}

data "terraform_remote_state" "sg" {
  backend = "s3"
  config = {
    bucket = "tf-state-portfolio-prod"
    key    = "prod/sg/terraform.tfstate"
    region = "ap-northeast-1"
  }
}

module "alb" {
  source      = "../../modules/alb"
  name        = "portfolio"
  environment = var.environment

  vpc_id             = data.terraform_remote_state.vpc.outputs.vpc_id
  vpc_cidr_block     = data.terraform_remote_state.vpc.outputs.vpc_cidr_block
  public_subnet_ids  = data.terraform_remote_state.vpc.outputs.public_subnet_ids
  private_subnet_ids = data.terraform_remote_state.vpc.outputs.private_subnet_ids
  target_port        = 8080

  external_alb_security_group_id = data.terraform_remote_state.sg.outputs.alb_security_group_id
  internal_alb_security_group_id = data.terraform_remote_state.sg.outputs.alb_internal_security_group_id

  health_check_path        = "/api/health"
  enable_https_external    = var.enable_https_external // 外部向けALBのHTTPSを有効化するかどうか
  external_certificate_arn = var.external_certificate_arn
}

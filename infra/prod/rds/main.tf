terraform {
  required_version = ">= 1.5.0"
  backend "s3" {
    bucket  = "tf-state-portfolio-prod"
    key     = "prod/rds/terraform.tfstate"
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

module "rds" {
  source      = "../../modules/rds"
  name        = "portfolio"
  environment = var.environment

  vpc_id             = data.terraform_remote_state.vpc.outputs.vpc_id
  private_subnet_ids = data.terraform_remote_state.vpc.outputs.private_subnet_ids

  db_security_group_id = data.terraform_remote_state.sg.outputs.db_security_group_id

  engine_version  = var.engine_version
  instance_class  = var.instance_class
  db_name         = var.db_name
  master_username = var.master_username
  master_password = var.master_password

  multi_az = var.multi_az
}

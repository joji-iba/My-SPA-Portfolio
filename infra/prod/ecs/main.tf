terraform {
  required_version = ">= 1.8.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }

  backend "s3" {
    bucket = "tf-state-portfolio-prod"
    key    = "prod/ecs/terraform.tfstate"
    region = "ap-northeast-1"
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

data "terraform_remote_state" "iam" {
  backend = "s3"
  config = {
    bucket = "tf-state-portfolio-prod"
    key    = "prod/iam/terraform.tfstate"
    region = "ap-northeast-1"
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

data "terraform_remote_state" "alb" {
  backend = "s3"
  config = {
    bucket = "tf-state-portfolio-prod"
    key    = "prod/alb/terraform.tfstate"
    region = "ap-northeast-1"
  }
}

locals {
  container_image = "${data.terraform_remote_state.ecr.outputs.ecr_repository_url}:${var.image_tag}"
}

module "ecs" {
  source = "../../modules/ecs"

  environment                 = var.environment
  cluster_name                = var.cluster_name
  task_family                 = var.task_family
  container_name              = var.container_name
  container_image             = local.container_image
  container_port              = var.container_port
  cpu                         = var.cpu
  memory                      = var.memory
  subnet_ids                  = data.terraform_remote_state.vpc.outputs.private_subnet_ids
  security_group_ids          = [data.terraform_remote_state.sg.outputs.ecs_service_security_group_id]
  ecs_task_execution_role_arn = data.terraform_remote_state.iam.outputs.ecs_task_execution_role_arn
  assign_public_ip            = false
  desired_count               = var.desired_count
  log_group_name              = var.log_group_name
  log_retention_in_days       = var.log_retention_in_days

  load_balancer_enabled = true
  target_group_arn      = data.terraform_remote_state.alb.outputs.external_target_group_arn
}

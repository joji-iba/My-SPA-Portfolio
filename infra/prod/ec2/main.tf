terraform {
  required_version = ">= 1.5.0"
  backend "s3" {
    bucket  = "tf-state-portfolio-prod"
    key     = "prod/ec2/terraform.tfstate"
    region  = "ap-northeast-1"
    encrypt = true
  }
}

# Remote states
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

module "bastion" {
  source            = "../../modules/ec2"
  name              = "portfolio"
  environment       = "prod"
  enable_bastion    = false
  subnet_id         = data.terraform_remote_state.vpc.outputs.public_subnet_ids[0]
  security_group_id = data.terraform_remote_state.sg.outputs.bastion_security_group_id
  instance_type     = "t3.micro"
  key_name          = var.key_name
  allocate_eip      = true
}

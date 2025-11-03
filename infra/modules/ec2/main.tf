data "aws_ami" "bastion" {
  count       = var.enable_bastion ? 1 : 0
  most_recent = true
  owners      = ["amazon"]
  filter {
    name   = "name"
    values = [var.ami_name_pattern]
  }
}

resource "aws_instance" "bastion" {
  count                  = var.enable_bastion ? 1 : 0
  ami                    = data.aws_ami.bastion[0].id
  instance_type          = var.instance_type
  subnet_id              = var.subnet_id
  vpc_security_group_ids = [var.security_group_id]

  key_name = var.key_name != "" ? var.key_name : null

  associate_public_ip_address = true

  tags = {
    Name        = "${var.name}-bastion"
    Environment = var.environment
    Component   = "bastion"
  }
}

resource "aws_eip" "bastion" {
  count    = var.enable_bastion && var.allocate_eip ? 1 : 0
  instance = aws_instance.bastion[0].id
  domain   = "vpc"

  tags = {
    Name        = "${var.name}-bastion-eip"
    Environment = var.environment
    Component   = "bastion"
  }
}

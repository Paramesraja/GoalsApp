terraform{
    required_providers {
      docker={
        source = "kreuzwerker/docker"
        version = "~> 3.0.1"
      }
    }
}
provider "docker" {
  host = "npipe:////.//pipe//docker_engine" #accessing docker engine via docker destop we have to use for named pipe
}

resource "docker_image" "docker_hub_yourcustom_nginx_image" {#use like this for provisioning your application for whereas deploying docker images
  name="nginx"
  keep_locally=false
}

resource "docker_container" "docker_hub_yourcustom_nginx_image" {
  image=docker_image.nginx.image_id
  name="Docker-terraform-nginx"
  ports{
    internal=80
    external=8080
  }
}

#using aws ami instance and aws s3 bucket

# provider "aws" {
#   region = "us-west-1"  # Change to your desired region
# }

# # Create an EC2 instance for the backend server
# resource "aws_instance" "backend" {
#   ami           = "ami-12345678"  # Replace with your desired AMI
#   instance_type = "t2.micro"      # Replace with your desired instance type

#   # You can specify other configuration options like security groups, etc.
# }

# # Create an S3 bucket to host the frontend build files
# resource "aws_s3_bucket" "frontend" {
#   bucket = "my-frontend-bucket"  # Replace with your desired bucket name

#   # You can specify other configuration options like ACLs, versioning, etc.
# }

# # Copy frontend build files to the S3 bucket
# resource "aws_s3_bucket_object" "frontend_files" {
#   bucket = aws_s3_bucket.frontend.id
#   key    = "frontend/"
#   source = "frontend/build/"     # Path to your React build files

#   # You can specify other configuration options like content type, cache control, etc.
# }

# # Configure NGINX to serve the React app and reverse proxy to the backend
# resource "aws_instance" "nginx" {
#   ami           = "ami-12345678"  # Replace with your desired NGINX-ready AMI
#   instance_type = "t2.micro"      # Replace with your desired instance type

#   # You can specify other configuration options like security groups, etc.
# }

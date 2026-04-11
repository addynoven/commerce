#!/bin/bash
# Run this ONCE on a fresh EC2 Ubuntu instance
# Usage: ssh into EC2, then: bash ec2-setup.sh

set -e

echo "=== Updating system ==="
sudo apt update && sudo apt upgrade -y

echo "=== Installing Docker ==="
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER

echo "=== Installing Nginx ==="
sudo apt install -y nginx

echo "=== Installing Certbot (SSL) ==="
sudo apt install -y certbot python3-certbot-nginx

echo "=== Setting up firewall ==="
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

echo "=== Done! ==="
echo ""
echo "NEXT STEPS:"
echo "1. Copy nginx.conf to /etc/nginx/sites-available/commerce"
echo "   sudo cp nginx.conf /etc/nginx/sites-available/commerce"
echo "   sudo ln -s /etc/nginx/sites-available/commerce /etc/nginx/sites-enabled/"
echo "   sudo rm /etc/nginx/sites-enabled/default"
echo "   sudo nginx -t && sudo systemctl restart nginx"
echo ""
echo "2. Setup SSL (after DNS points to this server):"
echo "   sudo certbot --nginx -d your-domain.com -d www.your-domain.com"
echo ""
echo "3. Add these GitHub Secrets:"
echo "   EC2_HOST       = your EC2 public IP"
echo "   EC2_USER       = ubuntu"
echo "   EC2_SSH_KEY    = contents of your .pem file"
echo "   COMPANY_NAME"
echo "   SITE_NAME"
echo "   SHOPIFY_REVALIDATION_SECRET"
echo "   SHOPIFY_STOREFRONT_ACCESS_TOKEN"
echo "   SHOPIFY_STORE_DOMAIN"
echo ""
echo "4. Re-login (for docker group): exit and SSH back in"

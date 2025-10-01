#!/bin/bash

ENV_FILE=".env"

echo "Creating .env file interactively..."

read -p "Traefik Dashboard Hostname (e.g., panel.enesbuyuk.com): " TRAEFIK_DASHBOARD_HOSTNAME
read -p "Traefik Dashboard Username: " TRAEFIK_DASHBOARD_USERNAME
read -p "Traefik Dashboard Password (bcrypt recommended): " TRAEFIK_DASHBOARD_PASSWORD
read -p "ACME Email: " ACME_EMAIL
read -p "Cloudflare DNS API Token: " CF_DNS_API_TOKEN

read -p "Frontend Port (default 80): " PORT
PORT=${PORT:-80}
read -p "NEXT_PUBLIC_SITE_URL: " NEXT_PUBLIC_SITE_URL
read -p "NEXT_PUBLIC_MEDIUM_URL: " NEXT_PUBLIC_MEDIUM_URL
read -p "NEXT_PUBLIC_BUCKET (leave empty if not using): " NEXT_PUBLIC_BUCKET

read -p "Backend URL (default http://commbuilder-backend:444): " BACKEND_URL
BACKEND_URL=${BACKEND_URL:-http://commbuilder-backend:444}
read -p "Backend Port (default 444): " BACKEND_PORT
BACKEND_PORT=${BACKEND_PORT:-444}
read -p "Backend API Token: " BACKEND_API_TOKEN

read -p "MongoDB Host (default mongodb): " MONGODB_HOST
MONGODB_HOST=${MONGODB_HOST:-mongodb}
read -p "MongoDB Port: " MONGODB_PORT
read -p "MongoDB Username (default root): " MONGODB_USERNAME
MONGODB_USERNAME=${MONGODB_USERNAME:-root}
read -p "MongoDB Password: " MONGODB_PASSWORD
read -p "MongoDB Database (default commbuilder): " MONGODB_DATABASE
MONGODB_DATABASE=${MONGODB_DATABASE:-commbuilder}

read -p "JWT Secret Key: " JWT_SECRET

cat > $ENV_FILE <<EOL
##############################################
# Change the name of this file to .env
##############################################

# Traefik Configuration
TRAEFIK_DASHBOARD_HOSTNAME="$TRAEFIK_DASHBOARD_HOSTNAME"
TRAEFIK_DASHBOARD_USERNAME="$TRAEFIK_DASHBOARD_USERNAME"
TRAEFIK_DASHBOARD_PASSWORD="$TRAEFIK_DASHBOARD_PASSWORD"
ACME_EMAIL="$ACME_EMAIL"
CF_DNS_API_TOKEN="$CF_DNS_API_TOKEN"

# Frontend Configuration
PORT=$PORT
NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_MEDIUM_URL=$NEXT_PUBLIC_MEDIUM_URL
NEXT_PUBLIC_BUCKET="$NEXT_PUBLIC_BUCKET"

# Backend Server Configuration
BACKEND_URL="$BACKEND_URL"
BACKEND_PORT=$BACKEND_PORT
BACKEND_API_TOKEN="$BACKEND_API_TOKEN"

# Database configuration
MONGODB_HOST="$MONGODB_HOST"
MONGODB_PORT="$MONGODB_PORT"
MONGODB_USERNAME="$MONGODB_USERNAME"
MONGODB_PASSWORD="$MONGODB_PASSWORD"
MONGODB_DATABASE="$MONGODB_DATABASE"

# Authentication
JWT_SECRET="$JWT_SECRET"
EOL

echo ".env file created successfully!"
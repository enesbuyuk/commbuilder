#!/bin/bash

echo "##############################################"
echo "# This script will generate the .env file.  #"
echo "##############################################"

# Function to validate URL format
validate_url() {
    if [[ ! "$1" =~ ^https?:// ]]; then
        echo "Invalid URL format. Please enter a valid URL (e.g., https://example.com)."
        return 1
    fi
    return 0
}

# Function to validate if input is non-empty
validate_non_empty() {
    if [ -z "$1" ]; then
        echo "This field cannot be empty. Please provide a valid value."
        return 1
    fi
    return 0
}

# Function to validate bcrypt password (basic check for length)
validate_bcrypt() {
    if [[ ! "$1" =~ ^\$2[ayb]\$.{56}$ ]]; then
        echo "Invalid bcrypt password format. Please provide a valid bcrypt hashed password."
        return 1
    fi
    return 0
}

# Ask user for Traefik Dashboard Hostname
while true; do
    read -p "Enter Traefik Dashboard Hostname (e.g. panel.enesbuyuk.com): " TRAEFIK_DASHBOARD_HOSTNAME
    validate_non_empty "$TRAEFIK_DASHBOARD_HOSTNAME" && break
done

# Ask user for Traefik Dashboard Username
while true; do
    read -p "Enter Traefik Dashboard Username (e.g. admin): " TRAEFIK_DASHBOARD_USERNAME
    validate_non_empty "$TRAEFIK_DASHBOARD_USERNAME" && break
done

# Ask user for Traefik Dashboard Password
while true; do
    read -p "Enter Traefik Dashboard Password (bcrypt hashed password!): " TRAEFIK_DASHBOARD_PASSWORD
    validate_bcrypt "$TRAEFIK_DASHBOARD_PASSWORD" && break
done

# Ask user for Frontend Site Hostname
while true; do
    read -p "Enter Frontend Site Hostname (e.g. iucs.net): " SITE_HOSTNAME
    validate_non_empty "$SITE_HOSTNAME" && break
done

# Ask user for Frontend Site URL
while true; do
    read -p "Enter Frontend Site URL (e.g. https://iucs.net): " NEXT_PUBLIC_SITE_URL
    validate_url "$NEXT_PUBLIC_SITE_URL" && break
done

# Ask user for Medium URL
while true; do
    read -p "Enter Medium URL (e.g. https://medium.iucs.net): " NEXT_PUBLIC_MEDIUM_URL
    validate_url "$NEXT_PUBLIC_MEDIUM_URL" && break
done

# Ask user for Backend URL
while true; do
    read -p "Enter Backend URL (e.g. http://backend:444): " BACKEND_URL
    validate_url "$BACKEND_URL" && break
done

# Ask user for MongoDB Host
while true; do
    read -p "Enter MongoDB Host (e.g. mongodb): " MONGODB_HOST
    validate_non_empty "$MONGODB_HOST" && break
done

# Ask user for MongoDB Port
while true; do
    read -p "Enter MongoDB Port (e.g. 27017): " MONGODB_PORT
    validate_non_empty "$MONGODB_PORT" && break
done

# Ask user for MongoDB Username
while true; do
    read -p "Enter MongoDB Username (e.g. root): " MONGODB_USERNAME
    validate_non_empty "$MONGODB_USERNAME" && break
done

# Ask user for MongoDB Password
while true; do
    read -p "Enter MongoDB Password (e.g. password123): " MONGODB_PASSWORD
    validate_non_empty "$MONGODB_PASSWORD" && break
done

# Ask user for MongoDB Database name
while true; do
    read -p "Enter MongoDB Database name (e.g. student-club-web): " MONGODB_DATABASE
    validate_non_empty "$MONGODB_DATABASE" && break
done

# Ask user for JWT Secret Key
while true; do
    read -p "Enter JWT Secret Key (e.g. your-jwt-secret-key): " JWT_SECRET
    validate_non_empty "$JWT_SECRET" && break
done

# Generate the .env file
cat <<EOL > .env
##############################################
# Change the name of this file to .env
##############################################

# Traefik Configuration
TRAEFIK_DASHBOARD_HOSTNAME=${TRAEFIK_DASHBOARD_HOSTNAME}
TRAEFIK_DASHBOARD_USERNAME=${TRAEFIK_DASHBOARD_USERNAME}
TRAEFIK_DASHBOARD_PASSWORD="${TRAEFIK_DASHBOARD_PASSWORD}"

# Frontend Configuration
SITE_HOSTNAME=${SITE_HOSTNAME}
PORT=80
NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
NEXT_PUBLIC_MEDIUM_URL=${NEXT_PUBLIC_MEDIUM_URL}

# Backend Server Configuration
BACKEND_URL=${BACKEND_URL}
BACKEND_PORT=444

# Database configuration
MONGODB_HOST=${MONGODB_HOST}
MONGODB_PORT=${MONGODB_PORT}
MONGODB_USERNAME=${MONGODB_USERNAME}
MONGODB_PASSWORD=${MONGODB_PASSWORD}
MONGODB_DATABASE=${MONGODB_DATABASE}

# Authentication
JWT_SECRET=${JWT_SECRET}
EOL

echo ".env file has been successfully created."

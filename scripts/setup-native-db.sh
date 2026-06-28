#!/usr/bin/env bash
# scripts/setup-native-db.sh
# Automates setting up the native PostgreSQL schema and seeds.

set -e

DB_NAME="gym_db"
DB_USER="gym_admin"

echo "=== 1. Creating Database and User (requires postgres superuser privileges) ==="
echo "Attempting to create the user and database using local 'sudo -u postgres psql'..."

sudo -u postgres psql -c "CREATE USER ${DB_USER} WITH PASSWORD 'gym_password123' SUPERUSER;" || echo "User ${DB_USER} might already exist, continuing..."
sudo -u postgres psql -c "CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};" || echo "Database ${DB_NAME} might already exist, continuing..."

echo "=== 2. Applying Schema (schema.sql) ==="
PGPASSWORD=gym_password123 psql -h localhost -U ${DB_USER} -d ${DB_NAME} -f schema.sql

echo "=== 3. Applying Seed Data (seed.sql) ==="
PGPASSWORD=gym_password123 psql -h localhost -U ${DB_USER} -d ${DB_NAME} -f seed.sql

echo "=== Setup Completed Successfully! ==="
echo "Your native PostgreSQL database is configured on port 5432."
echo "Please make sure your .env file has the following connection string:"
echo "DATABASE_URL=\"postgresql://gym_admin:gym_password123@localhost:5432/gym_db\""

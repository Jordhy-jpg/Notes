#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install Python dependencies
pip install --upgrade pip
pip install -r Backend/requirements.txt

# Navigate to backend directory
cd Backend

# Collect static files
python manage.py collectstatic --no-input

# Run database migrations
python manage.py migrate

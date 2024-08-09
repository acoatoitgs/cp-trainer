#!/bin/bash

echo "Installing Python dependencies..."
pip install -r backend/requirements.txt

echo "Installing npm dependencies..."
cd dashboard
npm install

echo "Creating the database"
python backend/init_db.py

cd ..

echo "To start the backend, run: python backend/app.py"
echo "To start the frontend, run: npm start in the frontend directory"

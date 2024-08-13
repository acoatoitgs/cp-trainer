#!/bin/bash
python -m venv ./python

source ./python/bin/activate

echo "Installing Python dependencies..."
pip install -r backend/requirements.txt

echo "Installing npm dependencies..."
cd dashboard
npm install

echo "Creating the database"
python backend/init_db.py

cd ..

echo "To start the app, run ./start.sh"
echo "If you need only the API to run, type python ./backend/app.py"

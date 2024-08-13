#!/bin/bash

cleanup() {
    echo "Stopping processes..."
    kill "$PID1"
    kill "$PID2"
    echo "See you later!"
    exit
}

trap cleanup SIGINT

./python/bin/python backend/app.py &
PID1=$!

cd dashboard
npm start &
PID2=$!

wait $PID1
wait $PID2

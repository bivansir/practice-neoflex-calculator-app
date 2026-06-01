#!/bin/bash
set -e

echo "=== Запуск контейнеров ==="
docker compose up --build -d

echo "=== Запуск фронта ==="
cd frontend && npm install
cd frontend && npm run dev
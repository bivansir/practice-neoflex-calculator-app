#!/bin/bash
set -e

echo "=== Сборка calcservice ==="
cd calcservice && mvn clean install -DskipTests && cd ..

echo "=== Сборка dealservice ==="
cd deal && mvn clean install -DskipTests && cd ..

echo "=== Запуск контейнеров ==="
docker compose up --build

echo "=== Запуск фронта ==="
cd frontend && npm install
cd frontend && npm run dev
#!/bin/sh

echo "⏳ Esperando a que la base de datos esté lista en $DB_HOST..."

# Espera hasta que postgres esté accesible
until nc -z "$DB_HOST" 5432; do
  echo "⏳ Esperando a Postgres en $DB_HOST:5432..."
  sleep 1
done

echo "✅ Base de datos disponible. Ejecutando migraciones y seeders..."

# Ejecutar migraciones y seeds
npm run migrate
npm run seed

echo "🚀 Iniciando servidor..."
npm start

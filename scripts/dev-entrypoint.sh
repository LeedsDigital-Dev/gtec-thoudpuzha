#!/bin/bash
set -e

echo "=== G-TEC Local Development Entrypoint ==="

# Copy .env.example to .env.local if not present
if [ ! -f .env.local ] && [ ! -f .env ]; then
  echo "📄 Creating .env.local from .env.example..."
  cp .env.example .env.local
fi

DB_HOST=${DB_HOST:-db}
DB_PORT=${DB_PORT:-5432}
DB_USER=${DB_USER:-postgres}

echo "⏳ Waiting for PostgreSQL container ($DB_HOST:$DB_PORT) to be ready..."
until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER"; do
  sleep 1
done

echo "✅ PostgreSQL is ready!"

echo "⚙️ Generating Prisma Client..."
npx prisma generate

echo "🚀 Syncing database schema with Prisma..."
npx prisma db push --skip-generate

echo "🌱 Seeding initial database records..."
npm run db:seed || echo "⚠️ Seeding finished with warnings."

echo "🎉 Environment ready! Starting Next.js dev server on http://localhost:3000..."
exec npm run dev

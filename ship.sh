#!/bin/bash
# ship.sh — validate, commit, and push to trigger Vercel deployment
# Usage: ./ship.sh "your commit message"

set -e

if [ -z "$1" ]; then
  echo "Usage: ./ship.sh \"your commit message\""
  exit 1
fi

echo "🔍 Typechecking..."
npx tsc --noEmit

echo "🏗️  Building..."
npm run build

echo "📦 Committing..."
git add -A
git commit -m "$1

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"

echo "🚀 Pushing to GitHub → Vercel will auto-deploy..."
git push origin main

echo "✅ Done! Check deployment status at: https://vercel.com/ashiroff34s-projects/psyche-app"

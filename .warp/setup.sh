#!/bin/zsh
# Warp Terminal Setup Script for iCube Next.js Project

echo "🚀 Setting up Warp optimizations for iCube Next.js project..."

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    cp .env.local.example .env.local
    echo "📄 Created .env.local from example"
fi

# Make aliases executable
chmod +x .warp/aliases.sh

# Source aliases for current session
source .warp/aliases.sh

# Check if Node.js is optimally configured
echo "📊 Environment Check:"
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Current directory: $(pwd)"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run type check to ensure everything is set up correctly
echo "🔍 Running type check..."
npm run type-check

echo ""
echo "✅ Warp setup complete!"
echo ""
echo "🎯 Quick commands:"
echo "  ndev     - Start development server"
echo "  nbuild   - Build for production" 
echo "  nclean   - Clean cache and restart dev"
echo "  status   - Show project status"
echo "  icube    - Navigate to project directory"
echo ""
echo "💡 Tip: Use Cmd+P in Warp to access workflows, or type a command above!"
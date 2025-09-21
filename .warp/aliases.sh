#!/bin/zsh
# Warp aliases for Next.js iCube website development
# Source this file in your shell or add to your .zshrc

# Quick navigation
alias icube="cd /Users/jmattiello/Workspace/Provenance/iCube/icube-emu.github.io"

# Development shortcuts
alias ndev="npm run warp:dev"
alias nbuild="npm run warp:build" 
alias nstart="npm start"
alias nlint="npm run lint"
alias nclean="npm run warp:clean-dev"
alias ncheck="npm run type-check"

# Port shortcuts
alias ndev3001="npm run dev:port 3001"
alias ndev3002="npm run dev:port 3002" 
alias ndev8080="npm run dev:port 8080"

# Dependency management
alias ndeps="npm run deps:check"
alias nupdate="npm run deps:update"
alias ninstall="npm install"
alias ninfo="npm run info"

# Git shortcuts for this project
alias gst="git status"
alias glog="git log --oneline -10"
alias gpush="git push origin main"
alias gpull="git pull origin main"

# Quick file opening (assuming VS Code)
alias code.="code ."
alias readme="code README.md"
alias pkg="code package.json"

# Project status
alias status="echo '📊 Project Status:' && pwd && echo && git status --porcelain && echo && npm run deps:check"

# Development helpers
alias ports="lsof -i :3000 -i :3001 -i :3002"
alias killnext="pkill -f 'next dev'"

echo "🎯 iCube Next.js aliases loaded! Use 'ndev' to start development."
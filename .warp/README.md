# 🚀 Warp Terminal Optimization for iCube Next.js Project

This directory contains Warp-specific configurations and optimizations for the iCube website development.

## 🎯 Quick Start

1. **Run the setup script:**
   ```bash
   chmod +x .warp/setup.sh && ./.warp/setup.sh
   ```

2. **Load aliases in your current session:**
   ```bash
   source .warp/aliases.sh
   ```

3. **Start developing:**
   ```bash
   ndev  # Start development server with visual feedback
   ```

## ⚡ Optimized Commands

### Development
- `ndev` - Start development server with emoji feedback
- `ndev3001` - Start on port 3001
- `nbuild` - Build with progress indicators
- `nclean` - Clean cache and restart development

### Shortcuts
- `icube` - Navigate to project directory
- `status` - Show comprehensive project status
- `ports` - Show what's running on Next.js ports
- `killnext` - Kill all Next.js processes

### Dependencies
- `ndeps` - Check outdated packages
- `nupdate` - Update all dependencies
- `ncheck` - Run TypeScript type checking

## 📋 Warp Workflows

Access via **Cmd+P** in Warp or use the workflows menu:

- **Start Development Server** - `npm run dev`
- **Build for Production** - `npm run build`
- **Clean Build** - Remove cache and rebuild
- **Type Check** - Validate TypeScript
- **Check Dependencies** - Show outdated packages

## 🔧 Configuration Files

- **`workflows.yaml`** - Warp workflow definitions
- **`aliases.sh`** - Shell aliases for quick commands
- **`setup.sh`** - One-time setup script
- **`.env.local.example`** - Environment optimizations

## 💡 Pro Tips

1. **Use Warp's AI**: Ask Warp AI about Next.js commands
2. **Custom workflows**: Modify `workflows.yaml` for your needs
3. **Emoji feedback**: Commands show visual progress
4. **Port management**: Easy switching between ports
5. **Type checking**: Built-in TypeScript validation

## 🐛 Troubleshooting

- **Port conflicts**: Use `ports` to see what's running
- **Cache issues**: Run `nclean` to reset everything
- **Type errors**: Use `ncheck` for detailed output
- **Dependencies**: Run `ndeps` to check for updates

## 📈 Performance Features

- **Turbopack enabled** by default
- **Telemetry disabled** for faster startup
- **Optimized memory allocation**
- **Fast refresh** for instant updates
- **Color output** optimized for Warp

---

*Happy coding with Warp! 🎉*
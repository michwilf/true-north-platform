# 🚀 Frontend Quick Start

## One-Line Start

```bash
./start.sh
```

That's it! The script will:
- ✅ Check for Node.js and npm
- ✅ Install dependencies if needed
- ✅ Handle port conflicts
- ✅ Start the dev server on port 3002

## Alternative Methods

### Using npm directly
```bash
npm run dev
```

### Using yarn
```bash
yarn dev
```

### Using pnpm
```bash
pnpm dev
```

### Using bun
```bash
bun dev
```

## First Time Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the server
./start.sh
```

## Important URLs

- **Frontend App**: http://localhost:3002
- **Backend API**: http://localhost:8002 (must be running)
- **API Docs**: http://localhost:8002/docs

## Troubleshooting

### Port 3002 in use?
```bash
# The start.sh script will prompt you to kill it
# Or manually:
lsof -ti:3002 | xargs kill -9
```

### Backend not responding?
```bash
# Start the backend first:
cd ..
python backend/scripts/runners/run_backend.py
```

### Dependencies issues?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build issues?
```bash
rm -rf .next
npm run dev
```

## Development Tips

1. **Hot Reload**: Changes auto-refresh (no need to restart)
2. **Type Safety**: TypeScript catches errors before runtime
3. **Lint on Save**: ESLint runs automatically
4. **Tailwind IntelliSense**: Install the VS Code extension for CSS autocomplete

## Need More Help?

- See [README.md](./README.md) for detailed documentation
- Check [API Documentation](../backend/docs/API_ENDPOINTS_ENHANCED.md)
- View [Main Project README](../README.md)

---

**Pro Tip:** Keep the backend running in one terminal and the frontend in another for the best development experience!


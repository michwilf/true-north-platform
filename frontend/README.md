# 🌐 True North Trading - Frontend

The modern, responsive frontend for the True North Trading platform, built with Next.js 14+ and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Backend API running on port 8002

### Installation

```bash
# Install dependencies
npm install
```

### Running the Development Server

#### Option 1: Using the Start Script (Recommended)

```bash
./start.sh
```

This will:
- Check for Node.js and npm
- Install dependencies if needed
- Check if port 3002 is available
- Start the development server

#### Option 2: Using npm

```bash
npm run dev
```

The application will be available at [http://localhost:3002](http://localhost:3002)

### Building for Production

```bash
# Create an optimized production build
npm run build

# Start the production server
npm run start
```

## 🏗️ Architecture

```
/frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Dashboard (Overview)
│   │   ├── opportunities/     # AI-discovered opportunities
│   │   ├── traders/           # Trader following & signals
│   │   ├── monitoring/        # Real-time alerts
│   │   ├── market-regime/     # Market analysis
│   │   ├── analyze/           # Stock analysis tool
│   │   ├── sectors/           # Sector rotation
│   │   ├── leaderboard/       # Trader rankings
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   │
│   ├── components/            # Reusable React components
│   │   ├── Navigation.tsx     # Global navigation
│   │   └── Header.tsx         # Application header
│   │
│   └── lib/                   # Utilities and API clients
│       └── api.ts             # API client functions
│
├── public/                    # Static assets
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── next.config.ts            # Next.js configuration
├── postcss.config.mjs        # PostCSS configuration
├── eslint.config.mjs         # ESLint configuration
├── start.sh                  # Start script
└── README.md                 # This file
```

## 📱 Features

### Dashboard (Overview)
- Portfolio summary with P&L metrics
- Recent trading signals
- Active alerts
- Market regime indicators
- Performance charts

### Opportunities
- AI-discovered trading opportunities
- Multi-agent research and analysis
- Entry/target/stop-loss prices
- Risk assessment
- Detailed source evidence from each agent

### Traders
- Follow top traders across platforms
- Real-time trading signals
- Performance metrics (win rate, followers)
- Signal feed with confidence scores

### Monitoring
- Real-time price alerts
- Technical indicator alerts
- News and sentiment alerts
- Filtering by severity
- Auto-refresh functionality

### Market Regime
- Volatility regime detection
- Market trend analysis
- Risk sentiment indicators
- Recommended trading strategies
- Detailed market indicators (VIX, SPY, 10Y Treasury)

### Stock Analysis
- Multi-agent stock analysis
- Overall recommendation and confidence
- Price targets (bull/base/bear case)
- Detailed breakdowns from:
  - Market Analyst
  - News Analyst
  - Fundamentals Analyst
  - Risk Manager

### Sector Rotation
- Sector performance heatmap
- 1-week and 1-month returns
- Momentum indicators
- Trending and lagging sector identification

### Trader Leaderboard
- Ranked by performance score
- Win rate and average return
- Sharpe ratio and max drawdown
- Follower counts
- Strategy types

## 🎨 Styling

This project uses:
- **Tailwind CSS v4** for styling
- **PostCSS** for CSS processing
- **Heroicons** for icons
- Custom design system with:
  - Dark mode color scheme
  - Responsive breakpoints
  - Animation utilities
  - Custom gradients

## 🔌 API Integration

The frontend connects to the backend API at `http://localhost:8002`. Key endpoints:

```typescript
// Opportunities
GET /api/opportunities

// Trader signals
GET /api/trader-signals

// Alerts
GET /api/alerts

// Market regime
GET /api/market-regime/detailed

// Stock analysis
POST /api/analyze-stock/{symbol}

// Sector rotation
GET /api/sector-rotation

// Trader leaderboard
GET /api/trader-leaderboard
```

See `/backend/docs/API_ENDPOINTS_ENHANCED.md` for full API documentation.

## 🛠️ Development

### Code Structure

- **App Router**: Using Next.js 14+ app directory structure
- **Server Components**: Default for better performance
- **Client Components**: Used when interactivity is needed (marked with `'use client'`)
- **TypeScript**: Fully typed for better DX and fewer bugs

### Adding a New Page

1. Create a new directory in `src/app/`:
   ```bash
   mkdir src/app/my-feature
   ```

2. Create a `page.tsx` file:
   ```tsx
   export default function MyFeaturePage() {
     return (
       <div className="p-6">
         <h1 className="text-2xl font-bold">My Feature</h1>
       </div>
     );
   }
   ```

3. Add to navigation in `src/components/Navigation.tsx`

### Adding a New Component

1. Create component in `src/components/`:
   ```tsx
   export function MyComponent({ data }: { data: string }) {
     return <div>{data}</div>;
   }
   ```

2. Import and use in your pages

### Working with the API

Example API call:

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function MyPage() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('http://localhost:8002/api/my-endpoint')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <div>{/* Render data */}</div>;
}
```

## 📦 Scripts

```bash
# Development
npm run dev          # Start development server on port 3002

# Production
npm run build        # Create optimized production build
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking (if configured)

# Quick Start
./start.sh           # Start with automatic setup
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for frontend-specific environment variables:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8002
NEXT_PUBLIC_WS_URL=ws://localhost:8002
```

### Port Configuration

The default port is `3002`. To change it:

**In package.json:**
```json
{
  "scripts": {
    "dev": "next dev --port 3002"
  }
}
```

**Or via environment variable:**
```bash
PORT=3002 npm run dev
```

## 🎯 Key Technologies

- **[Next.js 14+](https://nextjs.org/)** - React framework with App Router
- **[React 18+](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS
- **[Heroicons](https://heroicons.com/)** - Icon library
- **[PostCSS](https://postcss.org/)** - CSS processing

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process using port 3002
lsof -ti:3002

# Kill the process
kill -9 $(lsof -ti:3002)

# Or use the start script which handles this
./start.sh
```

### Backend Connection Failed

1. Ensure backend is running on port 8002
2. Check CORS settings in backend
3. Verify API endpoints in browser: http://localhost:8002/docs

### Styling Not Applied

1. Check Tailwind CSS configuration in `globals.css`
2. Verify PostCSS configuration
3. Clear Next.js cache: `rm -rf .next`

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy

### Docker

```bash
# Build
docker build -t true-north-frontend .

# Run
docker run -p 3002:3002 true-north-frontend
```

### Production Checklist

- [ ] Set `NEXT_PUBLIC_API_URL` to production backend URL
- [ ] Run `npm run build` successfully
- [ ] Test all pages and features
- [ ] Verify API connections
- [ ] Check browser console for errors
- [ ] Test on mobile devices

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is part of True North Trading Platform - MIT License

---

**Need Help?** Check the main [project documentation](../README.md) or [backend API docs](../backend/docs/API_ENDPOINTS_ENHANCED.md)

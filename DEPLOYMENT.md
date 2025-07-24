# Deployment Guide

This guide covers various deployment options for the 3D Orderbook Depth Visualizer.

## 🚀 Vercel (Recommended)

Vercel provides the best experience for Next.js applications with zero configuration.

### Automatic Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically deploy on every push

### Manual Deployment

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
\`\`\`

### Environment Variables

Set these in your Vercel dashboard if using real APIs:

\`\`\`
NEXT_PUBLIC_BINANCE_WS_URL=wss://stream.binance.com:9443/ws
NEXT_PUBLIC_OKX_WS_URL=wss://ws.okx.com:8443/ws/v5/public
\`\`\`

## 🌐 Netlify

### Build Settings

- **Build Command**: \`npm run build\`
- **Publish Directory**: \`.next\`
- **Node Version**: 18

### netlify.toml

\`\`\`toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
\`\`\`

## ☁️ AWS Amplify

1. Connect your GitHub repository
2. Set build settings:
   - **Build Command**: \`npm run build\`
   - **Output Directory**: \`.next\`
3. Deploy automatically on push

## 🐳 Docker

### Dockerfile

\`\`\`dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]
\`\`\`

### docker-compose.yml

\`\`\`yaml
version: '3.8'
services:
  orderbook-visualizer:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
\`\`\`

### Build and Run

\`\`\`bash
# Build image
docker build -t orderbook-visualizer .

# Run container
docker run -p 3000:3000 orderbook-visualizer

# Or use docker-compose
docker-compose up -d
\`\`\`

## 🔧 Performance Optimization

### Build Optimization

\`\`\`javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    unoptimized: true,
  },
  // Enable compression
  compress: true,
  // Enable static optimization
  trailingSlash: false,
}

module.exports = nextConfig
\`\`\`

### CDN Configuration

For optimal performance, configure your CDN to:

- Cache static assets for 1 year
- Cache HTML for 1 hour
- Enable gzip/brotli compression
- Use HTTP/2

## 📊 Monitoring

### Performance Monitoring

Add performance monitoring with services like:

- Vercel Analytics
- Google Analytics
- Sentry for error tracking
- LogRocket for user sessions

### Health Checks

Implement health check endpoints:

\`\`\`typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version 
  })
}
\`\`\`

## 🔒 Security

### Headers

Configure security headers:

\`\`\`javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
\`\`\`

### Environment Variables

Never commit sensitive data. Use environment variables for:

- API keys
- Database URLs
- Third-party service credentials

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (18+)
   - Clear npm cache: \`npm cache clean --force\`
   - Delete node_modules and reinstall

2. **3D Rendering Issues**
   - Ensure WebGL support
   - Check browser compatibility
   - Verify hardware acceleration

3. **Performance Issues**
   - Enable production optimizations
   - Check bundle size
   - Optimize 3D assets

### Debug Mode

Enable debug mode for troubleshooting:

\`\`\`bash
DEBUG=* npm run dev
\`\`\`

## 📈 Scaling

### Horizontal Scaling

For high traffic:

1. Use a load balancer
2. Deploy multiple instances
3. Implement session stickiness if needed

### Vertical Scaling

For better performance:

1. Increase server resources
2. Optimize database queries
3. Implement caching strategies

## 🔄 CI/CD Pipeline

### GitHub Actions

\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      - run: npm run type-check
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
\`\`\`

This deployment guide should help you get the 3D Orderbook Depth Visualizer running in any environment!

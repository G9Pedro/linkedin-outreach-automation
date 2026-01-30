# Deployment Guide

## Deployment Options

### Option 1: Vercel (Recommended)

#### Prerequisites
- Vercel account
- PostgreSQL database (Neon, Supabase, or Railway)

#### Steps

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Connect to Vercel**
- Go to [Vercel](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Configure environment variables

3. **Environment Variables**

Add these in Vercel dashboard:

```
DATABASE_URL=postgresql://...
LINKEDIN_CLIENT_ID=...
LINKEDIN_CLIENT_SECRET=...
LINKEDIN_REDIRECT_URI=https://yourdomain.com/api/auth/callback
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_MAX_DAILY_CONNECTIONS=50
NEXT_PUBLIC_MAX_DAILY_MESSAGES=100
```

4. **Deploy**
- Click "Deploy"
- Wait for build to complete
- Your app is live! 🎉

5. **Set Up Database**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Push database schema
npx prisma db push
```

### Option 2: Railway

1. **Create Railway Account**
   - Go to [Railway](https://railway.app)
   - Sign up with GitHub

2. **New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add PostgreSQL**
   - Click "+ New"
   - Select "Database" → "PostgreSQL"
   - Copy connection string

4. **Configure Variables**
   - Add all environment variables
   - Railway will auto-deploy on push

### Option 3: Docker

```dockerfile
# Dockerfile (create this file)
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/linkedin_outreach
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=linkedin_outreach
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

```bash
# Deploy with Docker
docker-compose up -d
```

## Post-Deployment

### 1. Set Up Cron Jobs

For automated follow-ups and connection requests:

#### Vercel Cron

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/automation/follow-ups",
      "schedule": "0 */2 * * *"
    }
  ]
}
```

#### External Cron Services
- [Cron-job.org](https://cron-job.org)
- [EasyCron](https://www.easycron.com)

### 2. Set Up Monitoring

- [Sentry](https://sentry.io) - Error tracking
- [LogRocket](https://logrocket.com) - Session replay
- [Vercel Analytics](https://vercel.com/analytics)

### 3. Configure Custom Domain

1. Add domain in Vercel/Railway dashboard
2. Update DNS records
3. Update `LINKEDIN_REDIRECT_URI` in LinkedIn Developer App

### 4. Enable Production Optimizations

```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## Security Checklist

- [ ] Enable HTTPS
- [ ] Set secure environment variables
- [ ] Configure CORS properly
- [ ] Add rate limiting
- [ ] Enable database encryption
- [ ] Set up regular backups
- [ ] Configure firewall rules
- [ ] Enable 2FA for admin accounts

## Scaling Considerations

### Database
- Connection pooling (PgBouncer)
- Read replicas
- Database indexing

### Application
- Redis caching
- CDN for static assets
- Load balancing

### Background Jobs
- Queue system (BullMQ + Redis)
- Separate worker processes
- Job prioritization

## Monitoring & Maintenance

```bash
# Check application logs
vercel logs

# Monitor database
npx prisma studio --browser none

# Check job queue (if using BullMQ)
redis-cli MONITOR
```

## Rollback Procedure

```bash
# Vercel
vercel rollback

# Docker
docker-compose down
git checkout previous-commit
docker-compose up -d
```
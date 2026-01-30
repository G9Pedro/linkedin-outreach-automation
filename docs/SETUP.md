# Setup Guide

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- LinkedIn Developer App credentials
- Git

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/G9Pedro/linkedin-outreach-automation.git
cd linkedin-outreach-automation
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up PostgreSQL Database

#### Option A: Local PostgreSQL

```bash
# Create a new database
creatdb linkedin_outreach
```

#### Option B: Using Docker

```bash
docker run --name postgres-linkedin \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=linkedin_outreach \
  -p 5432:5432 \
  -d postgres:15
```

#### Option C: Cloud Database (Recommended for Production)

- [Supabase](https://supabase.com) - Free tier available
- [Neon](https://neon.tech) - Serverless Postgres
- [Railway](https://railway.app) - Easy deployment

### 4. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/linkedin_outreach"

LINKEDIN_CLIENT_ID=your_client_id_here
LINKEDIN_CLIENT_SECRET=your_client_secret_here
LINKEDIN_REDIRECT_URI=http://localhost:3000/api/auth/callback

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_MAX_DAILY_CONNECTIONS=50
NEXT_PUBLIC_MAX_DAILY_MESSAGES=100
```

### 5. Set Up LinkedIn Developer App

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create a new app
3. Add redirect URL: `http://localhost:3000/api/auth/callback`
4. Request necessary permissions:
   - `r_basicprofile`
   - `r_emailaddress`
   - `w_member_social`
5. Copy your Client ID and Client Secret to `.env`

### 6. Initialize Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Open Prisma Studio to view data
npm run db:studio
```

### 7. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Troubleshooting

### Database Connection Issues

```bash
# Test PostgreSQL connection
psql -U postgres -h localhost -d linkedin_outreach
```

### Prisma Issues

```bash
# Reset database (WARNING: Deletes all data)
npm run db:push -- --force-reset

# Regenerate Prisma client
rm -rf node_modules/.prisma
npm run db:generate
```

### Port Already in Use

```bash
# Run on different port
PORT=3001 npm run dev
```

## Next Steps

1. Create your first campaign
2. Add prospects (manually or via CSV)
3. Configure message templates
4. Start automation
5. Monitor analytics

## Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment instructions.
# LinkedIn Outreach Automation System

A comprehensive automation system for LinkedIn outreach with personalized messaging, follow-up sequences, and detailed analytics.

## 🚀 Features

### 1. Automated Connection Request System
- Smart connection request automation
- Daily limits to avoid LinkedIn restrictions
- Queue management for pending requests
- Automatic retry logic for failed requests

### 2. Personalized Message Templates
- Industry-specific message templates
- Dynamic variable replacement (name, company, industry)
- A/B testing support for message optimization
- Template library with proven high-performing messages

### 3. Follow-up Sequence Automation
- Multi-step follow-up sequences (up to 3 follow-ups)
- Customizable delay between messages
- Smart sequence stopping when prospect replies
- Automatic sequence progression based on prospect status

### 4. Analytics Dashboard
- Real-time campaign performance metrics
- Connection acceptance rates
- Message response rates
- Conversion tracking
- Visual charts and graphs
- Export analytics data

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Charts**: Chart.js + react-chartjs-2
- **API Integration**: Axios

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/G9Pedro/linkedin-outreach-automation.git
cd linkedin-outreach-automation
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- Database connection string
- LinkedIn API credentials
- App configuration

4. **Set up the database**
```bash
npm run db:generate
npm run db:push
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Usage

### Creating a Campaign

1. Navigate to the Campaigns page
2. Click "Create New Campaign"
3. Fill in campaign details:
   - Campaign name
   - Target industry
   - Message templates
   - Follow-up sequence timing

### Adding Prospects

1. Open a campaign
2. Add prospects manually or import from CSV
3. Required fields: LinkedIn URL, Name, Industry

### Monitoring Performance

1. Visit the Analytics Dashboard
2. View real-time metrics:
   - Connection acceptance rate
   - Message response rate
   - Conversion rate
3. Export data for further analysis

## 🔒 LinkedIn API Compliance

**Important**: This system is designed to work within LinkedIn's terms of service:

- Respects daily connection limits (default: 50/day)
- Implements rate limiting for API calls
- Includes delays between actions to mimic human behavior
- Requires proper LinkedIn API credentials

**Note**: Always review and comply with LinkedIn's current terms of service and API usage policies.

## 📊 Database Schema

The system uses the following main entities:

- **Campaign**: Outreach campaign configuration
- **Prospect**: Target LinkedIn profiles
- **MessageTemplate**: Industry-specific message templates
- **OutreachHistory**: Complete history of all outreach activities
- **CampaignAnalytics**: Aggregated performance metrics

## 🚦 Project Status

- [x] Initial MVP setup
- [x] Database schema design
- [x] Core automation engine
- [x] Message templating system
- [x] Follow-up sequence automation
- [x] Analytics dashboard
- [ ] LinkedIn OAuth integration
- [ ] CSV import/export
- [ ] A/B testing framework
- [ ] Email notifications
- [ ] Team collaboration features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for your own purposes.

## ⚠️ Disclaimer

This tool is for educational and legitimate business purposes only. Users are responsible for ensuring their use complies with LinkedIn's terms of service and all applicable laws and regulations.
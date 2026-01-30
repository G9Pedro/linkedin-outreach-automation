import Link from 'next/link'
import { ArrowRight, Target, MessageSquare, BarChart3, Zap } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-linkedin-blue to-linkedin-light">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-linkedin-blue" />
              <span className="ml-2 text-xl font-bold text-gray-900">LinkedIn Outreach</span>
            </div>
            <div className="flex gap-4">
              <Link href="/campaigns" className="px-4 py-2 text-gray-700 hover:text-linkedin-blue">
                Campaigns
              </Link>
              <Link href="/analytics" className="px-4 py-2 text-gray-700 hover:text-linkedin-blue">
                Analytics
              </Link>
              <Link href="/templates" className="px-4 py-2 text-gray-700 hover:text-linkedin-blue">
                Templates
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Automate Your LinkedIn Outreach
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Build meaningful connections at scale with personalized messages,
            intelligent follow-ups, and comprehensive analytics.
          </p>
          <Link
            href="/campaigns/new"
            className="inline-flex items-center px-8 py-4 bg-white text-linkedin-blue font-semibold rounded-lg hover:bg-gray-50 transition"
          >
            Start Your First Campaign
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Target className="h-8 w-8" />}
            title="Smart Targeting"
            description="Target prospects by industry, role, and company with precision."
          />
          <FeatureCard
            icon={<MessageSquare className="h-8 w-8" />}
            title="Personalized Messages"
            description="Industry-specific templates with dynamic personalization."
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Auto Follow-ups"
            description="3-step follow-up sequences with intelligent timing."
          />
          <FeatureCard
            icon={<BarChart3 className="h-8 w-8" />}
            title="Performance Analytics"
            description="Track connections, responses, and conversions in real-time."
          />
        </div>
      </div>
    </main>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
      <div className="text-linkedin-blue mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
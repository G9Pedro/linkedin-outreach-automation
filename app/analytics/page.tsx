'use client'

import { useQuery } from '@tanstack/react-query'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { TrendingUp, Users, MessageSquare, Target } from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function AnalyticsPage() {
  const { data: campaigns } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const response = await fetch('/api/campaigns')
      return response.json()
    },
  })

  // Calculate aggregate metrics
  const totalProspects = campaigns?.reduce((sum: number, c: any) => sum + (c.analytics?.totalProspects || 0), 0) || 0
  const totalConnections = campaigns?.reduce((sum: number, c: any) => sum + (c.analytics?.connectionsAccepted || 0), 0) || 0
  const totalReplies = campaigns?.reduce((sum: number, c: any) => sum + (c.analytics?.repliesReceived || 0), 0) || 0
  const totalConversions = campaigns?.reduce((sum: number, c: any) => sum + (c.analytics?.conversions || 0), 0) || 0

  const avgConnectionRate = campaigns?.length > 0
    ? campaigns.reduce((sum: number, c: any) => sum + (c.analytics?.connectionRate || 0), 0) / campaigns.length
    : 0

  // Chart data
  const lineChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Connections',
        data: [12, 19, 25, 32],
        borderColor: 'rgb(10, 102, 194)',
        backgroundColor: 'rgba(10, 102, 194, 0.5)',
      },
      {
        label: 'Responses',
        data: [5, 8, 12, 18],
        borderColor: 'rgb(55, 143, 233)',
        backgroundColor: 'rgba(55, 143, 233, 0.5)',
      },
    ],
  }

  const statusChartData = {
    labels: ['Pending', 'Connected', 'Messaged', 'Replied', 'Converted'],
    datasets: [
      {
        data: [totalProspects - totalConnections, totalConnections - totalReplies, totalReplies - totalConversions, totalConversions, totalConversions],
        backgroundColor: [
          'rgba(156, 163, 175, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(10, 102, 194, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<Users className="h-8 w-8" />}
            title="Total Prospects"
            value={totalProspects}
            change="+12%"
          />
          <MetricCard
            icon={<Target className="h-8 w-8" />}
            title="Connections"
            value={totalConnections}
            change="+8%"
          />
          <MetricCard
            icon={<MessageSquare className="h-8 w-8" />}
            title="Responses"
            value={totalReplies}
            change="+15%"
          />
          <MetricCard
            icon={<TrendingUp className="h-8 w-8" />}
            title="Conversions"
            value={totalConversions}
            change="+23%"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Over Time</h2>
            <Line data={lineChartData} options={{ responsive: true }} />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Prospect Status Distribution</h2>
            <Doughnut data={statusChartData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Connection Rate */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Average Connection Rate</h2>
          <div className="flex items-center">
            <div className="flex-1">
              <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linkedin-blue transition-all"
                  style={{ width: `${avgConnectionRate}%` }}
                ></div>
              </div>
            </div>
            <span className="ml-4 text-2xl font-bold text-linkedin-blue">
              {avgConnectionRate.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  icon,
  title,
  value,
  change,
}: {
  icon: React.ReactNode
  title: string
  value: number
  change: string
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-linkedin-blue">{icon}</div>
        <span className="text-sm font-semibold text-green-600">{change}</span>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
    </div>
  )
}
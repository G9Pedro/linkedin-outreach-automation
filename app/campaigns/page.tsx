'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Plus, Play, Pause, BarChart3 } from 'lucide-react'

interface Campaign {
  id: string
  name: string
  description?: string
  targetIndustry: string
  status: string
  createdAt: string
  _count: {
    prospects: number
  }
  analytics?: {
    connectionRate: number
    responseRate: number
    conversions: number
  }
}

export default function CampaignsPage() {
  const { data: campaigns, isLoading } = useQuery<Campaign[]>({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const response = await fetch('/api/campaigns')
      if (!response.ok) throw new Error('Failed to fetch campaigns')
      return response.json()
    },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
            <p className="text-gray-600 mt-1">Manage your outreach campaigns</p>
          </div>
          <Link
            href="/campaigns/new"
            className="inline-flex items-center px-4 py-2 bg-linkedin-blue text-white font-semibold rounded-lg hover:bg-linkedin-light transition"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Campaign
          </Link>
        </div>

        {/* Campaigns Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-linkedin-blue mx-auto"></div>
          </div>
        ) : campaigns && campaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 mb-4">No campaigns yet</p>
            <Link
              href="/campaigns/new"
              className="text-linkedin-blue hover:underline"
            >
              Create your first campaign
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  const statusColor = campaign.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'

  return (
    <Link href={`/campaigns/${campaign.id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{campaign.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{campaign.targetIndustry}</p>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColor}`}>
            {campaign.status}
          </span>
        </div>

        {campaign.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{campaign.description}</p>
        )}

        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Prospects</span>
            <span className="font-semibold">{campaign._count.prospects}</span>
          </div>
          {campaign.analytics && (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Connection Rate</span>
                <span className="font-semibold">{campaign.analytics.connectionRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Response Rate</span>
                <span className="font-semibold">{campaign.analytics.responseRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Conversions</span>
                <span className="font-semibold">{campaign.analytics.conversions}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
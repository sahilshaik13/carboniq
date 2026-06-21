'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import Header from '@/components/header'
import StatsCards from '@/components/stats-cards'
import EmissionsChart from '@/components/emissions-chart'
import ActivityLogger from '@/components/activity-logger'
import InsightsPanel from '@/components/insights-panel'

export default function DashboardPage() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header user={user} />

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8 space-y-8">
            {/* Navigation Tabs */}
            <div className="flex gap-4 border-b border-border">
              {['overview', 'log', 'insights', 'ledger'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 capitalize font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <StatsCards />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <EmissionsChart />
                  </div>
                  <div>
                    <InsightsPanel />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'log' && <ActivityLogger />}

            {activeTab === 'insights' && <InsightsPanel />}

            {activeTab === 'ledger' && (
              <div className="bg-card border border-border rounded-lg p-6 text-center text-muted-foreground">
                <p>Credit ledger and blockchain verification coming soon</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

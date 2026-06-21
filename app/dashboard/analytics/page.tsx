'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import Header from '@/components/header'
import { TrendingDown, Award, Globe, BarChart3 } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function AnalyticsPage() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()

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

  // Mock data
  const regionalData = {
    avg_annual: 2100,
    median_annual: 1950,
    user_annual: 1205,
    percentile: 32,
    p10: 800,
    p90: 3500,
  }

  const categoryTrends = [
    { category: 'Transport', trend: 'down', improvement: 8.5, avg_weekly: 45.2 },
    { category: 'Energy', trend: 'stable', improvement: 2.1, avg_weekly: 28.1 },
    { category: 'Food', trend: 'improving', improvement: 15.3, avg_weekly: 12.5 },
  ]

  const comparisonData = [
    { name: 'You', value: 1205 },
    { name: 'Regional Avg', value: 2100 },
    { name: 'Global Avg', value: 2500 },
  ]

  const colors = ['#22c55e', '#4ade80', '#86efac']

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />

        <main className="flex-1 overflow-auto">
          <div className="p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Analytics & Benchmarking</h2>
              <p className="text-muted-foreground text-sm mt-1">Phase 3: Advanced insights and regional comparison</p>
            </div>

            {/* Regional Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Your Position</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Annual Emissions</p>
                    <p className="text-2xl font-bold text-primary">{regionalData.user_annual} kg CO₂e</p>
                  </div>
                  <div className="bg-secondary rounded-lg p-3">
                    <p className="text-sm font-medium text-foreground mb-1">Regional Percentile</p>
                    <div className="w-full bg-background rounded-full h-2 mb-2">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${regionalData.percentile}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Better than {regionalData.percentile}% of users in your region
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold text-foreground">Regional Average</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Annual Emissions</p>
                    <p className="text-2xl font-bold text-foreground">{regionalData.avg_annual} kg CO₂e</p>
                  </div>
                  <div className="text-sm space-y-1">
                    <p className="text-muted-foreground">
                      Median: <span className="text-foreground font-medium">{regionalData.median_annual}</span>
                    </p>
                    <p className="text-muted-foreground">
                      10th percentile: <span className="text-foreground font-medium">{regionalData.p10}</span>
                    </p>
                    <p className="text-muted-foreground">
                      90th percentile: <span className="text-foreground font-medium">{regionalData.p90}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Your Status</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                    <p className="text-sm font-semibold text-primary mb-1">Excellent Performance</p>
                    <p className="text-xs text-muted-foreground">
                      You are {Math.round(((regionalData.avg_annual - regionalData.user_annual) / regionalData.avg_annual) * 100)}% below regional average
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground mb-2">Potential Savings</p>
                    <p className="text-lg font-bold text-primary">
                      {Math.round(regionalData.avg_annual - regionalData.user_annual)} kg CO₂e/year
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Comparison Chart */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Annual Emissions Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--color-card)',
                        border: `1px solid var(--color-border)`,
                        borderRadius: '0.5rem',
                      }}
                    />
                    <Bar dataKey="value" fill="var(--color-primary)" name="kg CO₂e">
                      {comparisonData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Category Trends */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Category Trends</h3>
                <div className="space-y-4">
                  {categoryTrends.map((item) => (
                    <div key={item.category} className="p-4 bg-secondary rounded-lg border border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-foreground">{item.category}</p>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${
                            item.trend === 'down'
                              ? 'bg-primary/20 text-primary'
                              : item.trend === 'stable'
                                ? 'bg-muted/20 text-muted-foreground'
                                : 'bg-accent/20 text-accent'
                          }`}
                        >
                          {item.trend === 'down'
                            ? `↓ ${item.improvement}%`
                            : item.trend === 'stable'
                              ? '→ Stable'
                              : `↑ Improving ${item.improvement}%`}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Avg weekly: <span className="text-foreground font-medium">{item.avg_weekly} kg CO₂e</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Global Stats */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Global Community Impact</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-secondary rounded-lg p-4 text-center space-y-2">
                  <BarChart3 className="w-5 h-5 text-primary mx-auto" />
                  <p className="text-xs text-muted-foreground">Total Tracked</p>
                  <p className="text-xl font-bold text-foreground">2.5M tonnes</p>
                </div>
                <div className="bg-secondary rounded-lg p-4 text-center space-y-2">
                  <Globe className="w-5 h-5 text-primary mx-auto" />
                  <p className="text-xs text-muted-foreground">Active Users</p>
                  <p className="text-xl font-bold text-foreground">50K+</p>
                </div>
                <div className="bg-secondary rounded-lg p-4 text-center space-y-2">
                  <Award className="w-5 h-5 text-primary mx-auto" />
                  <p className="text-xs text-muted-foreground">Carbon Saved</p>
                  <p className="text-xl font-bold text-primary">125K tonnes</p>
                </div>
                <div className="bg-secondary rounded-lg p-4 text-center space-y-2">
                  <TrendingDown className="w-5 h-5 text-primary mx-auto" />
                  <p className="text-xs text-muted-foreground">Avg Reduction</p>
                  <p className="text-xl font-bold text-foreground">8.2%</p>
                </div>
              </div>
            </div>

            {/* Phase 3 Info */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-2">Phase 3: Analytics & Benchmarking</h4>
              <p className="text-sm text-muted-foreground">
                This section will integrate BigQuery for advanced analytics, provide detailed regional benchmarking, track global trends, and enable community comparisons. You'll be able to set reduction targets and track progress against peer groups and industry standards.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

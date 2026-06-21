'use client'

import { TrendingDown, TrendingUp, Zap, Leaf } from 'lucide-react'

export default function StatsCards() {
  const stats = [
    {
      label: 'This Month',
      value: '125.4',
      unit: 'kg CO₂e',
      icon: <Zap className="w-6 h-6" />,
      color: 'text-primary',
      trend: 'down',
      change: '8.2%',
    },
    {
      label: 'This Year',
      value: '1,205.3',
      unit: 'kg CO₂e',
      icon: <Leaf className="w-6 h-6" />,
      color: 'text-accent',
      trend: 'up',
      change: '2.5%',
    },
    {
      label: 'Daily Average',
      value: '4.2',
      unit: 'kg CO₂e/day',
      icon: <TrendingDown className="w-6 h-6" />,
      color: 'text-primary',
      trend: 'down',
      change: '5.1%',
    },
    {
      label: 'vs. Regional Avg',
      value: '-32%',
      unit: 'Below average',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-primary',
      trend: 'down',
      change: 'Great job!',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-6 space-y-4 hover:border-primary/50 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.unit}</span>
              </div>
            </div>
            <div className={`${stat.color} bg-primary/10 rounded-lg p-2`}>{stat.icon}</div>
          </div>

          <div className="flex items-center gap-1 text-xs">
            {stat.trend === 'down' ? (
              <TrendingDown className="w-3 h-3 text-primary" />
            ) : (
              <TrendingUp className="w-3 h-3 text-destructive" />
            )}
            <span className={stat.trend === 'down' ? 'text-primary' : 'text-destructive'}>
              {stat.change}
            </span>
            <span className="text-muted-foreground">vs. last month</span>
          </div>
        </div>
      ))}
    </div>
  )
}

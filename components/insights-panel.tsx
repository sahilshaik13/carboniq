'use client'

import { Lightbulb, TrendingDown, Zap } from 'lucide-react'

const insights = [
  {
    title: 'Switch to Public Transport',
    description: 'Your car commute accounts for 45% of your weekly emissions',
    recommendation: 'Consider taking the bus or train for your daily commute',
    savings: 12.5,
    icon: <TrendingDown className="w-5 h-5" />,
  },
  {
    title: 'Reduce Energy Usage',
    description: 'Your electricity usage is 15% above the regional average',
    recommendation: 'Try using LED bulbs and optimizing thermostat settings',
    savings: 8.3,
    icon: <Zap className="w-5 h-5" />,
  },
  {
    title: 'Plant-Based Meals',
    description: 'Meat consumption contributes 22% of your monthly footprint',
    recommendation: 'Try "Meatless Mondays" or reduce meat intake by 30%',
    savings: 6.8,
    icon: <Lightbulb className="w-5 h-5" />,
  },
]

export default function InsightsPanel() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">AI-Powered Insights</h3>

      {insights.map((insight, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 space-y-3 hover:border-primary/50 transition-colors cursor-pointer"
        >
          <div className="flex items-start gap-3">
            <div className="text-primary bg-primary/10 p-2 rounded-lg mt-0.5">{insight.icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground text-sm">{insight.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
            </div>
          </div>

          <div className="bg-secondary rounded-lg p-3 space-y-2">
            <p className="text-xs font-medium text-foreground">Recommendation:</p>
            <p className="text-xs text-muted-foreground">{insight.recommendation}</p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-xs text-muted-foreground">Potential savings:</span>
            <span className="text-sm font-semibold text-primary">{insight.savings} kg CO₂e/month</span>
          </div>
        </div>
      ))}

      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-sm">
        <p className="text-foreground font-medium mb-2">Track Your Progress</p>
        <p className="text-muted-foreground text-xs">
          Implement these recommendations to reduce your carbon footprint and contribute to a sustainable future.
        </p>
      </div>
    </div>
  )
}

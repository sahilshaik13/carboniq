'use client'

import { useState } from 'react'
import { Zap, TrendingUp, Users, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

export default function CreditMarketplace() {
  const [activeTab, setActiveTab] = useState<'overview' | 'trade' | 'leaderboard'>('overview')

  const stats = {
    user_balance: 1250,
    total_earned: 2500,
    total_retired: 1250,
    marketplace_price: 5.25,
  }

  const recentTrades = [
    { id: '1', from: 'Alice M.', to: 'You', amount: 100, price: 5.2, date: '2 hours ago' },
    { id: '2', from: 'You', to: 'Bob S.', amount: 50, price: 5.15, date: '1 day ago' },
    { id: '3', from: 'Carol D.', to: 'You', amount: 150, price: 5.3, date: '3 days ago' },
  ]

  const leaderboard = [
    { rank: 1, name: 'Eco Warrior', credits: 15000, region: 'Europe' },
    { rank: 2, name: 'Green Guardian', credits: 12500, region: 'North America' },
    { rank: 3, name: 'Sustainability Champion', credits: 10800, region: 'Asia' },
    { rank: 4, name: 'You', credits: 1250, region: 'Your Region', highlight: true },
    { rank: 5, name: 'Carbon Cutter', credits: 9200, region: 'Europe' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Carbon Credit Marketplace</h3>
        <p className="text-sm text-muted-foreground">Phase 3: Trade verified carbon credits</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-secondary rounded-lg p-4 text-center space-y-2">
            <Zap className="w-5 h-5 text-primary mx-auto" />
            <p className="text-xs text-muted-foreground">Your Balance</p>
            <p className="text-xl font-bold text-foreground">{stats.user_balance}</p>
          </div>
          <div className="bg-secondary rounded-lg p-4 text-center space-y-2">
            <TrendingUp className="w-5 h-5 text-primary mx-auto" />
            <p className="text-xs text-muted-foreground">Total Earned</p>
            <p className="text-xl font-bold text-foreground">{stats.total_earned}</p>
          </div>
          <div className="bg-secondary rounded-lg p-4 text-center space-y-2">
            <Award className="w-5 h-5 text-primary mx-auto" />
            <p className="text-xs text-muted-foreground">Total Retired</p>
            <p className="text-xl font-bold text-foreground">{stats.total_retired}</p>
          </div>
          <div className="bg-secondary rounded-lg p-4 text-center space-y-2">
            <Zap className="w-5 h-5 text-primary mx-auto" />
            <p className="text-xs text-muted-foreground">Market Price</p>
            <p className="text-xl font-bold text-primary">${stats.marketplace_price}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border">
        {(['overview', 'trade', 'leaderboard'] as const).map((tab) => (
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Trades */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h4 className="font-semibold text-foreground">Recent Trades</h4>
            <div className="space-y-3">
              {recentTrades.map((trade) => (
                <div
                  key={trade.id}
                  className="flex items-center justify-between p-3 bg-secondary rounded-lg border border-border/50"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {trade.from} {trade.from === 'You' ? '→' : '→'} {trade.to}
                    </p>
                    <p className="text-xs text-muted-foreground">{trade.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{trade.amount}</p>
                    <p className="text-xs text-muted-foreground">${trade.price.toFixed(2)}/credit</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h4 className="font-semibold text-foreground">Quick Actions</h4>
            <div className="space-y-3">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Sell Credits
              </Button>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                Buy Credits
              </Button>
              <Button variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive/10">
                Retire Credits (Offset)
              </Button>
            </div>

            {/* Info */}
            <div className="bg-secondary/50 border border-border rounded-lg p-4 text-xs text-muted-foreground space-y-2">
              <p>
                <strong>Blockchain Verified:</strong> All transactions are recorded on-chain with cryptographic proofs.
              </p>
              <p>
                <strong>Credits Earned:</strong> 1 kg CO₂e reduced = 1 credit earned
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'trade' && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h4 className="font-semibold text-foreground mb-4">Trade Credits</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Trade Type</label>
              <select className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Buy Credits</option>
                <option>Sell Credits</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Amount</label>
              <input
                type="number"
                placeholder="100"
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Price per Credit</label>
              <div className="flex items-center gap-2">
                <span className="text-foreground">$</span>
                <input
                  type="number"
                  placeholder="5.25"
                  defaultValue={stats.marketplace_price}
                  className="flex-1 px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="bg-secondary rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Total Value</p>
              <p className="text-2xl font-bold text-primary">$525.00</p>
            </div>
            <Button
              onClick={() => toast.success('Trade executed!')}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Execute Trade
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h4 className="font-semibold text-foreground mb-4">Global Leaderboard</h4>
          <div className="space-y-2">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  user.highlight
                    ? 'bg-primary/10 border-primary/30'
                    : 'bg-secondary border-border/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-lg font-bold text-muted-foreground w-8 text-center">#{user.rank}</div>
                  <div>
                    <p className={`font-medium ${user.highlight ? 'text-primary' : 'text-foreground'}`}>
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{user.region}</p>
                  </div>
                </div>
                <p className="font-bold text-foreground">{user.credits.toLocaleString()} credits</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Phase 3 Info */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-sm">
        <p className="font-semibold text-foreground mb-2">Phase 3: Marketplace</p>
        <p className="text-muted-foreground text-xs">
          This marketplace will feature blockchain-verified carbon credits, peer-to-peer trading, price discovery, and integration with environmental offset programs.
        </p>
      </div>
    </div>
  )
}

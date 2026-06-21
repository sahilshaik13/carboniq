'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Settings, Bell, Lock, User, Database } from 'lucide-react'
import Sidebar from '@/components/sidebar'
import Header from '@/components/header'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const { isAuthenticated, isLoading, user, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')

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

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />

        <main className="flex-1 overflow-auto">
          <div className="p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Settings</h2>
              <p className="text-muted-foreground text-sm mt-1">Manage your account and preferences</p>
            </div>

            <div className="flex gap-8">
              {/* Sidebar */}
              <div className="w-48 space-y-2">
                {[
                  { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
                  { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
                  { id: 'privacy', label: 'Privacy & Security', icon: <Lock className="w-4 h-4" /> },
                  { id: 'data', label: 'Data Management', icon: <Database className="w-4 h-4" /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-left text-sm ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 max-w-2xl">
                {activeTab === 'profile' && (
                  <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                    <h3 className="text-lg font-semibold">Profile Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                        <input
                          type="email"
                          value={user?.email || ''}
                          disabled
                          className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                        <input
                          type="text"
                          placeholder="Your name"
                          defaultValue={user?.full_name || ''}
                          className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                        <input
                          type="text"
                          placeholder="City, Country"
                          className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <Button
                        onClick={() => toast.success('Changes saved')}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                    <h3 className="text-lg font-semibold">Notification Preferences</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Weekly Insights Report', desc: 'Get AI-powered recommendations' },
                        { label: 'Goal Reminders', desc: 'Remind me of my sustainability goals' },
                        { label: 'Community Updates', desc: 'News about community achievements' },
                        { label: 'New Features', desc: 'Be notified about new features' },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between p-4 bg-secondary rounded-lg border border-border/50">
                          <div>
                            <p className="font-medium text-foreground">{item.label}</p>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-5 h-5" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                    <h3 className="text-lg font-semibold">Privacy & Security</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Update Password
                      </Button>
                    </div>
                  </div>
                )}

                {activeTab === 'data' && (
                  <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                    <h3 className="text-lg font-semibold">Data Management</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-secondary rounded-lg border border-border/50">
                        <p className="font-medium text-foreground mb-2">Export Your Data</p>
                        <p className="text-sm text-muted-foreground mb-4">Download all your activity data in CSV format</p>
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                          Export Data
                        </Button>
                      </div>
                      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <p className="font-medium text-foreground mb-2">Delete Account</p>
                        <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all data</p>
                        <Button variant="destructive">Delete Account</Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Logout Button */}
            <div className="border-t border-border pt-8">
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="bg-destructive text-destructive hover:bg-destructive/90"
              >
                Logout
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

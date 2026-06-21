'use client'

import { Leaf, BarChart3, Zap, TrendingDown, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'

export default function Home() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="bg-card border-b border-border px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-lg p-2">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">CarbonIQ</span>
        </div>

        <div className="flex gap-4">
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center space-y-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-balance">
            Track Your <span className="text-primary">Carbon Footprint</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Professional sustainability tracking with AI-powered insights. Make data-driven decisions to reduce your environmental impact.
          </p>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/auth/register">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started Free <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">Powerful Features</h2>
          <p className="text-muted-foreground">Everything you need to track and reduce your carbon footprint</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: <BarChart3 className="w-6 h-6" />,
              title: 'Comprehensive Tracking',
              description: 'Log activities across transport, energy, food, and consumption categories',
            },
            {
              icon: <Zap className="w-6 h-6" />,
              title: 'AI-Powered Insights',
              description: 'Get personalized recommendations to reduce your environmental impact',
            },
            {
              icon: <TrendingDown className="w-6 h-6" />,
              title: 'Real-time Analytics',
              description: 'Monitor your progress with detailed charts and trend analysis',
            },
            {
              icon: <Leaf className="w-6 h-6" />,
              title: 'Sustainability Goals',
              description: 'Set targets and track your progress towards a greener lifestyle',
            },
            {
              icon: <BarChart3 className="w-6 h-6" />,
              title: 'Carbon Credits',
              description: 'Earn and manage verifiable carbon credits through blockchain',
            },
            {
              icon: <Zap className="w-6 h-6" />,
              title: 'Community Impact',
              description: 'Compare with others and join the global sustainability movement',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 space-y-4 hover:border-primary/50 transition-colors"
            >
              <div className="text-primary bg-primary/10 rounded-lg p-3 w-fit">{feature.icon}</div>
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">2.5M</div>
            <p className="text-muted-foreground">Tonnes CO₂e tracked</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">50K+</div>
            <p className="text-muted-foreground">Active users worldwide</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">125K</div>
            <p className="text-muted-foreground">Tonnes saved through insights</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 text-center space-y-8 max-w-3xl mx-auto">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Ready to Make a Difference?</h2>
          <p className="text-muted-foreground">Join thousands of users reducing their carbon footprint with CarbonIQ</p>
        </div>
        <Link href="/auth/register">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Start Tracking Today
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border px-6 py-12 mt-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary rounded-lg p-1.5">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold">CarbonIQ</span>
            </div>
            <p className="text-sm text-muted-foreground">Professional sustainability tracking for a better future.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Features</a></li>
              <li><a href="#" className="hover:text-foreground">Pricing</a></li>
              <li><a href="#" className="hover:text-foreground">API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">About</a></li>
              <li><a href="#" className="hover:text-foreground">Blog</a></li>
              <li><a href="#" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground">Terms</a></li>
              <li><a href="#" className="hover:text-foreground">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 CarbonIQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

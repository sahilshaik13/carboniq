'use client'

import { Leaf, BarChart3, PlusCircle, Zap, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'

export default function Sidebar() {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border flex items-center gap-3">
        <div className="bg-primary rounded-lg p-2">
          <Leaf className="w-5 h-5 text-primary-foreground" />
        </div>
        <h1 className="text-xl font-bold text-sidebar-foreground">CarbonIQ</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <NavLink icon={<BarChart3 className="w-5 h-5" />} label="Dashboard" href="/dashboard" />
        <NavLink icon={<PlusCircle className="w-5 h-5" />} label="Log Activity" href="#" onClick={() => {}} />
        <NavLink icon={<Zap className="w-5 h-5" />} label="Insights" href="#" />
        <NavLink icon={<BarChart3 className="w-5 h-5" />} label="Analytics" href="#" />

        <div className="pt-4 mt-4 border-t border-sidebar-border">
          <p className="text-xs uppercase tracking-wide text-sidebar-muted-foreground font-semibold px-4 mb-3">
            Account
          </p>
          <NavLink icon={<Settings className="w-5 h-5" />} label="Settings" href="#" />
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}

interface NavLinkProps {
  icon: React.ReactNode
  label: string
  href: string
  onClick?: () => void
}

function NavLink({ icon, label, href, onClick }: NavLinkProps) {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="w-full flex items-center gap-3 px-4 py-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors text-left text-sm"
      >
        {icon}
        {label}
      </button>
    )
  }

  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors text-sm"
    >
      {icon}
      {label}
    </Link>
  )
}

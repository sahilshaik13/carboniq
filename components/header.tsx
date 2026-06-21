'use client'

import { Bell, User } from 'lucide-react'

interface User {
  email: string
  full_name?: string
}

interface HeaderProps {
  user: User | null
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border px-8 py-4 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground text-sm mt-1">
          {user?.full_name ? `Welcome back, ${user.full_name}` : 'Track and reduce your carbon footprint'}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 pl-4 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <User className="w-4 h-4" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-foreground">{user?.email?.split('@')[0] || 'User'}</p>
            <p className="text-xs text-muted-foreground">{user?.email || 'No email'}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

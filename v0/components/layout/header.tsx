'use client'

import { Bell, Search, Moon, Sun, ChevronDown, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/auth-context'

interface HeaderProps {
  title: string
  breadcrumb?: string
}

export function Header({
  title,
  breadcrumb = 'Dashboard',
}: HeaderProps) {
  const { user } = useAuth()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (storedTheme) {
      setTheme(storedTheme)
      document.documentElement.classList.toggle('dark', storedTheme === 'dark')
      document.documentElement.classList.toggle('light', storedTheme === 'light')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    
    // Toggle classes on html element
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(newTheme)
  }

  return (
    <div className="bg-white border-b border-border h-16 flex items-center justify-between px-8 sticky top-0 z-20">
      {/* Left Section */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
          <span>{breadcrumb}</span>
        </div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      
      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search assets..."
            className="pl-10 pr-4 py-2 w-64 bg-muted border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
          title="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full ring-2 ring-white"></span>
        </button>
        
        {/* User Dropdown */}
        <div className="flex items-center gap-3 pl-3 border-l border-border">
          <button className="flex items-center gap-3 hover:bg-muted px-3 py-2 rounded-lg transition-all group">
            <div className="text-right hidden lg:block">
              <p className="text-sm font-medium text-foreground">{user?.name ?? ''}</p>
              <p className="text-xs text-muted-foreground">{user?.role ?? ''}</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center ring-2 ring-primary/10">
              <span className="text-sm font-semibold text-primary-foreground">{user?.initials ?? <User className="w-5 h-5" />}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Made with Bob

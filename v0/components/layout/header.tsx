'use client'

import { Bell, User } from 'lucide-react'

interface HeaderProps {
  title: string
  userName?: string
}

export function Header({ title, userName = 'Dr. Jose Dela Cruz' }: HeaderProps) {
  return (
    <div className="bg-white border-b border-border h-16 flex items-center justify-between px-8">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-2 pl-4 border-l border-border">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground">System Administrator</p>
          </div>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>
      </div>
    </div>
  )
}

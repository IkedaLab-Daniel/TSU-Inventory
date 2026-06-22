'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  LogOut,
  LogIn,
  Wrench,
  BarChart3,
  Users,
  FileText,
  Settings,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/assets', label: 'Asset Registry', icon: Package },
  { href: '/checkout', label: 'Check-Out', icon: LogOut },
  { href: '/checkin', label: 'Check-In', icon: LogIn },
  { href: '/maintenance', label: 'Maintenance', icon: Wrench },
  { href: '/reports', label: 'Reports', icon: BarChart3 },
  { href: '/users', label: 'Users', icon: Users },
  { href: '/audit', label: 'Audit Trail', icon: FileText },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white border-r border-border flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">ICT-IMS</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Tarlac Agricultural University
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-secondary'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

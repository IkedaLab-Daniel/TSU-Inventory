'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useAuth } from '@/context/auth-context'

const navSections = [
  {
    label: 'MAIN',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['MIS Admin', 'MIS Staff'] },
      { href: '/assets', label: 'Asset Registry', icon: Package, roles: ['MIS Admin', 'MIS Staff'] },
    ],
  },
  {
    label: 'OPERATIONS',
    items: [
      { href: '/checkout', label: 'Check-Out', icon: LogOut, roles: ['MIS Admin', 'MIS Staff'] },
      { href: '/checkin', label: 'Check-In', icon: LogIn, roles: ['MIS Admin', 'MIS Staff'] },
      { href: '/maintenance', label: 'Maintenance', icon: Wrench, roles: ['MIS Admin', 'MIS Staff'] },
    ],
  },
  {
    label: 'ADMIN',
    items: [
      { href: '/reports', label: 'Reports', icon: BarChart3, roles: ['MIS Admin', 'MIS Staff'] },
      { href: '/users', label: 'Users', icon: Users, roles: ['MIS Admin'] },
      { href: '/audit', label: 'Audit Trail', icon: FileText, roles: ['MIS Admin', 'MIS Staff'] },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const role = user?.role ?? 'MIS Staff'

  return (
    <div
      className={`${
        collapsed ? 'w-20' : 'w-60'
      } bg-white border-r border-border flex flex-col h-screen transition-all duration-300 ease-in-out relative`}
    >
      {/* Header */}
      <div className="p-6 border-b border-border">
        {!collapsed ? (
          <>
            <h1 className="text-xl font-bold text-foreground">ICT-IMS</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Tarlac Agricultural University
            </p>
          </>
        ) : (
          <div className="text-xl font-bold text-primary text-center">I</div>
        )}
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-white border border-border rounded-full p-1 hover:bg-gray-50 transition-colors shadow-sm z-10"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-6 overflow-y-auto">
        {navSections.map(section => {
          const visibleItems = section.items.filter(item => item.roles.includes(role))
          if (visibleItems.length === 0) return null

          return (
            <div key={section.label}>
              {!collapsed && (
                <div className="px-3 mb-2">
                  <p className="text-xs font-semibold text-muted-foreground tracking-wider">
                    {section.label}
                  </p>
                </div>
              )}
              <div className="space-y-1">
                {visibleItems.map(item => {
                  const Icon = item.icon
                  const isActive =
                    pathname === item.href ||
                    (item.href !== '/dashboard' && pathname.startsWith(item.href))

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
                        isActive
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                      title={collapsed ? item.label : undefined}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                      )}
                      <Icon className={`w-5 h-5 flex-shrink-0 ${collapsed ? 'mx-auto' : ''}`} />
                      {!collapsed && (
                        <span className="text-sm">{item.label}</span>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border space-y-1">
        <Link
          href="/settings"
          className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all ${
            pathname === '/settings'
              ? 'bg-primary/10 text-primary font-medium'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings className={`w-5 h-5 flex-shrink-0 ${collapsed ? 'mx-auto' : ''}`} />
          {!collapsed && <span>Settings</span>}
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut className={`w-5 h-5 flex-shrink-0 ${collapsed ? 'mx-auto' : ''}`} />
          {!collapsed && <span>Logout</span>}
        </button>

        {/* User Profile Card */}
        {!collapsed && user && (
          <div className="mt-3 p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-primary-foreground">
                  {user.initials}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

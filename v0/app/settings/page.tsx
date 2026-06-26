'use client'

import { useState, useEffect } from 'react'
import { User, Shield, Bell, Palette, Save, CheckCircle } from 'lucide-react'
import { LayoutWrapper } from '@/components/layout/layout-wrapper'
import { useAuth } from '@/context/auth-context'

interface NotificationSettings {
  overdueAlerts: boolean
  maintenanceReminders: boolean
  warrantyExpiry: boolean
  checkoutConfirmations: boolean
}

interface SystemPreferences {
  itemsPerPage: string
  dateFormat: string
  currency: string
}

export default function SettingsPage() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'MIS Admin'

  const [saved, setSaved] = useState(false)

  // Notification settings
  const [notifications, setNotifications] = useState<NotificationSettings>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ict_ims_notifications')
      if (stored) return JSON.parse(stored)
    }
    return {
      overdueAlerts: true,
      maintenanceReminders: true,
      warrantyExpiry: true,
      checkoutConfirmations: true,
    }
  })

  // System preferences
  const [preferences, setPreferences] = useState<SystemPreferences>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ict_ims_preferences')
      if (stored) return JSON.parse(stored)
    }
    return {
      itemsPerPage: '10',
      dateFormat: 'YYYY-MM-DD',
      currency: 'PHP',
    }
  })

  const handleSave = () => {
    localStorage.setItem('ict_ims_notifications', JSON.stringify(notifications))
    localStorage.setItem('ict_ims_preferences', JSON.stringify(preferences))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <LayoutWrapper title="Settings">
      <div className="max-w-3xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your account and system preferences</p>
        </div>

        {/* Profile Section */}
        <section className="bg-card rounded-lg border border-border p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-blue-50 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Profile</h3>
              <p className="text-xs text-muted-foreground">Your account information</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Full Name</label>
              <input
                type="text"
                value={user?.name ?? ''}
                disabled
                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-muted text-foreground cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Email</label>
              <input
                type="text"
                value={user?.email ?? ''}
                disabled
                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-muted text-foreground cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Role</label>
              <input
                type="text"
                value={user?.role ?? ''}
                disabled
                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-muted text-foreground cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">User ID</label>
              <input
                type="text"
                value={user?.id ?? ''}
                disabled
                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-muted text-foreground cursor-not-allowed"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Profile information is managed by the system administrator.
          </p>
        </section>

        {/* Role & Access Section */}
        <section className="bg-card rounded-lg border border-border p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Role &amp; Access</h3>
              <p className="text-xs text-muted-foreground">Your permissions in the system</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-foreground">Asset Registry</span>
              <span className="text-xs font-medium px-2 py-1 bg-green-50 text-green-700 rounded-full">
                {isAdmin ? 'Full Access' : 'View Only'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-foreground">Check-Out / Check-In</span>
              <span className="text-xs font-medium px-2 py-1 bg-green-50 text-green-700 rounded-full">Full Access</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-foreground">Maintenance Tracking</span>
              <span className="text-xs font-medium px-2 py-1 bg-green-50 text-green-700 rounded-full">Full Access</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-foreground">Reports &amp; Export</span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${isAdmin ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                {isAdmin ? 'Full Access' : 'View Only'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-foreground">User Management</span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${isAdmin ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {isAdmin ? 'Full Access' : 'No Access'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-foreground">Audit Trail</span>
              <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 rounded-full">View Only</span>
            </div>
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="bg-card rounded-lg border border-border p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Bell className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <p className="text-xs text-muted-foreground">Choose which alerts you receive</p>
            </div>
          </div>

          <div className="space-y-3">
            {([
              { key: 'overdueAlerts', label: 'Overdue Equipment Alerts', description: 'Get notified when borrowed items are past due' },
              { key: 'maintenanceReminders', label: 'Maintenance Reminders', description: 'Reminders for scheduled maintenance tasks' },
              { key: 'warrantyExpiry', label: 'Warranty Expiry Warnings', description: 'Alert when asset warranties are about to expire' },
              { key: 'checkoutConfirmations', label: 'Checkout Confirmations', description: 'Confirmation when equipment is checked out or returned' },
            ] as const).map(({ key, label, description }) => (
              <label key={key} className="flex items-center justify-between py-2 border-b border-border last:border-0 cursor-pointer group">
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{label}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={notifications[key]}
                    onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-colors" />
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-card rounded-full shadow-sm transition-transform peer-checked:translate-x-4" />
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* System Preferences */}
        <section className="bg-card rounded-lg border border-border p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-green-50 rounded-lg">
              <Palette className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Preferences</h3>
              <p className="text-xs text-muted-foreground">Customize your experience</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Items per Page</label>
              <select
                value={preferences.itemsPerPage}
                onChange={(e) => setPreferences(prev => ({ ...prev, itemsPerPage: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Date Format</label>
              <select
                value={preferences.dateFormat}
                onChange={(e) => setPreferences(prev => ({ ...prev, dateFormat: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Currency</label>
              <select
                value={preferences.currency}
                onChange={(e) => setPreferences(prev => ({ ...prev, currency: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="PHP">₱ PHP (Philippine Peso)</option>
                <option value="USD">$ USD (US Dollar)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium animate-in fade-in duration-300">
              <CheckCircle className="w-4 h-4" />
              Settings saved
            </span>
          )}
        </div>
      </div>
    </LayoutWrapper>
  )
}

'use client'

import { Package, CheckCircle, AlertCircle, Clock, Trash2, Plus, LogOut, LogIn, Wrench, FileText } from 'lucide-react'
import { motion } from 'framer-motion'
import { LayoutWrapper } from '@/components/layout/layout-wrapper'
import { StatCard } from '@/components/common/stat-card'
import { AssetCategoryChart } from '@/components/charts/asset-category-chart'
import { ActivityFeed } from '@/components/common/activity-feed'
import { QuickActionCard } from '@/components/common/quick-action-card'
import { Toast, useToast } from '@/components/common/toast'
import { useAuth } from '@/context/auth-context'
import { getAssetStats, getAssetCategoryBreakdown, activityFeed, getOverdueCheckouts } from '@/data/mock-data'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

export default function DashboardPage() {
  const { user } = useAuth()
  const { toast, showToast, dismissToast } = useToast()
  const stats = getAssetStats()
  const categoryData = getAssetCategoryBreakdown()
  const overdueItems = getOverdueCheckouts()
  const isAdmin = user?.role === 'MIS Admin'

  const handleSendAllAlerts = () => {
    showToast(`Overdue alerts sent to ${overdueItems.length} borrower(s).`)
  }

  return (
    <LayoutWrapper title="Dashboard">
      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              Welcome back, {user?.name?.split(' ')[0] ?? 'User'} 👋
            </h1>
            <p className="text-sm text-muted-foreground">
              Here's what's happening with your inventory today
            </p>
          </div>
        </motion.div>

        {/* Alert Banner */}
        {overdueItems.length > 0 && (
          <motion.div variants={itemVariants}>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-red-900 mb-1">Overdue Equipment Alert</h3>
                <p className="text-sm text-red-800">
                  {overdueItems.length} item(s) have not been returned by their expected date. Please follow up immediately.
                </p>
              </div>
              <button
                onClick={handleSendAllAlerts}
                className="flex-shrink-0 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Send All Alerts
              </button>
            </div>
          </motion.div>
        )}

        {/* KPI Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard title="Total Assets" value={stats.total} icon={Package} color="blue" trend={{ value: 12, isPositive: true }} progress={85} description="+12 this month" />
          <StatCard title="Available" value={stats.available} icon={CheckCircle} color="green" trend={{ value: 8, isPositive: true }} progress={Math.round(stats.available / stats.total * 100)} description="Ready for checkout" />
          <StatCard title="In Use" value={stats.inUse} icon={Clock} color="purple" progress={Math.round(stats.inUse / stats.total * 100)} description="Currently checked out" />
          <StatCard title="Maintenance" value={stats.maintenance} icon={AlertCircle} color="yellow" trend={{ value: 3, isPositive: false }} progress={Math.round(stats.maintenance / stats.total * 100)} description="Under repair" />
          <StatCard title="Retired" value={stats.retired} icon={Trash2} color="gray" progress={Math.round(stats.retired / stats.total * 100)} description="Out of service" />
        </motion.div>

        {/* Main Content Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AssetCategoryChart data={categoryData} />
          </div>
          <div className="lg:col-span-1">
            <ActivityFeed activities={activityFeed} />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {isAdmin && (
              <QuickActionCard title="Add Asset" description="Register new equipment" icon={Plus} color="blue" />
            )}
            <QuickActionCard title="Check-Out" description="Assign asset to user" icon={LogOut} color="purple" />
            <QuickActionCard title="Check-In" description="Return asset to inventory" icon={LogIn} color="green" />
            <QuickActionCard title="Maintenance" description="Schedule repair request" icon={Wrench} color="yellow" />
            {isAdmin && (
              <QuickActionCard title="Generate Report" description="Export inventory data" icon={FileText} color="blue" />
            )}
          </div>
        </motion.div>
      </motion.div>

      {toast && <Toast message={toast} onDismiss={dismissToast} />}
    </LayoutWrapper>
  )
}

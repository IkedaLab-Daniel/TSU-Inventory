'use client'

import { Package, CheckCircle, AlertCircle, Clock, Trash2, Plus, LogOut, LogIn, Wrench, FileText } from 'lucide-react'
import { LayoutWrapper } from '@/components/layout/layout-wrapper'
import { StatCard } from '@/components/common/stat-card'
import { AssetCategoryChart } from '@/components/charts/asset-category-chart'
import { ActivityFeed } from '@/components/common/activity-feed'
import { QuickActionCard } from '@/components/common/quick-action-card'
import { getAssetStats, getAssetCategoryBreakdown, activityFeed, getOverdueCheckouts } from '@/data/mock-data'

export default function DashboardPage() {
  const stats = getAssetStats()
  const categoryData = getAssetCategoryBreakdown()
  const overdueCount = getOverdueCheckouts().length

  return (
    <LayoutWrapper title="Dashboard">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              Welcome back, Admin 👋
            </h1>
            <p className="text-sm text-muted-foreground">
              Here's what's happening with your inventory today
            </p>
          </div>
        </div>

        {/* Alert Banner */}
        {overdueCount > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 mb-1">Overdue Equipment Alert</h3>
              <p className="text-sm text-red-800">
                {overdueCount} item(s) have not been returned by their expected date. Please follow up immediately.
              </p>
            </div>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard
            title="Total Assets"
            value={stats.total}
            icon={Package}
            color="blue"
            trend={{ value: 12, isPositive: true }}
            progress={85}
            description="+12 this month"
          />
          <StatCard
            title="Available"
            value={stats.available}
            icon={CheckCircle}
            color="green"
            trend={{ value: 8, isPositive: true }}
            progress={stats.available / stats.total * 100}
            description="Ready for checkout"
          />
          <StatCard
            title="In Use"
            value={stats.inUse}
            icon={Clock}
            color="purple"
            progress={stats.inUse / stats.total * 100}
            description="Currently checked out"
          />
          <StatCard
            title="Maintenance"
            value={stats.maintenance}
            icon={AlertCircle}
            color="yellow"
            trend={{ value: 3, isPositive: false }}
            progress={stats.maintenance / stats.total * 100}
            description="Under repair"
          />
          <StatCard
            title="Retired"
            value={stats.retired}
            icon={Trash2}
            color="gray"
            progress={stats.retired / stats.total * 100}
            description="Out of service"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section - Takes 2 columns */}
          <div className="lg:col-span-2">
            <AssetCategoryChart data={categoryData} />
          </div>

          {/* Activity Feed - Takes 1 column */}
          <div className="lg:col-span-1">
            <ActivityFeed activities={activityFeed} />
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <QuickActionCard
              title="Add Asset"
              description="Register new equipment"
              icon={Plus}
              color="blue"
            />
            <QuickActionCard
              title="Check-Out"
              description="Assign asset to user"
              icon={LogOut}
              color="purple"
            />
            <QuickActionCard
              title="Check-In"
              description="Return asset to inventory"
              icon={LogIn}
              color="green"
            />
            <QuickActionCard
              title="Maintenance"
              description="Schedule repair request"
              icon={Wrench}
              color="yellow"
            />
            <QuickActionCard
              title="Generate Report"
              description="Export inventory data"
              icon={FileText}
              color="blue"
            />
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}

// Made with Bob

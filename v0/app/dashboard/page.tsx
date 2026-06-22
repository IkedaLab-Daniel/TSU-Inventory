'use client'

import { Package, CheckCircle, AlertCircle, Clock, Trash2 } from 'lucide-react'
import { LayoutWrapper } from '@/components/layout/layout-wrapper'
import { StatCard } from '@/components/common/stat-card'
import { AssetCategoryChart } from '@/components/charts/asset-category-chart'
import { ActivityFeed } from '@/components/common/activity-feed'
import { getAssetStats, getAssetCategoryBreakdown, activityFeed, getOverdueCheckouts } from '@/data/mock-data'

export default function DashboardPage() {
  const stats = getAssetStats()
  const categoryData = getAssetCategoryBreakdown()
  const overdueCount = getOverdueCheckouts().length

  return (
    <LayoutWrapper title="Dashboard">
      <div className="space-y-8">
        {/* Alert Banner */}
        {overdueCount > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Overdue Equipment Alert</h3>
              <p className="text-sm text-red-800 mt-1">
                {overdueCount} item(s) have not been returned by their expected date. Please follow up immediately.
              </p>
            </div>
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-5 gap-4">
          <StatCard
            title="Total Assets"
            value={stats.total}
            icon={Package}
            color="blue"
          />
          <StatCard
            title="Available"
            value={stats.available}
            icon={CheckCircle}
            color="green"
          />
          <StatCard
            title="In Use"
            value={stats.inUse}
            icon={Clock}
            color="blue"
          />
          <StatCard
            title="Maintenance"
            value={stats.maintenance}
            icon={AlertCircle}
            color="yellow"
          />
          <StatCard
            title="Retired"
            value={stats.retired}
            icon={Trash2}
            color="gray"
          />
        </div>

        {/* Chart and Activity Feed */}
        <div className="grid grid-cols-2 gap-8">
          <AssetCategoryChart data={categoryData} />
          <ActivityFeed activities={activityFeed} />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
            Add New Asset
          </button>
          <button className="px-6 py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-muted transition-colors">
            Generate Report
          </button>
        </div>
      </div>
    </LayoutWrapper>
  )
}

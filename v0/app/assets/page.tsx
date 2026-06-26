'use client'

import { Plus } from 'lucide-react'
import { LayoutWrapper } from '@/components/layout/layout-wrapper'
import { AssetTable } from '@/components/tables/asset-table'
import { assets } from '@/data/mock-data'
import { useAuth } from '@/context/auth-context'

export default function AssetsPage() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'MIS Admin'

  return (
    <LayoutWrapper title="Asset Registry">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Asset Registry</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage and track all ICT assets</p>
          </div>
          {isAdmin && (
            <button className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
              <Plus className="w-5 h-5" />
              Add New Asset
            </button>
          )}
        </div>

        <AssetTable assets={assets} />
      </div>
    </LayoutWrapper>
  )
}

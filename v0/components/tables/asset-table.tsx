'use client'

import { useState, useMemo } from 'react'
import { Edit2, Trash2, Eye, Search, History } from 'lucide-react'
import { StatusBadge } from '@/components/common/status-badge'
import { ConditionHistoryModal } from '@/components/common/condition-history-modal'
import { Asset, conditionHistory } from '@/data/mock-data'

interface AssetTableProps {
  assets: Asset[]
}

function getWarrantyStatus(expiryDate: string): 'valid' | 'expiring' | 'expired' {
  const today = new Date()
  const expiry = new Date(expiryDate)
  const diffDays = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays < 0) return 'expired'
  if (diffDays <= 30) return 'expiring'
  return 'valid'
}

const warrantyBadge = {
  valid: 'bg-green-50 text-green-700 border-green-200',
  expiring: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  expired: 'bg-red-50 text-red-700 border-red-200',
}

const warrantyLabel = {
  valid: 'Valid',
  expiring: 'Expiring Soon',
  expired: 'Expired',
}

export function AssetTable({ assets }: AssetTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [warrantyFilter, setWarrantyFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [historyAsset, setHistoryAsset] = useState<Asset | null>(null)
  const itemsPerPage = 10

  const categories = ['all', ...new Set(assets.map(a => a.category))]
  const statuses = ['all', ...new Set(assets.map(a => a.status))]

  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const matchesSearch =
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory
      const matchesStatus = selectedStatus === 'all' || asset.status === selectedStatus
      const ws = getWarrantyStatus(asset.warrantyExpiry)
      const matchesWarranty = warrantyFilter === 'all' || ws === warrantyFilter
      return matchesSearch && matchesCategory && matchesStatus && matchesWarranty
    })
  }, [assets, searchTerm, selectedCategory, selectedStatus, warrantyFilter])

  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage)
  const paginatedAssets = filteredAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="bg-card rounded-lg border border-border p-4 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by Asset Name, Serial Number or ID..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1) }}
            />
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-2">Category</label>
            <select value={selectedCategory} onChange={e => { setSelectedCategory(e.target.value); setCurrentPage(1) }}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              {categories.map(cat => <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-2">Status</label>
            <select value={selectedStatus} onChange={e => { setSelectedStatus(e.target.value); setCurrentPage(1) }}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              {statuses.map(s => <option key={s} value={s}>{s === 'all' ? 'All Statuses' : s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-2">Warranty Status</label>
            <select value={warrantyFilter} onChange={e => { setWarrantyFilter(e.target.value); setCurrentPage(1) }}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="all">All Warranty</option>
              <option value="valid">Valid</option>
              <option value="expiring">Expiring Soon</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary">
              <th className="px-6 py-3 text-left font-semibold text-foreground">Asset ID</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Asset Name</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Category</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Serial No.</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Location</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Condition</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Warranty Expiry</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Assigned To</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAssets.map(asset => {
              const ws = getWarrantyStatus(asset.warrantyExpiry)
              return (
                <tr key={asset.id} className="border-b border-border transition-colors hover:bg-muted/50">
                  <td className="px-6 py-4 text-foreground font-medium">{asset.id}</td>
                  <td className="px-6 py-4 text-foreground">{asset.name}</td>
                  <td className="px-6 py-4 text-foreground">{asset.category}</td>
                  <td className="px-6 py-4 text-foreground text-xs font-mono">{asset.serialNumber}</td>
                  <td className="px-6 py-4 text-foreground text-xs">{asset.location}</td>
                  <td className="px-6 py-4"><StatusBadge status={asset.status} /></td>
                  <td className="px-6 py-4"><StatusBadge status={asset.condition as any} variant="condition" /></td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-foreground">{asset.warrantyExpiry}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border w-fit ${warrantyBadge[ws]}`}>
                        {warrantyLabel[ws]}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground text-xs">{asset.assignedTo || '—'}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5">
                      <button className="p-1.5 hover:bg-secondary rounded transition-colors" title="View">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-1.5 hover:bg-secondary rounded transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        className="p-1.5 hover:bg-blue-50 rounded transition-colors"
                        title="Condition History"
                        onClick={() => setHistoryAsset(asset)}
                      >
                        <History className="w-4 h-4 text-blue-500" />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 rounded transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
            {paginatedAssets.length === 0 && (
              <tr>
                <td colSpan={10} className="px-6 py-12 text-center text-muted-foreground text-sm">
                  No assets found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {paginatedAssets.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredAssets.length)} of {filteredAssets.length} assets
        </p>
        <div className="flex gap-2">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}
            className="px-4 py-2 border border-border rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-secondary transition-colors">
            Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${page === currentPage ? 'bg-primary text-primary-foreground' : 'border border-border hover:bg-secondary'}`}>
                {page}
              </button>
            ))}
          </div>
          <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)}
            className="px-4 py-2 border border-border rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-secondary transition-colors">
            Next
          </button>
        </div>
      </div>

      {/* Condition History Modal */}
      {historyAsset && (
        <ConditionHistoryModal
          assetName={historyAsset.name}
          history={conditionHistory[historyAsset.id] ?? []}
          onClose={() => setHistoryAsset(null)}
        />
      )}
    </div>
  )
}

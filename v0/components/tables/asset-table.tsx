'use client'

import { useState, useMemo } from 'react'
import { Edit2, Trash2, Eye, Search } from 'lucide-react'
import { StatusBadge } from '@/components/common/status-badge'
import { Asset } from '@/data/mock-data'

interface AssetTableProps {
  assets: Asset[]
}

export function AssetTable({ assets }: AssetTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Get unique categories and statuses
  const categories = ['all', ...new Set(assets.map(a => a.category))]
  const statuses = ['all', ...new Set(assets.map(a => a.status))]

  // Filter assets
  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const matchesSearch =
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory
      const matchesStatus = selectedStatus === 'all' || asset.status === selectedStatus

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [assets, searchTerm, selectedCategory, selectedStatus])

  // Paginate
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage)
  const paginatedAssets = filteredAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-border p-4 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by Asset Name, Serial Number or ID..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={e => {
                setSelectedCategory(e.target.value)
                setCurrentPage(1)
              }}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={e => {
                setSelectedStatus(e.target.value)
                setCurrentPage(1)
              }}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
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
              <th className="px-6 py-3 text-left font-semibold text-foreground">Assigned To</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAssets.map(asset => (
              <tr key={asset.id} className="border-b border-border hover:bg-secondary/50">
                <td className="px-6 py-4 text-foreground font-medium">{asset.id}</td>
                <td className="px-6 py-4 text-foreground">{asset.name}</td>
                <td className="px-6 py-4 text-foreground">{asset.category}</td>
                <td className="px-6 py-4 text-foreground text-xs font-mono">
                  {asset.serialNumber}
                </td>
                <td className="px-6 py-4 text-foreground text-xs">{asset.location}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={asset.status} />
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={asset.condition as any} variant="condition" />
                </td>
                <td className="px-6 py-4 text-foreground text-xs">
                  {asset.assignedTo || '—'}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="p-1.5 hover:bg-secondary rounded transition-colors">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-1.5 hover:bg-secondary rounded transition-colors">
                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-1.5 hover:bg-secondary rounded transition-colors">
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {paginatedAssets.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredAssets.length)} of {filteredAssets.length}{' '}
          assets
        </p>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="px-4 py-2 border border-border rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-secondary transition-colors"
          >
            Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  page === currentPage
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border hover:bg-secondary'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="px-4 py-2 border border-border rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-secondary transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

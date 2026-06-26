'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { StatusBadge } from '@/components/common/status-badge'
import { MaintenanceRecord } from '@/data/mock-data'

interface MaintenanceTableProps {
  records: MaintenanceRecord[]
}

export function MaintenanceTable({ records }: MaintenanceTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      const matchesSearch =
        record.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.technicianAssigned.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = selectedType === 'all' || record.type === selectedType
      const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus

      return matchesSearch && matchesType && matchesStatus
    })
  }, [records, searchTerm, selectedType, selectedStatus])

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage)
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const types = ['all', ...new Set(records.map(r => r.type))]
  const statuses = ['all', ...new Set(records.map(r => r.status))]

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg border border-border p-4 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by asset name, technician or ID..."
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
              Type
            </label>
            <select
              value={selectedType}
              onChange={e => {
                setSelectedType(e.target.value)
                setCurrentPage(1)
              }}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
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

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary">
              <th className="px-6 py-3 text-left font-semibold text-foreground">Maintenance ID</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Asset Name</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Date</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Type</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Technician</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Cost</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRecords.map(record => (
              <tr key={record.id} className="border-b border-border transition-colors hover:bg-muted/50">
                <td className="px-6 py-4 text-foreground font-medium">{record.id}</td>
                <td className="px-6 py-4 text-foreground">{record.assetName}</td>
                <td className="px-6 py-4 text-foreground text-xs">{record.date}</td>
                <td className="px-6 py-4 text-foreground text-xs">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    record.type === 'Preventive' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {record.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-foreground text-xs">{record.technicianAssigned}</td>
                <td className="px-6 py-4 text-foreground font-medium">₱{record.cost.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={record.status as 'Open' | 'Resolved'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {paginatedRecords.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of {filteredRecords.length}{' '}
          records
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

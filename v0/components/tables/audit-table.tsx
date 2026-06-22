'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { AuditLog } from '@/data/mock-data'

interface AuditTableProps {
  logs: AuditLog[]
}

export function AuditTable({ logs }: AuditTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAction, setSelectedAction] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const actions = ['all', ...new Set(logs.map(l => l.action))]

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch =
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.assetId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesAction = selectedAction === 'all' || log.action === selectedAction

      return matchesSearch && matchesAction
    })
  }, [logs, searchTerm, selectedAction])

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const actionColors = {
    'Check-Out': 'text-blue-600 bg-blue-50',
    'Check-In': 'text-green-600 bg-green-50',
    'Edit': 'text-purple-600 bg-purple-50',
    'Disposal': 'text-red-600 bg-red-50',
    'Maintenance': 'text-yellow-600 bg-yellow-50',
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-border p-4 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by user, asset or ID..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-2">
            Action Type
          </label>
          <select
            value={selectedAction}
            onChange={e => {
              setSelectedAction(e.target.value)
              setCurrentPage(1)
            }}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {actions.map(action => (
              <option key={action} value={action}>
                {action === 'all' ? 'All Actions' : action}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary">
              <th className="px-6 py-3 text-left font-semibold text-foreground">Timestamp</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">User</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Action</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Asset ID</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Asset Name</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Details</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.map(log => (
              <tr key={log.id} className="border-b border-border hover:bg-secondary/50">
                <td className="px-6 py-4 text-foreground text-xs font-medium">{log.timestamp}</td>
                <td className="px-6 py-4 text-foreground">{log.user}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    actionColors[log.action as keyof typeof actionColors]
                  }`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 text-foreground font-mono text-xs">{log.assetId}</td>
                <td className="px-6 py-4 text-foreground">{log.assetName}</td>
                <td className="px-6 py-4 text-foreground text-xs text-pretty max-w-xs">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {paginatedLogs.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length} logs
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

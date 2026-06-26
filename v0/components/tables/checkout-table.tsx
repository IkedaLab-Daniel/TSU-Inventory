'use client'

import { useState, useMemo } from 'react'
import { Search, Printer, Bell } from 'lucide-react'
import { StatusBadge } from '@/components/common/status-badge'
import { BorrowerSlipModal } from '@/components/common/borrower-slip-modal'
import { Toast, useToast } from '@/components/common/toast'
import { CheckoutRecord } from '@/data/mock-data'

interface CheckoutTableProps {
  records: CheckoutRecord[]
  showActions?: boolean
}

function isOverdue(expectedReturnDate: string, status: string) {
  if (status !== 'Active') return false
  return new Date(expectedReturnDate) < new Date()
}

export function CheckoutTable({ records, showActions = true }: CheckoutTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [slipRecord, setSlipRecord] = useState<CheckoutRecord | null>(null)
  const { toast, showToast, dismissToast } = useToast()
  const itemsPerPage = 8

  const filteredRecords = useMemo(() => {
    return records.filter(record =>
      record.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [records, searchTerm])

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage)
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by asset name, borrower name or ID..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1) }}
            />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary">
              <th className="px-6 py-3 text-left font-semibold text-foreground">Checkout ID</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Asset Name</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Borrower</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Department</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Checkout Date</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Expected Return</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Status</th>
              {showActions && <th className="px-6 py-3 text-left font-semibold text-foreground">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedRecords.map(record => {
              const overdue = isOverdue(record.expectedReturnDate, record.status)
              return (
                <tr key={record.id} className={`border-b border-border hover:bg-secondary/50 ${overdue ? 'bg-red-50/40' : ''}`}>
                  <td className="px-6 py-4 text-foreground font-medium">{record.id}</td>
                  <td className="px-6 py-4 text-foreground">{record.assetName}</td>
                  <td className="px-6 py-4 text-foreground">{record.borrowerName}</td>
                  <td className="px-6 py-4 text-foreground text-xs">{record.department}</td>
                  <td className="px-6 py-4 text-foreground text-xs">{record.checkoutDate}</td>
                  <td className="px-6 py-4 text-xs">
                    <span className={overdue ? 'text-red-600 font-semibold' : 'text-foreground'}>
                      {record.expectedReturnDate}
                      {overdue && <span className="ml-1 text-red-500">(Overdue)</span>}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={record.status as 'Active' | 'Returned'} />
                  </td>
                  {showActions && (
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5">
                        <button
                          title="Print Borrower Slip"
                          onClick={() => setSlipRecord(record)}
                          className="p-1.5 hover:bg-blue-50 rounded transition-colors"
                        >
                          <Printer className="w-4 h-4 text-blue-500" />
                        </button>
                        {overdue && (
                          <button
                            title="Send Overdue Alert"
                            onClick={() => showToast(`Overdue alert sent to ${record.borrowerName}.`)}
                            className="p-1.5 hover:bg-red-50 rounded transition-colors"
                          >
                            <Bell className="w-4 h-4 text-red-500" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              )
            })}
            {paginatedRecords.length === 0 && (
              <tr>
                <td colSpan={showActions ? 8 : 7} className="px-6 py-12 text-center text-muted-foreground text-sm">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {paginatedRecords.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of {filteredRecords.length} records
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

      {slipRecord && <BorrowerSlipModal record={slipRecord} onClose={() => setSlipRecord(null)} />}
      {toast && <Toast message={toast} onDismiss={dismissToast} />}
    </div>
  )
}

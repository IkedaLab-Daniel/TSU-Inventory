'use client'

import { useState } from 'react'
import { Download, FileText } from 'lucide-react'
import { LayoutWrapper } from '@/components/layout/layout-wrapper'
import { assets, checkoutRecords, maintenanceRecords, getOverdueCheckouts } from '@/data/mock-data'
import { StatusBadge } from '@/components/common/status-badge'

type ReportType = 'inventory' | 'utilization' | 'overdue' | 'maintenance' | 'checkout'

interface ReportData {
  type: ReportType
  title: string
  description: string
}

const reportTypes: ReportData[] = [
  {
    type: 'inventory',
    title: 'Asset Inventory List',
    description: 'Complete list of all ICT assets with details and status',
  },
  {
    type: 'utilization',
    title: 'Utilization Report',
    description: 'Asset usage and checkout frequency analysis',
  },
  {
    type: 'overdue',
    title: 'Overdue Equipment',
    description: 'Items not returned by expected date',
  },
  {
    type: 'maintenance',
    title: 'Maintenance Log',
    description: 'Complete maintenance history and costs',
  },
  {
    type: 'checkout',
    title: 'Checkout History',
    description: 'All check-out and check-in transactions',
  },
]

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null)
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
      .toISOString()
      .split('T')[0]
  )
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', ...new Set(assets.map(a => a.category))]

  const getReportData = () => {
    switch (selectedReport) {
      case 'inventory':
        return {
          title: 'Asset Inventory List',
          data: assets.map(a => ({
            id: a.id,
            name: a.name,
            category: a.category,
            status: a.status,
            location: a.location,
            cost: a.cost,
          })),
          columns: ['ID', 'Name', 'Category', 'Status', 'Location', 'Cost (₱)'],
        }
      case 'overdue':
        return {
          title: 'Overdue Equipment Report',
          data: getOverdueCheckouts().map(r => ({
            checkoutId: r.id,
            asset: r.assetName,
            borrower: r.borrowerName,
            expectedReturn: r.expectedReturnDate,
            daysOverdue: Math.floor(
              (new Date().getTime() - new Date(r.expectedReturnDate).getTime()) / (1000 * 60 * 60 * 24)
            ),
          })),
          columns: ['Checkout ID', 'Asset', 'Borrower', 'Expected Return', 'Days Overdue'],
        }
      case 'maintenance':
        return {
          title: 'Maintenance Log Report',
          data: maintenanceRecords.map(m => ({
            id: m.id,
            asset: m.assetName,
            date: m.date,
            type: m.type,
            technician: m.technicianAssigned,
            cost: m.cost,
            status: m.status,
          })),
          columns: ['ID', 'Asset', 'Date', 'Type', 'Technician', 'Cost (₱)', 'Status'],
        }
      case 'checkout':
        return {
          title: 'Checkout History Report',
          data: checkoutRecords.map(r => ({
            id: r.id,
            asset: r.assetName,
            borrower: r.borrowerName,
            checkoutDate: r.checkoutDate,
            returnDate: r.actualReturnDate || r.expectedReturnDate,
            status: r.status,
          })),
          columns: ['ID', 'Asset', 'Borrower', 'Checkout Date', 'Return Date', 'Status'],
        }
      case 'utilization':
      default:
        return {
          title: 'Asset Utilization Report',
          data: assets
            .filter(a => selectedCategory === 'all' || a.category === selectedCategory)
            .map(a => ({
              id: a.id,
              name: a.name,
              category: a.category,
              status: a.status,
              condition: a.condition,
              timeInService: '2 years',
            })),
          columns: ['ID', 'Name', 'Category', 'Status', 'Condition', 'Time in Service'],
        }
    }
  }

  const reportData = selectedReport ? getReportData() : null

  return (
    <LayoutWrapper title="Reports & Analytics">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reports & Analytics</h2>
          <p className="text-sm text-muted-foreground mt-1">Generate and view system reports</p>
        </div>

        {/* Report Selection Grid */}
        <div className="grid grid-cols-2 gap-4">
          {reportTypes.map(report => (
            <button
              key={report.type}
              onClick={() => setSelectedReport(report.type)}
              className={`p-6 rounded-lg border-2 transition-all text-left ${
                selectedReport === report.type
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-white hover:border-primary/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">{report.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{report.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Report Filters and Preview */}
        {selectedReport && (
          <div className="bg-white rounded-lg border border-border p-8 space-y-6">
            {/* Filters */}
            <div className="space-y-4 pb-6 border-b border-border">
              <h3 className="font-semibold text-foreground">Report Filters</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                {selectedReport === 'utilization' && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={e => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat === 'all' ? 'All Categories' : cat}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Report Title */}
            <h3 className="text-lg font-semibold text-foreground">{reportData?.title}</h3>

            {/* Report Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-secondary border-b border-border">
                    {reportData?.columns.map(col => (
                      <th
                        key={col}
                        className="px-6 py-3 text-left font-semibold text-foreground"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reportData?.data.slice(0, 20).map((row, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-secondary/50">
                      {Object.values(row).map((value, colIdx) => (
                        <td key={colIdx} className="px-6 py-4 text-foreground">
                          {typeof value === 'number' && value > 1000 ? (
                            `₱${(value as number).toLocaleString()}`
                          ) : typeof value === 'string' && (value === 'Active' || value === 'Available' || value === 'Returned' || value === 'Good' || value === 'Preventive' || value === 'Resolved' || value === 'Open') ? (
                            <StatusBadge status={value as any} />
                          ) : (
                            value
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {reportData && reportData.data.length > 20 && (
              <p className="text-xs text-muted-foreground">
                Showing 20 of {reportData.data.length} records. View complete report in PDF/Excel export.
              </p>
            )}

            {/* Export Buttons */}
            <div className="flex gap-4 pt-4 border-t border-border">
              <button className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button className="flex items-center gap-2 px-6 py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-muted transition-colors">
                <Download className="w-4 h-4" />
                Download Excel
              </button>
            </div>
          </div>
        )}
      </div>
    </LayoutWrapper>
  )
}

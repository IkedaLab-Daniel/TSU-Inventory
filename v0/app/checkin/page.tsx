'use client'

import { useState } from 'react'
import { LayoutWrapper } from '@/components/layout/layout-wrapper'
import { CheckoutTable } from '@/components/tables/checkout-table'
import { checkoutRecords } from '@/data/mock-data'
import { StatusBadge } from '@/components/common/status-badge'

interface CheckinFormData {
  checkoutId: string
  conditionUponReturn: 'Good' | 'Fair' | 'Poor' | 'Damaged'
  remarks: string
  actualReturnDate: string
}

export default function CheckinPage() {
  const [formData, setFormData] = useState<CheckinFormData>({
    checkoutId: '',
    conditionUponReturn: 'Good',
    remarks: '',
    actualReturnDate: new Date().toISOString().split('T')[0],
  })

  const [selectedCheckout, setSelectedCheckout] = useState<any>(null)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Update selectedCheckout when checkout ID changes
    if (name === 'checkoutId') {
      const checkout = checkoutRecords.find(r => r.id === value)
      setSelectedCheckout(checkout)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Checkin data:', formData)
    // Reset form
    setFormData({
      checkoutId: '',
      conditionUponReturn: 'Good',
      remarks: '',
      actualReturnDate: new Date().toISOString().split('T')[0],
    })
    setSelectedCheckout(null)
    alert('Asset checked in successfully!')
  }

  const activeCheckouts = checkoutRecords.filter(r => r.status === 'Active')

  return (
    <LayoutWrapper title="Check-In Module">
      <div className="space-y-8">
        {/* Form */}
        <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Process Check-In</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Checkout ID Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select Checkout Record *
                </label>
                <select
                  name="checkoutId"
                  value={formData.checkoutId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Choose an active checkout...</option>
                  {activeCheckouts.map(checkout => (
                    <option key={checkout.id} value={checkout.id}>
                      {checkout.id} - {checkout.assetName} ({checkout.borrowerName})
                    </option>
                  ))}
                </select>
              </div>

              {/* Condition Upon Return */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Condition Upon Return *
                </label>
                <select
                  name="conditionUponReturn"
                  value={formData.conditionUponReturn}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                  <option value="Damaged">Damaged</option>
                </select>
              </div>

              {/* Actual Return Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Actual Return Date *
                </label>
                <input
                  type="date"
                  name="actualReturnDate"
                  value={formData.actualReturnDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Remarks / Notes
              </label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                placeholder="Any issues, damages, or other notes about the return..."
                rows={3}
                className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Checkout Details Preview */}
            {selectedCheckout && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                <h3 className="text-sm font-semibold text-green-900">Checkout Information</h3>
                <div className="grid grid-cols-2 gap-4 text-xs text-green-800">
                  <div>
                    <span className="font-medium">Asset:</span> {selectedCheckout.assetName}
                  </div>
                  <div>
                    <span className="font-medium">Asset ID:</span> {selectedCheckout.assetId}
                  </div>
                  <div>
                    <span className="font-medium">Borrower:</span> {selectedCheckout.borrowerName}
                  </div>
                  <div>
                    <span className="font-medium">Department:</span>{' '}
                    {selectedCheckout.department}
                  </div>
                  <div>
                    <span className="font-medium">Checkout Date:</span>{' '}
                    {selectedCheckout.checkoutDate}
                  </div>
                  <div>
                    <span className="font-medium">Expected Return:</span>{' '}
                    {selectedCheckout.expectedReturnDate}
                  </div>
                  <div>
                    <span className="font-medium">Purpose:</span> {selectedCheckout.purpose}
                  </div>
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4 border-t border-border">
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Complete Check-In
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>

        {/* Active Checkouts List */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Active Checkouts Awaiting Return</h2>
          <CheckoutTable records={activeCheckouts} />
        </div>
      </div>
    </LayoutWrapper>
  )
}

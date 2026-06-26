'use client'

import { useState } from 'react'
import { LayoutWrapper } from '@/components/layout/layout-wrapper'
import { CheckoutTable } from '@/components/tables/checkout-table'
import { checkoutRecords, assets } from '@/data/mock-data'

interface CheckoutFormData {
  assetId: string
  borrowerName: string
  designation: string
  department: string
  contactNumber: string
  purpose: string
  checkoutDate: string
  expectedReturnDate: string
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState<CheckoutFormData>({
    assetId: '',
    borrowerName: '',
    designation: '',
    department: '',
    contactNumber: '',
    purpose: '',
    checkoutDate: new Date().toISOString().split('T')[0],
    expectedReturnDate: '',
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to an API
    console.log('Checkout data:', formData)
    // Reset form
    setFormData({
      assetId: '',
      borrowerName: '',
      designation: '',
      department: '',
      contactNumber: '',
      purpose: '',
      checkoutDate: new Date().toISOString().split('T')[0],
      expectedReturnDate: '',
    })
    alert('Asset checked out successfully!')
  }

  const availableAssets = assets.filter(a => a.status === 'Available')
  const selectedAsset = assets.find(a => a.id === formData.assetId)

  return (
    <LayoutWrapper title="Check-Out Module">
      <div className="space-y-8">
        {/* Form */}
        <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">New Check-Out</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Asset Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select Asset *
                </label>
                <select
                  name="assetId"
                  value={formData.assetId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Choose an available asset...</option>
                  {availableAssets.map(asset => (
                    <option key={asset.id} value={asset.id}>
                      {asset.name} ({asset.id})
                    </option>
                  ))}
                </select>
              </div>

              {/* Borrower Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Borrower Name *
                </label>
                <input
                  type="text"
                  name="borrowerName"
                  value={formData.borrowerName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter full name"
                  className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Designation *
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Instructor, Staff"
                  className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Department *
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., College of Agriculture"
                  className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="09XXXXXXXXX"
                  className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Checkout Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Checkout Date *
                </label>
                <input
                  type="date"
                  name="checkoutDate"
                  value={formData.checkoutDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Expected Return Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Expected Return Date *
                </label>
                <input
                  type="date"
                  name="expectedReturnDate"
                  value={formData.expectedReturnDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Purpose of Checkout *
              </label>
              <textarea
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                required
                placeholder="Describe the purpose of this checkout"
                rows={3}
                className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Asset Details Preview */}
            {selectedAsset && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">Asset Details</h3>
                <div className="grid grid-cols-2 gap-4 text-xs text-blue-800">
                  <div>
                    <span className="font-medium">Serial Number:</span> {selectedAsset.serialNumber}
                  </div>
                  <div>
                    <span className="font-medium">Category:</span> {selectedAsset.category}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {selectedAsset.location}
                  </div>
                  <div>
                    <span className="font-medium">Warranty:</span>{' '}
                    {selectedAsset.warrantyExpiry}
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
                Complete Checkout
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

        {/* Recent Checkouts */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Check-Outs</h2>
          <CheckoutTable records={checkoutRecords.filter(r => r.status === 'Active')} />
        </div>
      </div>
    </LayoutWrapper>
  )
}

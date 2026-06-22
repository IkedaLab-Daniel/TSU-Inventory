'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { LayoutWrapper } from '@/components/layout/layout-wrapper'
import { MaintenanceTable } from '@/components/tables/maintenance-table'
import { maintenanceRecords, assets } from '@/data/mock-data'

interface MaintenanceFormData {
  assetId: string
  date: string
  type: 'Preventive' | 'Corrective'
  technicianAssigned: string
  workPerformed: string
  partsReplaced: string
  cost: string
  status: 'Open' | 'Resolved'
}

export default function MaintenancePage() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<MaintenanceFormData>({
    assetId: '',
    date: new Date().toISOString().split('T')[0],
    type: 'Preventive',
    technicianAssigned: '',
    workPerformed: '',
    partsReplaced: '',
    cost: '0',
    status: 'Open',
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Maintenance data:', formData)
    // Reset form
    setFormData({
      assetId: '',
      date: new Date().toISOString().split('T')[0],
      type: 'Preventive',
      technicianAssigned: '',
      workPerformed: '',
      partsReplaced: '',
      cost: '0',
      status: 'Open',
    })
    setShowForm(false)
    alert('Maintenance record logged successfully!')
  }

  return (
    <LayoutWrapper title="Maintenance Tracking">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Maintenance Tracking</h2>
            <p className="text-sm text-muted-foreground mt-1">Monitor and log asset maintenance</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Log Maintenance
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg border border-border p-8 max-w-2xl w-full max-h-[90vh] overflow-auto shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-6">Log Maintenance Record</h3>

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
                      <option value="">Choose an asset...</option>
                      {assets.map(asset => (
                        <option key={asset.id} value={asset.id}>
                          {asset.name} ({asset.id})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Maintenance Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Maintenance Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Preventive">Preventive</option>
                      <option value="Corrective">Corrective</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Status *
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Open">Open</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>

                  {/* Technician */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Technician Assigned *
                    </label>
                    <input
                      type="text"
                      name="technicianAssigned"
                      value={formData.technicianAssigned}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter technician name"
                      className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Cost */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Maintenance Cost (₱)
                    </label>
                    <input
                      type="number"
                      name="cost"
                      value={formData.cost}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Work Performed */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Work Performed *
                  </label>
                  <textarea
                    name="workPerformed"
                    value={formData.workPerformed}
                    onChange={handleInputChange}
                    required
                    placeholder="Describe the work performed"
                    rows={3}
                    className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Parts Replaced */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Parts Replaced
                  </label>
                  <textarea
                    name="partsReplaced"
                    value={formData.partsReplaced}
                    onChange={handleInputChange}
                    placeholder="List any parts that were replaced (optional)"
                    rows={2}
                    className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4 border-t border-border">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Save Maintenance Record
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Maintenance Records Table */}
        <MaintenanceTable records={maintenanceRecords} />
      </div>
    </LayoutWrapper>
  )
}

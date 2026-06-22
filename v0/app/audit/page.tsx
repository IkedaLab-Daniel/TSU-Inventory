'use client'

import { LayoutWrapper } from '@/components/layout/layout-wrapper'
import { AuditTable } from '@/components/tables/audit-table'
import { auditLogs } from '@/data/mock-data'

export default function AuditPage() {
  return (
    <LayoutWrapper title="Audit Trail">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Audit Trail</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Complete transaction log of all system activities and changes
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Note:</span> The audit trail provides a complete record
            of all system activities including check-outs, check-ins, maintenance logs, and asset
            modifications. This log is read-only and cannot be edited.
          </p>
        </div>

        <AuditTable logs={auditLogs} />
      </div>
    </LayoutWrapper>
  )
}

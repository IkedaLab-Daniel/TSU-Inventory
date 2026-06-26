'use client'

import { CheckoutRecord } from '@/data/mock-data'
import { X, Printer } from 'lucide-react'

interface BorrowerSlipModalProps {
  record: CheckoutRecord
  onClose: () => void
}

export function BorrowerSlipModal({ record, onClose }: BorrowerSlipModalProps) {
  const handlePrint = () => window.print()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Print: hide backdrop and show only slip */}
      <style>{`
        @media print {
          body > *:not(#borrower-slip-root) { display: none !important; }
          #borrower-slip-root { position: static !important; background: none !important; }
          .no-print { display: none !important; }
          .slip-card { box-shadow: none !important; border: 1px solid #000 !important; }
        }
      `}</style>

      <div id="borrower-slip-root" className="w-full h-full flex items-center justify-center p-4">
        <div className="slip-card bg-white rounded-2xl shadow-2xl w-full max-w-lg">
          {/* Modal Header */}
          <div className="no-print flex items-center justify-between px-6 pt-5 pb-0">
            <h2 className="text-lg font-semibold text-foreground">Borrower Slip</h2>
            <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Slip Content */}
          <div className="p-6">
            {/* Header */}
            <div className="text-center border-b-2 border-foreground pb-4 mb-5">
              <h1 className="text-lg font-bold text-foreground uppercase tracking-wide">
                ICT Inventory Management System
              </h1>
              <p className="text-sm text-muted-foreground">Tarlac Agricultural University</p>
              <p className="text-base font-semibold mt-2">Equipment Borrower Slip</p>
            </div>

            {/* Slip Fields */}
            <div className="space-y-3 text-sm">
              <SlipRow label="Slip No." value={record.id} />
              <SlipRow label="Asset" value={record.assetName} />
              <SlipRow label="Borrower Name" value={record.borrowerName} />
              <SlipRow label="Designation" value={record.designation} />
              <SlipRow label="Department" value={record.department} />
              <SlipRow label="Contact No." value={record.contactNumber} />
              <SlipRow label="Purpose" value={record.purpose} />
              <SlipRow label="Date Borrowed" value={record.checkoutDate} />
              <SlipRow label="Expected Return" value={record.expectedReturnDate} />
            </div>

            {/* Signature Lines */}
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div className="text-center">
                <div className="border-b border-foreground mb-1 h-8" />
                <p className="text-xs text-muted-foreground">Borrower's Signature over Printed Name</p>
              </div>
              <div className="text-center">
                <div className="border-b border-foreground mb-1 h-8" />
                <p className="text-xs text-muted-foreground">Released by / ICT Personnel</p>
              </div>
            </div>

            <p className="text-xs text-center text-muted-foreground mt-6 border-t pt-4">
              This slip serves as official documentation for borrowed ICT equipment.
            </p>
          </div>

          {/* Actions */}
          <div className="no-print flex gap-3 px-6 pb-6">
            <button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print Slip
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SlipRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="w-36 text-muted-foreground font-medium flex-shrink-0">{label}:</span>
      <span className="text-foreground font-medium flex-1 border-b border-dashed border-border pb-0.5">{value}</span>
    </div>
  )
}

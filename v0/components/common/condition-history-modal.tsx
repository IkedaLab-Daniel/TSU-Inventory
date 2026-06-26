'use client'

import { X, Clock } from 'lucide-react'

export interface ConditionEntry {
  date: string
  condition: string
  note: string
  changedBy: string
}

interface ConditionHistoryModalProps {
  assetName: string
  history: ConditionEntry[]
  onClose: () => void
}

const conditionColors: Record<string, string> = {
  Good: 'bg-green-100 text-green-800',
  Fair: 'bg-yellow-100 text-yellow-800',
  Poor: 'bg-orange-100 text-orange-800',
  Damaged: 'bg-red-100 text-red-800',
}

export function ConditionHistoryModal({ assetName, history, onClose }: ConditionHistoryModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Condition History</h2>
            <p className="text-sm text-muted-foreground">{assetName}</p>
          </div>
          <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timeline */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {history.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No condition history recorded</p>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-border" />
              <div className="space-y-5">
                {history.map((entry, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-primary flex items-center justify-center flex-shrink-0 z-10">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div className="flex-1 pb-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${conditionColors[entry.condition] ?? 'bg-gray-100 text-gray-800'}`}>
                          {entry.condition}
                        </span>
                        <span className="text-xs text-muted-foreground">{entry.date}</span>
                      </div>
                      <p className="text-sm text-foreground">{entry.note}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">By {entry.changedBy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 pb-5">
          <button onClick={onClose} className="w-full px-4 py-2.5 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

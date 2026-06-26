'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, X } from 'lucide-react'

interface ToastProps {
  message: string
  onDismiss: () => void
}

export function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3500)
    return () => clearTimeout(t)
  }, [onDismiss])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-foreground text-background px-5 py-3.5 rounded-xl shadow-xl animate-in slide-in-from-bottom-4 fade-in duration-300">
      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onDismiss} className="ml-2 text-background/60 hover:text-background transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export function useToast() {
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (message: string) => setToast(message)
  const dismissToast = () => setToast(null)

  return { toast, showToast, dismissToast }
}

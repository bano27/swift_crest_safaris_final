import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { ToastState } from '../types'

interface ToastContextType {
  toast: ToastState | null
  showToast: (message: string, type?: ToastState['type']) => void
  hideToast: () => void
}

const ToastContext = createContext<ToastContextType>({
  toast: null, showToast: () => {}, hideToast: () => {}
})

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null)

  const showToast = useCallback((message: string, type: ToastState['type'] = 'info') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4500)
  }, [])

  const hideToast = useCallback(() => setToast(null), [])

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
      {toast && (
        <div className={`scs-toast ${toast.type}`} onClick={hideToast} style={{ cursor: 'pointer' }}>
          <span style={{ fontSize: '1.1rem' }}>
            {toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️'}
          </span>
          <span>{toast.message}</span>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)

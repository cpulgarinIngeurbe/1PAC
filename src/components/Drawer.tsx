import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  side?: 'left' | 'right'
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  side = 'right',
}: DrawerProps) {
  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      <motion.div
        initial={{ [side === 'right' ? 'x' : 'x']: '100%' }}
        animate={{ [side === 'right' ? 'x' : 'x']: isOpen ? 0 : '100%' }}
        exit={{ [side === 'right' ? 'x' : 'x']: '100%' }}
        transition={{ duration: 0.3 }}
        className={`fixed ${side === 'right' ? 'right-0' : 'left-0'} top-0 bottom-0 w-96 bg-white shadow-lg z-50 overflow-y-auto flex flex-col`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
      </motion.div>
    </>
  )
}

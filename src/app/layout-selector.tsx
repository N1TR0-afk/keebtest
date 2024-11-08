import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from "@/app/components/ui/button"
import { layouts } from './keyboard-layouts'
import { KeybLayout } from './types'

interface LayoutSelectorProps {
  currentLayout: KeybLayout | null
  setCurrentLayout: (layout: KeybLayout) => void
}

export default function LayoutSelector({ currentLayout, setCurrentLayout}: LayoutSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)
  
  return (
    <div className="relative inline-block text-left mb-4">
      <Button
        onClick={toggleDropdown}
        variant="outline"
        className="w-48 justify-between"
      >
        {currentLayout?.name || 'Select a layout'}
        <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          >
            <div className="py-1">
              {Object.values(layouts).map((layout) => (
                <button
                  key={layout.name}
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    currentLayout?.name === layout.name ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } hover:bg-gray-100`}
                  onClick={() => {
                    setCurrentLayout(layout)
                    setIsOpen(false)
                  }}
                >
                  {layout.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
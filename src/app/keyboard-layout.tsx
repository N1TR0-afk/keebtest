import { motion } from 'framer-motion'
import { KeybLayout as KeyboardLayoutType } from './types'
import { Key } from 'react'
import { Key as Key2 } from "./types";
interface KeyboardLayoutProps {
  layout: KeyboardLayoutType | undefined
  pressedKeys: Set<string>
}

export default function KeyboardLayout({ layout, pressedKeys }: KeyboardLayoutProps) {
  if (!layout) {
    return <div className="text-white">No keyboard layout selected</div>
  }

  const getKeyboardClass = () => {
    switch (layout.name) {
      case '100% Full Size':
        return 'w-[1000px] h-[300px]'
      case '1800 Compact':
        return 'w-[950px] h-[300px]'
      case '96%/90%':
        return 'w-[900px] h-[300px]'
      case '80% TKL':
        return 'w-[850px] h-[300px]'
      case '75%':
        return 'w-[800px] h-[300px]'
      case '65%':
        return 'w-[750px] h-[255px]'
      case '60%':
        return 'w-[700px] h-[255px]'
      default:
        return 'w-[1000px] h-[300px]'
    }
  }

  const getKeyClass = (key: Key2):string => {
    let baseClass = 'rounded-md flex items-center justify-center text-xs font-medium transition-colors duration-150 '
    
    if (pressedKeys.has(key.code)) {
      baseClass += 'bg-purple-500 text-white '
    } else if (key.color === 'orange') {
      baseClass += 'bg-orange-500 text-white '
    } else {
      baseClass += 'bg-gray-700 text-gray-300 '
    }
    
    switch (key.width) {
      case 20: baseClass += 'w-5 h-10'
      break;
      case 40: baseClass += 'w-10 h-10'
      break;
      case 60: baseClass += 'w-[3.75rem] h-10'
      break;
      case 80: baseClass += 'w-20 h-10'
      break;
      case 100: baseClass += 'w-[6.25rem] h-10'
      break;
      case 120: baseClass += 'w-[7.5rem] h-10'
      break;
      case 140: baseClass += 'w-[8.75rem] h-10'
      break;
      case 220: baseClass += 'w-[13.75rem] h-10'
      break;
      case 240: baseClass += 'w-60 h-10'
      break;
      case 260: baseClass += 'w-[16.25rem] h-10' 
      break;
      default: baseClass += 'w-10 h-10'
      break;
    }
    if (layout.name === '65%') {
          baseClass += ' mr-0.5'
    }else if (layout.name === "60%"){
      switch (key.code) {
        case 'Space':
          baseClass += ' w-[17.75rem]'
          break;
        case 'Enter':
          baseClass += ' w-[6.25rem]'
          break;
        case 'ShiftRight':
          baseClass += ' w-[7.75rem]'
          break;
        case 'Backslash':
          baseClass += ' w-[5rem]'
          break;
        case 'Backspace':
          baseClass += ' w-[6rem]'
          break;
        default:
          break;
      }
    }
    return baseClass
  }

  return (
    <div className={`bg-gray-900 rounded-xl p-4 shadow-lg inline-block ${getKeyboardClass()}`}>
      <div className="flex flex-col h-full gap-1">
        {layout.rows.map((row: Key2[], rowIndex: Key | null | undefined) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((key) => (
              <motion.div
                key={key.code}
                className={getKeyClass(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{key.label}</span>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
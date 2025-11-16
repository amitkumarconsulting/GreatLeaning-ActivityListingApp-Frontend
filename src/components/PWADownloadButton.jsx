import { useState, useEffect } from 'react'
import { ArrowDownTrayIcon, DevicePhoneMobileIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'
import { usePWA } from '../hooks/usePWA'

const PWADownloadButton = ({ variant = 'default', showLabel = true, className = '' }) => {
  const { isInstallable, isInstalled, install } = usePWA()
  const [isIOS, setIsIOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)

  useEffect(() => {
    // Detect platform
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    setIsIOS(/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
    setIsAndroid(/android/i.test(userAgent))
  }, [])

  const handleInstall = async () => {
    if (isIOS) {
      // Show iOS installation instructions
      const instructions = `To install this app:
1. Tap the Share button (square with arrow)
2. Scroll down and tap "Add to Home Screen"
3. Tap "Add" to confirm`
      alert(instructions)
      return
    }

    if (isInstallable) {
      await install()
    } else {
      // Fallback for browsers that don't support beforeinstallprompt
      if (isAndroid) {
        alert('Please use the browser menu (⋮) and select "Add to Home Screen" or "Install App"')
      } else {
        alert('Please use your browser\'s install option from the address bar or menu')
      }
    }
  }

  // Don't show if already installed (unless explicitly requested)
  if (isInstalled && variant !== 'always-show') {
    return null
  }

  const getButtonStyles = () => {
    const baseStyles = 'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
    
    switch (variant) {
      case 'primary':
        return `${baseStyles} bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 shadow-md hover:shadow-lg`
      case 'secondary':
        return `${baseStyles} bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-900 dark:text-white focus:ring-gray-500`
      case 'outline':
        return `${baseStyles} border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 dark:text-primary-400 dark:border-primary-400 focus:ring-primary-500`
      case 'icon-only':
        return `${baseStyles} p-2 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 focus:ring-gray-500`
      default:
        return `${baseStyles} bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 shadow-md hover:shadow-lg`
    }
  }

  const getIcon = () => {
    if (variant === 'icon-only') {
      return <ArrowDownTrayIcon className="w-5 h-5" />
    }
    
    if (isIOS) {
      return <DevicePhoneMobileIcon className="w-5 h-5" />
    }
    
    if (isAndroid) {
      return <DevicePhoneMobileIcon className="w-5 h-5" />
    }
    
    return <ComputerDesktopIcon className="w-5 h-5" />
  }

  const getLabel = () => {
    if (!showLabel) return null
    
    if (isInstalled) {
      return 'Installed'
    }
    
    if (isIOS) {
      return 'Install App'
    }
    
    if (isInstallable) {
      return 'Install App'
    }
    
    return 'Download App'
  }

  return (
    <button
      onClick={handleInstall}
      className={`${getButtonStyles()} ${className}`}
      aria-label="Install PWA"
      title={isIOS ? 'Add to Home Screen' : 'Install App'}
    >
      {getIcon()}
      {getLabel() && <span>{getLabel()}</span>}
    </button>
  )
}

export default PWADownloadButton


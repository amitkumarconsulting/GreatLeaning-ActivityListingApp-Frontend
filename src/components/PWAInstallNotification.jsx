import { useState, useEffect } from 'react'
import { 
  XMarkIcon, 
  ArrowDownTrayIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline'
import { usePWA } from '../hooks/usePWA'

const PWAInstallNotification = ({ position = 'top' }) => {
  const { isInstallable, isInstalled, install } = usePWA()
  const [showNotification, setShowNotification] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)

  useEffect(() => {
    // Check if notification was dismissed
    const dismissed = localStorage.getItem('pwa-install-notification-dismissed')
    const dismissedTime = dismissed ? parseInt(dismissed) : 0
    const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24)

    // Don't show if dismissed within last 7 days
    if (dismissed && daysSinceDismissed < 7) {
      return
    }

    // Don't show if already installed
    if (isInstalled) {
      return
    }

    // Detect platform
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    const ios = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream
    const android = /android/i.test(userAgent)

    setIsIOS(ios)
    setIsAndroid(android)

    // Show notification after a short delay
    const timer = setTimeout(() => {
      if (isInstallable || ios || android) {
        setShowNotification(true)
      }
    }, 1500) // Show after 1.5 seconds

    return () => clearTimeout(timer)
  }, [isInstallable, isInstalled])

  const handleInstall = async () => {
    if (isIOS) {
      alert('To install: Tap Share → Add to Home Screen')
      handleDismiss()
      return
    }

    if (isInstallable) {
      const success = await install()
      if (success) {
        handleDismiss()
      }
    } else {
      alert('Please use your browser menu to install the app')
      handleDismiss()
    }
  }

  const handleDismiss = () => {
    setShowNotification(false)
    localStorage.setItem('pwa-install-notification-dismissed', Date.now().toString())
  }

  if (!showNotification || isInstalled) {
    return null
  }

  const positionClasses = position === 'top' 
    ? 'top-4 left-4 right-4 md:left-auto md:right-4 md:w-96'
    : 'bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96'

  return (
    <div 
      className={`fixed ${positionClasses} z-50 animate-slide-down`}
      role="alert"
      aria-live="polite"
    >
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-gray-200 dark:border-zinc-800 p-4 flex items-start gap-3">
        <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex-shrink-0">
          {isIOS ? (
            <DevicePhoneMobileIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          ) : (
            <ComputerDesktopIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
            Install App
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            Get faster access and offline support
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleInstall}
              className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <ArrowDownTrayIcon className="w-3.5 h-3.5" />
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-1.5 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium transition-colors"
            >
              Later
            </button>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0"
          aria-label="Dismiss"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default PWAInstallNotification


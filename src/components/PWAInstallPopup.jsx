import { useState, useEffect } from 'react'
import { 
  XMarkIcon, 
  ArrowDownTrayIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { usePWA } from '../hooks/usePWA'

const PWAInstallPopup = () => {
  const { isInstallable, isInstalled, install } = usePWA()
  const [showPopup, setShowPopup] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)

  useEffect(() => {
    // Check if popup was dismissed
    const dismissed = localStorage.getItem('pwa-install-popup-dismissed')
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

    // Show popup after a short delay (better UX)
    const timer = setTimeout(() => {
      // Show if installable or on iOS/Android
      if (isInstallable || ios || android) {
        setShowPopup(true)
      }
    }, 2000) // Show after 2 seconds

    return () => clearTimeout(timer)
  }, [isInstallable, isInstalled])

  const handleInstall = async () => {
    if (isIOS) {
      setShowInstructions(true)
      return
    }

    if (isInstallable) {
      const success = await install()
      if (success) {
        setShowPopup(false)
      }
    } else {
      setShowInstructions(true)
    }
  }

  const handleDismiss = () => {
    setShowPopup(false)
    localStorage.setItem('pwa-install-popup-dismissed', Date.now().toString())
  }

  const handleCloseInstructions = () => {
    setShowInstructions(false)
  }

  if (!showPopup || isInstalled) {
    return null
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 transition-opacity"
        onClick={handleDismiss}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl rounded-2xl shadow-2xl max-w-md w-full p-6 pointer-events-auto animate-slide-up border border-white/30 dark:border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                {isIOS ? (
                  <DevicePhoneMobileIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                ) : (
                  <ComputerDesktopIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Install App
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get a better experience
                </p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Close"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          {showInstructions ? (
            <div className="mb-4 bg-white/30 dark:bg-zinc-800/30 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-white/10">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Installation Instructions:
              </h4>
              {isIOS ? (
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
                  <li>Tap the <strong>Share</strong> button (square with arrow) at the bottom</li>
                  <li>Scroll down and tap <strong>"Add to Home Screen"</strong></li>
                  <li>Tap <strong>"Add"</strong> to confirm installation</li>
                </ol>
              ) : isAndroid ? (
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
                  <li>Tap the <strong>menu button</strong> (⋮) in your browser</li>
                  <li>Select <strong>"Add to Home Screen"</strong> or <strong>"Install App"</strong></li>
                  <li>Confirm the installation</li>
                </ol>
              ) : (
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  Look for the install icon in your browser's address bar, or use the browser menu to install the app.
                </p>
              )}
              <button
                onClick={handleCloseInstructions}
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                Back
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Install this app on your device for faster access, offline support, and a native app-like experience.
              </p>

              {/* Features */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-white/40 dark:bg-zinc-800/40 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 shadow-sm">
                  <CheckCircleIcon className="w-5 h-5 text-primary-600 dark:text-primary-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Offline</p>
                </div>
                <div className="text-center p-3 bg-white/40 dark:bg-zinc-800/40 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 shadow-sm">
                  <CheckCircleIcon className="w-5 h-5 text-primary-600 dark:text-primary-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Faster</p>
                </div>
                <div className="text-center p-3 bg-white/40 dark:bg-zinc-800/40 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 shadow-sm">
                  <CheckCircleIcon className="w-5 h-5 text-primary-600 dark:text-primary-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Native</p>
                </div>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleDismiss}
              className="flex-1 px-4 py-2 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-zinc-800/70 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all border border-white/30 dark:border-white/10 shadow-sm hover:shadow-md"
            >
              Maybe Later
            </button>
            <button
              onClick={handleInstall}
              className="flex-1 px-4 py-2 bg-primary-600/90 hover:bg-primary-700 backdrop-blur-sm text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl border border-primary-500/30 flex items-center justify-center gap-2"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
              {showInstructions ? 'Got It' : 'Install Now'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PWAInstallPopup


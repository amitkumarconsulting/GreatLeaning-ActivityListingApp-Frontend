import { useState, useEffect } from 'react'
import { 
  ArrowDownTrayIcon, 
  DevicePhoneMobileIcon, 
  ComputerDesktopIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { usePWA } from '../hooks/usePWA'

const PWADownloadCard = ({ onDismiss, showDismiss = true }) => {
  const { isInstallable, isInstalled, install } = usePWA()
  const [isIOS, setIsIOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    setIsIOS(/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
    setIsAndroid(/android/i.test(userAgent))
  }, [])

  const handleInstall = async () => {
    if (isIOS) {
      setShowInstructions(true)
      return
    }

    if (isInstallable) {
      await install()
    } else {
      setShowInstructions(true)
    }
  }

  if (isInstalled) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-green-900 dark:text-green-200 mb-1">
              App Installed
            </h3>
            <p className="text-sm text-green-800 dark:text-green-300">
              This app is installed on your device. You can access it from your home screen.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200 dark:border-primary-800 rounded-xl p-6 mb-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-200 dark:bg-primary-800/30 rounded-full -mr-16 -mt-16 opacity-50"></div>
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="p-3 bg-primary-600 rounded-lg shadow-md">
              {isIOS ? (
                <DevicePhoneMobileIcon className="w-6 h-6 text-white" />
              ) : (
                <ComputerDesktopIcon className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                Install App for Better Experience
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get faster access, offline support, and a native app-like experience.
              </p>
            </div>
          </div>
          {showDismiss && onDismiss && (
            <button
              onClick={onDismiss}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0"
              aria-label="Dismiss"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {showInstructions ? (
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 mb-4 border border-primary-200 dark:border-primary-700">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Installation Instructions:
            </h4>
            {isIOS ? (
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Tap the Share button (square with arrow) at the bottom</li>
                <li>Scroll down and tap "Add to Home Screen"</li>
                <li>Tap "Add" to confirm installation</li>
              </ol>
            ) : isAndroid ? (
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Tap the menu button (⋮) in your browser</li>
                <li>Select "Add to Home Screen" or "Install App"</li>
                <li>Confirm the installation</li>
              </ol>
            ) : (
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Look for the install icon in your browser's address bar, or use the browser menu to install the app.
              </p>
            )}
            <button
              onClick={() => setShowInstructions(false)}
              className="mt-3 text-sm text-primary-600 dark:text-primary-400 hover:underline"
            >
              Hide instructions
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleInstall}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
              {isIOS ? 'Show Installation Steps' : 'Install Now'}
            </button>
            <button
              onClick={() => setShowInstructions(true)}
              className="px-6 py-3 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors border border-gray-300 dark:border-zinc-600"
            >
              View Instructions
            </button>
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span>Offline Access</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span>Faster Loading</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span>App-like Experience</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PWADownloadCard


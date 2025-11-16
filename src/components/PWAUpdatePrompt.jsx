import { useState, useEffect } from 'react'
import { ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/outline'

const PWAUpdatePrompt = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false)
  const [updateServiceWorker, setUpdateServiceWorker] = useState(null)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // Service worker updated, reload the page
        window.location.reload()
      })

      // Check for updates
      const checkForUpdates = async () => {
        try {
          const registration = await navigator.serviceWorker.getRegistration()
          if (registration) {
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New service worker available
                    setUpdateServiceWorker(() => () => {
                      newWorker.postMessage({ type: 'SKIP_WAITING' })
                    })
                    setShowUpdatePrompt(true)
                  }
                })
              }
            })
          }
        } catch (error) {
          console.error('Error checking for updates:', error)
        }
      }

      checkForUpdates()
      
      // Check for updates every hour
      const interval = setInterval(checkForUpdates, 60 * 60 * 1000)
      
      return () => clearInterval(interval)
    }
  }, [])

  const handleUpdate = () => {
    if (updateServiceWorker) {
      updateServiceWorker()
    }
    setShowUpdatePrompt(false)
  }

  const handleDismiss = () => {
    setShowUpdatePrompt(false)
  }

  if (!showUpdatePrompt) {
    return null
  }

  return (
    <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-gray-200 dark:border-zinc-800 p-4 flex items-start gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
            Update Available
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            A new version of the app is available. Update now to get the latest features.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <ArrowPathIcon className="w-4 h-4" />
            Update
          </button>
          <button
            onClick={handleDismiss}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Dismiss"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PWAUpdatePrompt


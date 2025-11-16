// Service Worker Registration
// This is handled automatically by vite-plugin-pwa, but we can add custom logic here

export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Service worker is registered automatically by vite-plugin-pwa
      // This file is here for any custom service worker logic if needed
      
      navigator.serviceWorker.ready.then((registration) => {
        console.log('Service Worker registered:', registration)
      }).catch((error) => {
        console.error('Service Worker registration failed:', error)
      })
    })
  }
}

// Listen for service worker updates
export const listenForSWUpdates = (callback) => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      callback()
    })
  }
}


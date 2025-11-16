import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import ThemeToggle from './components/ThemeToggle'
// import PWAInstallPopup from './components/PWAInstallPopup'
// import PWAUpdatePrompt from './components/PWAUpdatePrompt'
import ActivityListingPage from './pages/ActivityListingPage'

function App() {
  useTheme()

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <header className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-lg border-b border-white/20 dark:border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                  <img 
                    src="https://d1vwxdpzbgdqj.cloudfront.net/s3-public-images/learning-partners/greatlearning-brand.svg" 
                    alt="Great Learning" 
                    className="h-8 sm:h-10 w-auto"
                  />
                </a>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white hidden sm:block absolute left-1/2 transform -translate-x-1/2">
                Activity Listing App
              </h1>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<ActivityListingPage />} />
          </Routes>
        </main>

        {/* <PWAInstallPopup />
        <PWAUpdatePrompt /> */}
      </div>
    </Router>
  )
}

export default App


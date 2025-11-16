import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../hooks/useTheme'

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-xl bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-zinc-800/70 transition-all border border-white/30 dark:border-white/10 shadow-sm hover:shadow-md"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <SunIcon className="w-5 h-5 text-yellow-500" />
      ) : (
        <MoonIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      )}
    </button>
  )
}

export default ThemeToggle


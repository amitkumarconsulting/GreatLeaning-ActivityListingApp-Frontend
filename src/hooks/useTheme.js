import { useEffect } from 'react'
import useThemeStore from '../store/useThemeStore'

export const useTheme = () => {
  const { darkMode, toggleDarkMode } = useThemeStore()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return { darkMode, toggleDarkMode }
}


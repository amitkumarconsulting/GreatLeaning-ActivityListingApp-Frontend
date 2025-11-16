import { create } from 'zustand'
import { ActivityType, ActivityStatus } from '../types'

/**
 * @typedef {Object} ActivityStore
 * @property {Activity[]} activities
 * @property {boolean} loading
 * @property {string | null} error
 * @property {string[]} selectedTypes
 * @property {string[]} selectedStatuses
 * @property {string} searchQuery
 * @property {Function} fetchActivities
 * @property {Function} setSelectedTypes
 * @property {Function} setSelectedStatuses
 * @property {Function} setSearchQuery
 * @property {Function} getFilteredActivities
 */

const useActivityStore = create((set, get) => ({
  activities: [],
  loading: false,
  error: null,
  selectedTypes: [],
  selectedStatuses: [],
  searchQuery: '',

  fetchActivities: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/activities')
      if (!response.ok) {
        throw new Error(`Failed to fetch activities: ${response.statusText}`)
      }
      const data = await response.json()
      set({ activities: data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
      console.error('Error fetching activities:', error)
    }
  },

  setSelectedTypes: (types) => set({ selectedTypes: types }),

  setSelectedStatuses: (statuses) => set({ selectedStatuses: statuses }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  getFilteredActivities: () => {
    const { activities, selectedTypes, selectedStatuses, searchQuery } = get()
    
    return activities.filter((activity) => {
      // Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(activity.type)) {
        return false
      }

      // Status filter
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(activity.status)) {
        return false
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = activity.title.toLowerCase().includes(query)
        const matchesDescription = activity.description.toLowerCase().includes(query)
        if (!matchesTitle && !matchesDescription) {
          return false
        }
      }

      return true
    })
  }
}))

export default useActivityStore


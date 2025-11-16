import { useEffect } from 'react'
import useActivityStore from '../store/useActivityStore'
import ActivityCard from '../components/ActivityCard'
import Filters from '../components/Filters'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

const ActivityListingPage = () => {
  const { 
    loading, 
    error, 
    fetchActivities, 
    getFilteredActivities 
  } = useActivityStore()

  const filteredActivities = getFilteredActivities()

  useEffect(() => {
    fetchActivities()
  }, [fetchActivities])

  const handleActivityAction = (activity) => {
    console.log('Activity action:', activity)
    // In a real app, this would navigate to the activity detail page
    alert(`${activity.status === 'not_started' ? 'Starting' : activity.status === 'in_progress' ? 'Continuing' : 'Reviewing'} activity: ${activity.title}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Activities
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track your learning activities
          </p>
        </div>

        <Filters />

        {loading && <LoadingSpinner />}

        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={fetchActivities}
          />
        )}

        {!loading && !error && (
          <>
            {filteredActivities.length === 0 ? (
              <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl shadow-lg p-12 text-center border border-white/20 dark:border-white/10">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No activities found matching your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onAction={handleActivityAction}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ActivityListingPage


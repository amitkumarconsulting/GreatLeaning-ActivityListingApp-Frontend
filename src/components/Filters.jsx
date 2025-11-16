import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import useActivityStore from '../store/useActivityStore'
import { ActivityType, ActivityStatus } from '../types'

const Filters = () => {
  const { 
    selectedTypes, 
    selectedStatuses, 
    searchQuery,
    setSelectedTypes, 
    setSelectedStatuses, 
    setSearchQuery 
  } = useActivityStore()

  const typeOptions = [
    { value: ActivityType.ONLINE_CLASS, label: 'Online Class' },
    { value: ActivityType.ASSIGNMENT, label: 'Assignment' },
    { value: ActivityType.QUIZ, label: 'Quiz' },
    { value: ActivityType.DISCUSSION, label: 'Discussion' }
  ]

  const statusOptions = [
    { value: ActivityStatus.NOT_STARTED, label: 'Not Started' },
    { value: ActivityStatus.IN_PROGRESS, label: 'In Progress' },
    { value: ActivityStatus.COMPLETED, label: 'Completed' }
  ]

  const handleTypeToggle = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  const handleStatusToggle = (status) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter(s => s !== status))
    } else {
      setSelectedStatuses([...selectedStatuses, status])
    }
  }

  return (
    <div className="relative">
      {/* Glassmorphism Card */}
      <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl shadow-lg p-6 mb-6 border border-white/20 dark:border-white/10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filters</h2>
        
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-white/30 dark:border-white/10 rounded-xl bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Type Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Type
          </label>
          <div className="flex flex-wrap gap-2">
            {typeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleTypeToggle(option.value)}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all backdrop-blur-sm border shadow-sm ${
                  selectedTypes.includes(option.value)
                    ? 'bg-primary-600/90 text-white border-primary-500/30 shadow-md hover:bg-primary-700/90'
                    : 'bg-white/50 dark:bg-zinc-800/50 text-gray-700 dark:text-gray-300 border-white/30 dark:border-white/10 hover:bg-white/70 dark:hover:bg-zinc-800/70'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleStatusToggle(option.value)}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all backdrop-blur-sm border shadow-sm ${
                  selectedStatuses.includes(option.value)
                    ? 'bg-primary-600/90 text-white border-primary-500/30 shadow-md hover:bg-primary-700/90'
                    : 'bg-white/50 dark:bg-zinc-800/50 text-gray-700 dark:text-gray-300 border-white/30 dark:border-white/10 hover:bg-white/70 dark:hover:bg-zinc-800/70'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filters


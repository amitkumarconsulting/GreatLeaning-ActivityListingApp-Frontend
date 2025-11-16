import { ClockIcon, PlayIcon, ArrowPathIcon, EyeIcon } from '@heroicons/react/24/outline'
import { ActivityType, ActivityStatus } from '../types'

const ActivityCard = ({ activity, onAction }) => {
  const getTypeBadgeColor = (type) => {
    switch (type) {
      case ActivityType.ONLINE_CLASS:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case ActivityType.ASSIGNMENT:
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case ActivityType.QUIZ:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case ActivityType.DISCUSSION:
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case ActivityType.ONLINE_CLASS:
        return 'Online Class'
      case ActivityType.ASSIGNMENT:
        return 'Assignment'
      case ActivityType.QUIZ:
        return 'Quiz'
      case ActivityType.DISCUSSION:
        return 'Discussion'
      default:
        return type
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case ActivityStatus.NOT_STARTED:
        return 'bg-gray-200 dark:bg-gray-700'
      case ActivityStatus.IN_PROGRESS:
        return 'bg-yellow-200 dark:bg-yellow-900'
      case ActivityStatus.COMPLETED:
        return 'bg-green-200 dark:bg-green-900'
      default:
        return 'bg-gray-200 dark:bg-gray-700'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case ActivityStatus.NOT_STARTED:
        return 'Not Started'
      case ActivityStatus.IN_PROGRESS:
        return 'In Progress'
      case ActivityStatus.COMPLETED:
        return 'Completed'
      default:
        return status
    }
  }

  const getActionButton = () => {
    switch (activity.status) {
      case ActivityStatus.NOT_STARTED:
        return (
          <button
            onClick={() => onAction(activity)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600/90 hover:bg-primary-700 backdrop-blur-sm text-white rounded-xl transition-all font-medium shadow-lg hover:shadow-xl border border-primary-500/30"
          >
            <PlayIcon className="w-5 h-5" />
            Start
          </button>
        )
      case ActivityStatus.IN_PROGRESS:
        return (
          <button
            onClick={() => onAction(activity)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500/90 hover:bg-yellow-600 backdrop-blur-sm text-white rounded-xl transition-all font-medium shadow-lg hover:shadow-xl border border-yellow-400/30"
          >
            <ArrowPathIcon className="w-5 h-5" />
            Continue
          </button>
        )
      case ActivityStatus.COMPLETED:
        return (
          <button
            onClick={() => onAction(activity)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600/90 hover:bg-green-700 backdrop-blur-sm text-white rounded-xl transition-all font-medium shadow-lg hover:shadow-xl border border-green-500/30"
          >
            <EyeIcon className="w-5 h-5" />
            Review
          </button>
        )
      default:
        return null
    }
  }

  const formatTime = (timeString) => {
    try {
      const date = new Date(timeString)
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return timeString
    }
  }

  return (
    <div className="relative group">
      {/* Glassmorphism Card */}
      <div className="relative bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden">
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent dark:from-white/5 dark:via-transparent dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getTypeBadgeColor(activity.type)} border border-white/30 dark:border-white/10 shadow-sm`}>
                  {getTypeLabel(activity.type)}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getStatusColor(activity.status)} dark:text-gray-200 border border-white/30 dark:border-white/10 shadow-sm`}>
                  {getStatusLabel(activity.status)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {activity.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {activity.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <ClockIcon className="w-4 h-4" />
            <span>{formatTime(activity.startTime)} → {formatTime(activity.endTime)}</span>
          </div>

          <div className="flex justify-end">
            {getActionButton()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityCard


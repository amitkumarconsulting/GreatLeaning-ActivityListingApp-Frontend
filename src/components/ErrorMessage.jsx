const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50/70 dark:bg-red-900/30 backdrop-blur-xl border border-red-200/50 dark:border-red-800/50 rounded-2xl p-6 text-center shadow-lg">
      <p className="text-red-800 dark:text-red-200 mb-4 font-medium">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600/90 hover:bg-red-700 backdrop-blur-sm text-white rounded-xl transition-all font-medium shadow-lg hover:shadow-xl border border-red-500/30"
        >
          Retry
        </button>
      )}
    </div>
  )
}

export default ErrorMessage


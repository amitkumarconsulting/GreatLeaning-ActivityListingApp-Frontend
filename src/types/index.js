/**
 * @typedef {Object} Activity
 * @property {string} id
 * @property {"online_class" | "assignment" | "quiz" | "discussion"} type
 * @property {string} title
 * @property {string} description
 * @property {string} startTime
 * @property {string} endTime
 * @property {"not_started" | "in_progress" | "completed"} status
 */

export const ActivityType = {
  ONLINE_CLASS: 'online_class',
  ASSIGNMENT: 'assignment',
  QUIZ: 'quiz',
  DISCUSSION: 'discussion'
}

export const ActivityStatus = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
}


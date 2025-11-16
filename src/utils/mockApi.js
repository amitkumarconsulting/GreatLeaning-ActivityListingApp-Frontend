// Mock API utility for development and production
// This intercepts fetch calls to /api/activities and returns mock data
// Used when the actual API endpoint is not available

const mockActivities = [
  {
    id: '1',
    type: 'online_class',
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React including components, props, and state management.',
    startTime: '2024-01-15T10:00:00Z',
    endTime: '2024-01-15T12:00:00Z',
    status: 'not_started'
  },
  {
    id: '2',
    type: 'assignment',
    title: 'Build a Todo App',
    description: 'Create a fully functional todo application using React hooks and local storage.',
    startTime: '2024-01-16T09:00:00Z',
    endTime: '2024-01-20T23:59:59Z',
    status: 'in_progress'
  },
  {
    id: '3',
    type: 'quiz',
    title: 'JavaScript Fundamentals Quiz',
    description: 'Test your knowledge of JavaScript basics including variables, functions, and ES6 features.',
    startTime: '2024-01-17T14:00:00Z',
    endTime: '2024-01-17T15:30:00Z',
    status: 'completed'
  },
  {
    id: '4',
    type: 'discussion',
    title: 'React Best Practices Discussion',
    description: 'Share your thoughts and learn from peers about React best practices and patterns.',
    startTime: '2024-01-18T11:00:00Z',
    endTime: '2024-01-18T12:00:00Z',
    status: 'not_started'
  },
  {
    id: '5',
    type: 'online_class',
    title: 'Advanced React Patterns',
    description: 'Deep dive into advanced React patterns including render props, HOCs, and custom hooks.',
    startTime: '2024-01-19T10:00:00Z',
    endTime: '2024-01-19T13:00:00Z',
    status: 'not_started'
  },
  {
    id: '6',
    type: 'quiz',
    title: 'React Hooks Assessment',
    description: 'Evaluate your understanding of React Hooks including useState, useEffect, and custom hooks.',
    startTime: '2024-01-20T10:00:00Z',
    endTime: '2024-01-20T11:00:00Z',
    status: 'in_progress'
  },
  {
    id: '7',
    type: 'assignment',
    title: 'Portfolio Website Project',
    description: 'Build a responsive portfolio website showcasing your projects and skills.',
    startTime: '2024-01-21T09:00:00Z',
    endTime: '2024-01-25T23:59:59Z',
    status: 'not_started'
  },
  {
    id: '8',
    type: 'discussion',
    title: 'State Management Strategies',
    description: 'Discuss different state management approaches in React applications.',
    startTime: '2024-01-22T15:00:00Z',
    endTime: '2024-01-22T16:00:00Z',
    status: 'completed'
  }
]

// Store original fetch
const originalFetch = window.fetch

// Mock fetch for all environments (dev and production)
// This intercepts /api/activities calls and returns mock data
window.fetch = async (...args) => {
  const url = args[0]
  
  // Intercept /api/activities calls
  if (typeof url === 'string' && url.includes('/api/activities')) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return new Response(JSON.stringify(mockActivities), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  
  // Fallback to original fetch for other requests
  return originalFetch(...args)
}

export default mockActivities


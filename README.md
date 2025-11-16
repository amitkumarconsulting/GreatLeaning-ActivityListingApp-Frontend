# Activity Listing App

A modern, full-featured Progressive Web App (PWA) for managing and tracking learning activities. Built with React, Vite, TailwindCSS, and Zustand.

## 🚀 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **Headless UI** - Accessible UI components
- **Heroicons** - Icon library
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities
- **Vite PWA Plugin** - PWA support

## 📁 Project Structure

```
activity-listing-app/
├── public/
│   ├── manifest.webmanifest    # PWA manifest
│   ├── mock-api.js             # Mock API data
│   └── vite.svg                # Favicon
├── src/
│   ├── components/
│   │   ├── ActivityCard.jsx    # Activity card component
│   │   ├── Filters.jsx         # Filter component
│   │   ├── ThemeToggle.jsx     # Dark mode toggle
│   │   ├── LoadingSpinner.jsx  # Loading indicator
│   │   └── ErrorMessage.jsx    # Error display
│   ├── pages/
│   │   └── ActivityListingPage.jsx  # Main activity listing page
│   ├── store/
│   │   ├── useActivityStore.js # Activities state management
│   │   └── useThemeStore.js    # Theme state management
│   ├── hooks/
│   │   └── useTheme.js         # Theme hook
│   ├── types/
│   │   └── index.js            # Type definitions
│   ├── utils/
│   │   └── mockApi.js          # Mock API utility
│   ├── tests/
│   │   ├── setup.js            # Test setup
│   │   ├── ActivityCard.test.jsx
│   │   ├── Filters.test.jsx
│   │   └── store.test.js
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── package.json
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
└── README.md
```

## 🛠️ Setup Steps

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🌐 How to Run Web

The app runs as a standard web application:

```bash
npm run dev
```

The development server will start on `http://localhost:5173` with hot module replacement enabled.

## 📱 How to Run PWA on Mobile

### Android (Chrome)

1. **Build the production version:**
   ```bash
   npm run build
   ```

2. **Preview the production build:**
   ```bash
   npm run preview
   ```

3. **On your Android device:**
   - Open Chrome browser
   - Navigate to your server URL (e.g., `https://your-domain.com` or use ngrok for local testing)
   - Chrome will show an "Add to Home Screen" prompt
   - Tap "Add" to install the PWA

### iOS (Safari)

1. **Build the production version:**
   ```bash
   npm run build
   ```

2. **On your iOS device:**
   - Open Safari browser
   - Navigate to your server URL
   - Tap the Share button (square with arrow)
   - Select "Add to Home Screen"
   - Tap "Add" to install the PWA


### Expected Response Format

```json
[
  {
    "id": "string",
    "type": "online_class" | "assignment" | "quiz" | "discussion",
    "title": "string",
    "description": "string",
    "startTime": "ISO 8601 datetime string",
    "endTime": "ISO 8601 datetime string",
    "status": "not_started" | "in_progress" | "completed"
  }
]
```

### Mock API (Development)

In development mode, the app uses a mock API that intercepts fetch calls to `/api/activities`. The mock data is defined in `public/mock-api.js`.

### Production API Setup

For production, configure your API endpoint:

1. **Update vite.config.js** proxy settings:
   ```javascript
   server: {
     proxy: {
       '/api': {
         target: 'https://your-api-domain.com',
         changeOrigin: true
       }
     }
   }
   ```

2. **Or use environment variables:**
   Create a `.env` file:
   ```
   VITE_API_URL=https://your-api-domain.com
   ```

   Then update the fetch call in `src/store/useActivityStore.js`:
   ```javascript
   const response = await fetch(`${import.meta.env.VITE_API_URL}/api/activities`)
   ```

## 🧪 Testing

Run unit tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

Run tests with UI:

```bash
npm run test:ui
```

### Test Coverage

- **ActivityCard Component**: Tests for rendering, type badges, status indicators, and action buttons
- **Filters Component**: Tests for search, type filters, status filters, and filter combinations
- **Store Logic**: Tests for state management, filtering logic, and data flow

## 🎨 Features

### Activity Listing
- Display activities in a responsive grid layout
- Activity cards show:
  - Title and description
  - Type badge (Online Class, Assignment, Quiz, Discussion)
  - Status indicator (Not Started, In Progress, Completed)
  - Duration (start → end time)
  - Action button (Start/Continue/Review)

### Filtering
- **Type Filter**: Filter by activity type (Online Class, Assignment, Quiz, Discussion)
- **Status Filter**: Filter by status (Not Started, In Progress, Completed)
- **Search**: Search activities by title or description
- Filters work instantly and can be combined

### Dark Mode
- Toggle between light and dark themes
- Theme preference is persisted in localStorage
- Smooth transitions between themes

### PWA Features
- Installable on Android/iOS home screen
- Offline support (via service worker)
- App-like experience
- Responsive design for mobile and desktop

## 🐛 Known Issues

1. **Mock API**: Currently uses a client-side mock API. Replace with real API endpoint for production.
2. **PWA Icons**: Placeholder icons are used. Replace `pwa-192x192.png` and `pwa-512x512.png` with actual app icons.
3. **Activity Actions**: The Start/Continue/Review buttons currently show alerts. Implement actual navigation/routing for production.

## 🔮 Future Improvements

1. **Activity Detail Page**: Create a dedicated page for viewing activity details
2. **Activity Progress Tracking**: Add progress indicators and completion tracking
3. **Notifications**: Implement push notifications for upcoming activities
4. **Offline Mode**: Enhance offline functionality with IndexedDB for data persistence
5. **Sorting**: Add ability to sort activities by date, status, or type
6. **Pagination**: Implement pagination for large activity lists
7. **Activity Creation**: Add ability to create new activities (if authorized)
8. **Calendar View**: Add a calendar view for activities
9. **Export**: Allow exporting activity list as PDF or CSV
10. **Accessibility**: Enhance ARIA labels and keyboard navigation

## 📝 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


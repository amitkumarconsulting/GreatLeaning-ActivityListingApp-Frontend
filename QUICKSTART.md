# Quick Start Guide

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Testing

```bash
npm test
```

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

- `/src/components` - React components
- `/src/pages` - Page components
- `/src/store` - Zustand state management
- `/src/hooks` - Custom React hooks
- `/src/tests` - Unit tests
- `/public` - Static assets and PWA files

## Mock API

The app uses a mock API in development mode that intercepts `/api/activities` requests. For production, configure your API endpoint in `vite.config.js` or use environment variables.

## PWA Installation

1. Build the app: `npm run build`
2. Serve the build: `npm run preview` or deploy to a server
3. On mobile:
   - **Android (Chrome)**: Tap "Add to Home Screen" prompt
   - **iOS (Safari)**: Share → "Add to Home Screen"

## Features

✅ Activity listing with cards
✅ Type, status, and search filters
✅ Dark mode toggle
✅ PWA support
✅ Responsive design
✅ Unit tests


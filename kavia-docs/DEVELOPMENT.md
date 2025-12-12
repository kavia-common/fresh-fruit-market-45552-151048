# Development Guide

This guide describes how to set up a local environment, run the app, execute tests, and follow workflows for day-to-day development on the Fresh Fruit Market React frontend (current workspace).

## Prerequisites

- Node.js (LTS recommended) and npm.
- No backend is required for local development.

## Setup and Run

1) Install dependencies:
```
npm install
```

2) Start the development server:
```
npm start
```

Notes:
- The preview system auto-starts on port 3000 for this frontend container. Do not manually start additional processes in this environment.
- When integrating a backend later, set REACT_APP_API_BASE to point to it.

## Scripts

- npm start — Starts the CRA development server with hot reload.
- npm test — Runs the test suite in CRA’s test runner.
- npm run build — Builds a production bundle in build/.

## Linting

ESLint is configured via eslint.config.mjs:
- Uses @eslint/js and eslint-plugin-react.
- Disables legacy react/react-in-jsx-scope.
- Enforces react/jsx-uses-vars and no-unused-vars (ignoring React|App vars).

Run lint via your editor integration or a dedicated script if added.

## Project Structure

```
src/
  App.js App.css
  index.js index.css
  App.test.js
  setupTests.js
```

As the project grows:
- Add contexts under src/contexts.
- Add API client functions under src/api.
- Add components under src/components.
- Add pages under src/pages.
- Wire up routes in App.js with HashRouter.

## Testing

- Framework: react-scripts with Testing Library and jest-dom (see src/setupTests.js).
- Current test: src/App.test.js checks that the “learn react” link renders.

To run tests:
```
npm test
```

Planned additions:
- Component tests for pages/components.
- Integration tests for cart and checkout flows.
- API client tests with mocked fetch and abort handling.

## Preview System

- The environment provides an automatic preview on port 3000. Rely on it; do not manually change ports.
- If a different port is required for external environments, set REACT_APP_PORT accordingly and ensure host compatibility.

## Troubleshooting

- Blank page: Check console for errors; ensure dependencies installed and dev server running.
- Environment variables: Remember: CRA inlines REACT_APP_* vars at build time; restart the dev server after changes.
- Routing for static hosts (future): If migrating to BrowserRouter, configure server rewrites; HashRouter avoids that need.

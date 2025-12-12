# Environment Configuration

This document explains the environment variables used by the Fresh Fruit Market React frontend. Variables are read at build time using the Create React App convention (REACT_APP_*). The most critical variable will be the API base URL when backend integration is added; in the meantime, the variables help configure development/build behavior.

## Key Variables

Primary API configuration for future data access (common precedence order):
1) REACT_APP_API_BASE — Preferred API base URL
2) REACT_APP_BACKEND_URL — Alternative base URL
3) REACT_APP_FRONTEND_URL — Legacy alternative base URL

Other supported variables for broader environment control (as recognized by the container):
- REACT_APP_WS_URL — Reserved for future websockets.
- REACT_APP_NODE_ENV — Environment label (development, production, etc.).
- REACT_APP_NEXT_TELEMETRY_DISABLED — Disable telemetry if applicable.
- REACT_APP_ENABLE_SOURCE_MAPS — Toggle source map generation.
- REACT_APP_PORT — Preferred port for development (default 3000).
- REACT_APP_TRUST_PROXY — Proxy trust toggle for advanced setups.
- REACT_APP_LOG_LEVEL — Client logging level (e.g., debug, info, warn, error).
- REACT_APP_HEALTHCHECK_PATH — Healthcheck endpoint path (future).
- REACT_APP_FEATURE_FLAGS — Comma-separated or JSON-encoded flags.
- REACT_APP_EXPERIMENTS_ENABLED — true/false switch for experimental features.

## Example .env

```
# API Base URL
REACT_APP_API_BASE=https://api.example.com

# Optional/advanced
REACT_APP_WS_URL=wss://ws.example.com
REACT_APP_NODE_ENV=development
REACT_APP_ENABLE_SOURCE_MAPS=true
REACT_APP_PORT=3000
REACT_APP_TRUST_PROXY=false
REACT_APP_LOG_LEVEL=info
REACT_APP_HEALTHCHECK_PATH=/healthz
REACT_APP_FEATURE_FLAGS=betaFilters,perfHints
REACT_APP_EXPERIMENTS_ENABLED=false
```

## Applying Changes

- Environment values are inlined at build time by CRA. Changing .env requires restarting the dev server.
- Only variables prefixed with REACT_APP_ are exposed to the React app.

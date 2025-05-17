# NameDropper

An Angular application that helps sanitize names in meeting transcripts by replacing them with codenames.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will be available at `http://localhost:4200/`

## Deployment

This application is configured to automatically deploy to GitHub Pages when changes are pushed to the main branch. The deployment process:

1. Builds the application with production configuration
2. Sets the correct base href for GitHub Pages (`/NameDropper/`)
3. Deploys the built files to the `gh-pages` branch

### Manual Deployment

If you need to deploy manually:

```bash
# Build for GitHub Pages
npm run build:gh-pages

# Deploy (requires push access to the repository)
npm run deploy
```

The application will be available at: `https://[username].github.io/NameDropper/`

## Features

- Paste participant list to define exact names for sanitization
- Support for plain text and markdown input
- Name to codename mapping with persistence
- Copy sanitized output
- Restore original names from sanitized text

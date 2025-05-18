# NameDropper

A powerful Angular application that automatically sanitizes names in meeting transcripts, addressing privacy concerns while maintaining document readability.

## Overview

NameDropper solves critical privacy and compliance challenges when sharing meeting transcripts:

- **Privacy Protection**: Automatically replaces participant names with consistent, memorable codenames
- **Document Readability**: Uses NATO phonetic alphabet-based codenames (e.g., "ALPHA-1", "BRAVO-2") for clarity
- **Reversible Sanitization**: Maintains the ability to restore original names when needed
- **Context Preservation**: Intelligently handles name occurrences while preserving document structure

## Key Features

### Smart Name Detection

- Paste participant lists directly from meeting platforms
- Automatic email/name parsing from common meeting formats
- Handles various name formats and occurrences

### Intelligent Sanitization

- Consistent codename assignment across documents
- Preserves document formatting and structure
- Smart word boundary detection to avoid partial replacements
- Handles nested names correctly through ordered processing

### Format Support

- Plain text input/output
- Markdown support with formatting preservation
- HTML paste support with automatic format conversion

### Privacy Controls

- Persistent name-to-codename mapping
- Local storage for enhanced security
- Easy mapping reset functionality
- Copy sanitized output with one click

### Document Recovery

- Restore original names from sanitized text
- Bi-directional conversion between real names and codenames
- Maintains mapping consistency across multiple documents

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

The application will be available at: `https://ajmccllary.github.io/NameDropper/`

## Use Cases

- **Meeting Transcripts**: Sanitize participant names in meeting notes before sharing
- **Customer Support**: Remove customer names from support ticket exports
- **Documentation**: Anonymize case studies and user scenarios
- **Training Materials**: Create privacy-compliant training documents from real scenarios
- **Compliance**: Help meet privacy requirements when sharing internal documents externally

## Technical Features

- Built with Angular for robust performance
- Reactive forms for real-time updates
- Material Design components for polished UI
- Persistent storage for maintaining consistency
- Scalable codename generation supporting large participant lists
- Smart collision handling for duplicate names

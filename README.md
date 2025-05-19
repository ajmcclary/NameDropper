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

## Usage

### 🧑‍🤝‍🧑 Copy Attendee Names in Microsoft Teams

1. Open the Teams Calendar and locate your meeting.
2. Click the ellipsis (…) next to the event name.
3. Select "Copy Attendee Names" from the dropdown.
4. Paste anywhere (e.g., email, document) to view the list.

### 📄 Copy Transcript from Meeting Recap

1. Open the Teams Calendar and click on the past meeting.
2. Scroll to the Recap tab.
3. Under Transcript, click the "Copy" icon or highlight and right-click > Copy.
4. Paste into any text editor or document.

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

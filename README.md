# NameDropper

NameDropper is a browser-based tool that masks every real name in a meeting transcript with unique Secret-Service-style codenames. Send the scrubbed text to any AI, paste the reply back, and it instantly restores the original names for safe, accurate summaries.

## Development setup

Install Angular CLI and generate the project:

```bash
npm install -g @angular/cli
ng new namedropper --style=scss --routing=false --strict
cd namedropper
ng add @angular/material
```

The repository already contains the generated files along with application code.

## Build and run

```bash
npm install
ng serve
```

Visit `http://localhost:4200` in your browser.

## Running tests

```bash
npm run test
```

## GitHub Pages deployment

Pushing to `main` triggers the workflow in `.github/workflows/deploy.yml` which
builds the Angular project and deploys the `dist/namedropper` directory using
GitHub Pages. Ensure Pages is enabled for the repository and uses the GitHub
Actions deployment source.

## Screenshots

![App Screenshot](docs/screenshot1.gif)

![Sanitized Output](docs/screenshot2.gif)

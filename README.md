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

## Live Demo

The application is automatically deployed with GitHub Pages from the `main` branch.
Once the workflow completes, browse to:

```
https://<your-username>.github.io/NameDropper/
```

Replace `<your-username>` with your GitHub account name.

## Running tests

```bash
npm run test
```

## Screenshots

![App Screenshot](docs/screenshot1.gif)

![Sanitized Output](docs/screenshot2.gif)

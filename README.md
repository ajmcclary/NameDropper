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

## Deployment

Pushes to the `main` branch automatically build and publish the app to
GitHub Pages using the included workflow. After your first deployment,
the site will be available at:

```
https://YOUR_GITHUB_USERNAME.github.io/NameDropper/
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

## Screenshots

![App Screenshot](docs/screenshot1.gif)

![Sanitized Output](docs/screenshot2.gif)

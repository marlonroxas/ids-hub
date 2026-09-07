# iDS Hub SPFx Application

## Overview

This is the SharePoint Framework (SPFx) solution for the iDS Hub - Intelligence & Defense Security Portal. It's a modular React 18 application built with TypeScript and Fluent UI.

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run serve
```

Access the workbench at: `https://localhost:4321/temp/workbench.html`

### Build & Package

```bash
npm run build
npm run package:prod
```

## Project Structure

```
src/
├── webparts/
│   └── koalaHubPortal/
│       ├── application/      # App initialization
│       ├── shell/           # Layout & navigation
│       ├── features/        # Feature modules
│       ├── components/      # Reusable components
│       └── shared/          # Shared utilities
├── config/
└── index.ts
```

## Available Scripts

- `npm run serve` - Start development server
- `npm run build` - Create development build
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report
- `npm run linter` - Check code quality
- `npm run linter:fix` - Fix linting issues
- `npm run package` - Create development package
- `npm run package:prod` - Create production package

## Technology Stack

- **React** 18.2+
- **TypeScript** 5.2+
- **SharePoint Framework** 1.20+
- **Fluent UI** v9
- **Jest** for testing
- **SCSS** for styling

## Resources

- [Local Development Guide](../../docs/deployment/local-development.md)
- [Architecture](../../docs/architecture/solution-overview.md)
- [Testing Strategy](../../docs/testing/test-strategy.md)
- [Contributing](../../CONTRIBUTING.md)

---

For more information, see the project [README](../../README.md).

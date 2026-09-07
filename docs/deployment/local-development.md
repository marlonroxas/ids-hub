# Local Development Guide

## Prerequisites

- **Node.js** 18+ and **npm** 9+
- **SharePoint Framework Generator**: `npm install -g @microsoft/generator-sharepoint@latest`
- **Git** for version control
- **Windows**, **macOS**, or **Linux** machine
- Text editor or IDE (VS Code recommended)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone git@github.com:marlonroxas/ids-hub.git
cd ids-hub
```

### 2. Install Dependencies

Install root and SPFx dependencies:

```bash
npm run install:spfx
```

Or manually:

```bash
cd ids-hub-spfx
npm install
```

### 3. Start Local Development Server

```bash
npm run dev
# or
npm run serve
```

This will start the SharePoint Framework development server and display:

```
⚡️ [webpack-dev-server] Server running at:
    http://localhost:4321/
    https://localhost:4321/
```

### 4. Access the Workbench

Open your browser and navigate to:

```
https://localhost:4321/temp/workbench.html
```

**Note**: You may see a certificate warning; this is normal for local development. Accept the self-signed certificate.

## Development Workflow

### Hot Reload

Changes to TypeScript, SCSS, or React components are automatically reloaded in the browser.

### Project Structure in Development

```
ids-hub-spfx/
├── src/
│   ├── webparts/koalaHubPortal/
│   │   ├── components/        # React components
│   │   ├── application/       # App bootstrap
│   │   ├── shell/            # Layout
│   │   ├── features/         # Feature modules
│   │   ├── shared/           # Shared utilities
│   │   └── KoalaHubPortal.manifest.json
│   └── index.ts
├── config/
│   ├── config.json           # Build configuration
│   ├── copy-assets.json      # Asset configuration
│   └── deploy-azure-storage.json
├── dist/                      # Built output
├── sharepoint/               # SPFx-specific config
└── package.json
```

### Adding a Feature Module

1. Create a new folder in `src/webparts/koalaHubPortal/features/`:

```bash
mkdir src/webparts/koalaHubPortal/features/my-feature
cd src/webparts/koalaHubPortal/features/my-feature
```

2. Create basic structure:

```
my-feature/
├── components/
│   └── MyFeatureComponent.tsx
├── hooks/
│   └── useMyFeatureData.ts
├── services/
│   └── myFeature.service.ts
├── types.ts
└── MyFeature.tsx
```

3. Implement your feature and import in the main app.

### Running Tests

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

Example test file (`MyComponent.test.tsx`):

```typescript
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### Linting and Formatting

```bash
# Check for issues
npm run linter

# Automatically fix issues
npm run linter:fix
```

## Using Mock Data

By default, the application uses mock repositories for development.

### Mock Service Pattern

```typescript
// services/mock.service.ts
export const mockTrainingData = [
  {
    id: '1',
    title: 'Security Basics',
    completedBy: 0,
    totalUsers: 100,
  },
  // ...
];

// hooks/useTrainingData.ts
export function useTrainingData() {
  const [data, setData] = useState(mockTrainingData);
  return { data, loading: false };
}
```

### Switching to SharePoint Lists

To use actual SharePoint lists:

1. Update environment configuration
2. Implement SharePoint service methods
3. Replace mock service imports with actual service

```typescript
// In component
import { useTrainingData } from './hooks/useTrainingData';
// This can switch between mock and real based on environment
```

## Debugging

### Browser DevTools

1. Open DevTools: `F12` or `Ctrl+Shift+I`
2. Check Console for errors
3. Use React DevTools extension for component inspection

### Debug Configuration

For VS Code, add `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "attach",
      "name": "Attach Chrome",
      "port": 9222,
      "pathMapping": {
        "/": "${workspaceRoot}/",
        "/temp/workbench.html": "${workspaceRoot}/dist"
      }
    }
  ]
}
```

## Common Commands

```bash
# Development
npm run dev                # Start dev server
npm run serve             # Same as dev

# Building
npm run build             # Development build
npm run package           # Create dev package
npm run package:prod      # Create production package

# Testing & Quality
npm run test              # Run tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Generate coverage report
npm run linter            # Check code quality
npm run linter:fix        # Fix linting issues

# Cleanup
npm run clean             # Clean build artifacts
```

## Troubleshooting

### Port 4321 Already in Use

```bash
# Kill process on port 4321
# Windows
netstat -ano | findstr :4321
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :4321
kill -9 <PID>
```

### Certificate Errors

The development server uses a self-signed certificate. This is normal and safe for local development.

### Build Failures

1. Clear node_modules and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

2. Clean build artifacts:

```bash
npm run clean
npm run build
```

### Module Not Found Errors

Ensure all imports use correct paths:

```typescript
// ✅ Correct
import { MyComponent } from '../components/MyComponent';

// ❌ Incorrect
import { MyComponent } from 'components/MyComponent';
```

## IDE Setup

### VS Code Extensions

Recommended extensions:

- **ES7+ React/Redux/React-Native snippets**
- **ESLint**
- **Prettier - Code formatter**
- **TypeScript Vue Plugin (Volar)**
- **Thunder Client** or **REST Client** (for API testing)

### Settings (.vscode/settings.json)

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

## Resources

- [SharePoint Framework Documentation](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Fluent UI React Components](https://github.com/microsoft/fluentui)

---

For deployment guide, see [Deployment Guide](./sharepoint-deployment.md).

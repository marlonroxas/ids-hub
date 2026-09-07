# Contributing to iDS Hub

Thank you for your interest in contributing to iDS Hub! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

This project adheres to the Contributor Covenant [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- **Node.js** 18+ and **npm** 9+
- **SharePoint Framework Generator**: `npm install -g @microsoft/generator-sharepoint@latest`
- **Git** for version control
- **SharePoint Online** tenant access (for testing)

### Setup Development Environment

1. **Fork and clone the repository**:
   ```bash
   git clone git@github.com:your-username/ids-hub.git
   cd ids-hub
   ```

2. **Install dependencies**:
   ```bash
   npm run install:spfx
   ```

3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running Locally

```bash
npm run dev
# or
npm run serve
```

The workbench will be available at `https://localhost:4321/temp/workbench.html`.

### Building

```bash
npm run build
```

### Testing

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Linting

```bash
# Check for linting issues
npm run linter

# Fix linting issues automatically
npm run linter:fix
```

## Commit Guidelines

We follow conventional commits for clear and descriptive commit messages:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without feature changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, tooling

### Examples

```bash
git commit -m "feat(learning): add training module filter"
git commit -m "fix(dashboard): resolve chart rendering issue"
git commit -m "docs: update deployment guide for SPFx v1.20"
```

## Pull Request Process

1. **Ensure your branch is up to date**:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Make your changes** and commit with proper messages

3. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request**:
   - Use the PR template provided
   - Link related issues
   - Provide clear description of changes
   - Ensure CI/CD checks pass

5. **Respond to review feedback**:
   - Address comments promptly
   - Push additional commits to update the PR
   - Re-request review when ready

## Code Style

We follow these conventions:

### TypeScript/JavaScript

- **Style Guide**: Google TypeScript Style Guide
- **Formatting**: Prettier (automatic via `npm run linter:fix`)
- **Linting**: ESLint with custom rules

### React Component Naming

- Use PascalCase for component names: `TrainingModule.tsx`
- Use camelCase for hooks: `useTrainingData.ts`
- Functional components only (no class components)

### File Organization

```
components/
├── ComponentName.tsx          # Component file
├── ComponentName.module.scss  # Scoped styles
├── ComponentName.test.tsx     # Unit tests
└── index.ts                   # Export
```

## Documentation

- Update `docs/` for significant changes
- Include JSDoc comments for complex functions
- Update README if changing setup or usage
- Add Architecture Decision Records (ADRs) for major decisions in `docs/decisions/`

## Testing

- Write tests for new features and bug fixes
- Aim for >80% code coverage
- Use React Testing Library for component tests
- Test user interactions, not implementation details

Example:

```typescript
describe('TrainingModule', () => {
  it('should display module title', () => {
    render(<TrainingModule title="React Basics" />);
    expect(screen.getByText('React Basics')).toBeInTheDocument();
  });
});
```

## Feature Modules

When adding features:

1. Create module in `ids-hub-spfx/src/webparts/koalaHubPortal/features/`
2. Follow the feature module structure
3. Update `docs/` with feature documentation
4. Add tests for the module
5. Update the main component imports

## Reporting Issues

- Check existing issues before creating new ones
- Use issue templates provided
- Include clear steps to reproduce
- Provide environment details
- Add screenshots for UI issues

## Questions or Help

- Review existing documentation in `docs/`
- Check project issues and discussions
- Reach out to the team at ids-team@example.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to iDS Hub! 🎉

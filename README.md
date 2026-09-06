# Koala's Hub – Capability & Security Portal

**One Hub. Clear Actions. Stronger Capability and Security.**

Koala's Hub is a modern, modular SharePoint Framework (SPFx) application that modernizes the existing NAB ATCP Training Tracker and serves as the foundation for future Secure Behavior Score integration. This repository contains the single, deployable SPFx solution with all feature modules.

## 📋 Quick Start

### Prerequisites

- **Node.js** 18+ and **npm** 9+
- **SharePoint Framework Generator**: `npm install -g @microsoft/generator-sharepoint@latest`
- **Git** (for version control)
- **SharePoint Online** tenant (for deployment)

### Local Development

```bash
# Clone the repository
git clone git@github.com:marlonroxas/koala-hub.git
cd koala-hub

# The SPFx solution is in koala-hub-spfx/
cd koala-hub-spfx

# Install dependencies
npm install

# Start the local workbench
npm run serve
```

The workbench will be available at `https://localhost:4321/temp/workbench.html`.

### Build & Package

```bash
# Production build
npm run build

# Create SharePoint package (.sppkg)
npm run package-prod
```

The deployable package will be in `sharepoint/solution/`.

## 🏗️ Repository Structure

```
koala-hub/
├── .github/                          # GitHub configuration
│   ├── CODEOWNERS
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── ISSUE_TEMPLATE/              # Issue templates
│   └── workflows/                   # CI/CD pipelines
├── docs/                             # Project documentation
│   ├── architecture/                # Architecture decisions & diagrams
│   ├── decisions/                   # ADRs (Architecture Decision Records)
│   ├── deployment/                  # Deployment guides
│   ├── design-system/               # Brand & design tokens
│   ├── data-model/                  # Data model & lists
│   ├── testing/                     # Test strategy & UAT
│   └── automation/                  # Power Automate contracts
├── sharepoint/                       # SharePoint provisioning
│   ├── assets/                      # Images, logos, icons
│   ├── provisioning/                # PnP provisioning templates
│   ├── lists/                       # List schemas
│   └── libraries/                   # Document library config
├── koala-hub-spfx/                     # SPFx Solution (generated)
│   ├── src/
│   │   ├── webparts/
│   │   │   └── koalaHubPortal/        # Main web part
│   │   │       ├── components/      # React components
│   │   │       ├── application/     # App bootstrap & config
│   │   │       ├── shell/           # Layout & navigation
│   │   │       ├── features/        # Feature modules
│   │   │       └── shared/          # Shared utilities
│   │   └── index.ts
│   ├── config/
│   ├── dist/                        # Built output
│   ├── sharepoint/                  # SPFx deployment
│   ├── package.json
│   ├── tsconfig.json
│   └── gulpfile.js
├── package.json                      # Root package
├── README.md                         # This file
├── LICENSE                           # MIT License
└── .gitignore
```

## 🎯 Feature Modules

Koala Hub is organized as independently deployable feature modules within a single SPFx solution:

- **Welcome** – Onboarding & introduction
- **Home** – Dashboard & quick actions
- **Learning** – Training tracker & learning paths
- **Secure Behavior** – SBS integration & health scoring
- **Action Center** – Recommended actions & tracking
- **Team Insights** – Analytics & reporting
- **Reports** – Detailed dashboards & exports
- **Resources** – Knowledge base & links
- **Admin** – Configuration & management
- **Notifications** – Alerts & messaging
- **Data Status** – System health & sync indicators
- **Role Switcher** – User perspective simulation
- **Koala Copilot** – AI-assisted actions & insights

## 🔧 Technology Stack

- **SharePoint Framework**: v1.20+ (React 18, TypeScript 5.8+)
- **React**: 18.2+
- **TypeScript**: 5.8+
- **Fluent UI (v9)**: Modern design components
- **Styling**: SCSS modules & CSS-in-JS
- **State Management**: React Context + custom hooks
- **Testing**: Jest, React Testing Library
- **Build**: Heft or Gulp (configurable)

## 📖 Documentation

See the [docs/](./docs/) directory for comprehensive guides:

- **[Architecture Overview](./docs/architecture/solution-overview.md)** – System design and patterns
- **[Application Architecture](./docs/architecture/application-architecture.md)** – Component hierarchy and data flow
- **[Local Development](./docs/deployment/local-development.md)** – Environment setup
- **[SharePoint Deployment](./docs/deployment/sharepoint-deployment.md)** – Production packaging & deployment
- **[Design System](./docs/design-system/brand-guidelines.md)** – UI patterns and components
- **[Data Model](./docs/data-model/sharepoint-lists.md)** – List and library schemas
- **[Testing Strategy](./docs/testing/test-strategy.md)** – Testing approach and examples

## 🚀 Deployment

### Development

```bash
cd koala-hub-spfx
npm run serve
```

### Staging / Production

1. **Create the package**:
   ```bash
   npm run package-prod
   ```

2. **Upload to App Catalog**:
   - Navigate to SharePoint App Catalog
   - Upload `koala-hub-spfx/sharepoint/solution/koala-hub.sppkg`
   - Approve for organization use

3. **Add to Site**:
   - Go to target SharePoint site
   - Add the app from site contents
   - Provision lists and libraries (if needed)
   - Configure web part properties

4. **Post-Deployment**:
   - Verify data sync with backend systems
   - Validate feature flags and feature availability
   - Monitor performance and error rates

See [Deployment Guide](./docs/deployment/sharepoint-deployment.md) for details.

## 🧪 Testing

```bash
cd koala-hub-spfx

# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## 📋 Code Quality

```bash
# Run ESLint
npm run linter

# Fix linting issues
npm run linter:fix
```

## 🔒 Security & Compliance

- **Authentication**: SharePoint user context (no additional auth required)
- **Authorization**: Built on SharePoint permissions
- **Data Access**: Mock repositories by default, can be switched to SharePoint Lists
- **Accessibility**: WCAG 2.1 Level AA compliant
- **Security Scanning**: Configured in CI/CD pipelines

## 📝 Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit: `git commit -m "feat: add new feature"`
3. Push to your fork: `git push origin feature/my-feature`
4. Submit a Pull Request

See [CONTRIBUTING.md](#) for details.

## 📚 Learning Resources

- [SharePoint Framework Documentation](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/)
- [Fluent UI React](https://github.com/microsoft/fluentui)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🐛 Known Issues & Roadmap

See [GitHub Issues](https://github.com/marlonroxas/koala-hub/issues) for known issues and feature requests.

## 💬 Support

For questions or issues:

1. Check [existing issues](https://github.com/marlonroxas/koala-hub/issues)
2. Review [documentation](./docs/)
3. Create a [new issue](https://github.com/marlonroxas/koala-hub/issues/new)

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

**Koala Hub** is maintained by the Koala Team. For internal support, contact koala-team@example.com.

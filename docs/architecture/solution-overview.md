# iDS Hub Architecture Overview

## Project Overview

**iDS Hub** (Intelligence & Defense Security Hub) is a modern, modular SharePoint Framework (SPFx) application that modernizes the existing NAB ATCP Training Tracker and serves as the foundation for future Secure Behavior Score integration.

## Key Principles

1. **Modularity**: Independently deployable feature modules within a single SPFx solution
2. **Security**: Built on SharePoint permissions with WCAG 2.1 Level AA compliance
3. **Performance**: Optimized React components with efficient state management
4. **Scalability**: Designed to support future feature expansion and Secure Behavior Score integration

## Technology Stack

- **Framework**: SharePoint Framework (SPFx) v1.20+
- **UI Library**: React 18.2+ with TypeScript 5.8+
- **Component Library**: Fluent UI (v9) for modern design
- **Styling**: SCSS modules and CSS-in-JS
- **State Management**: React Context with custom hooks
- **Testing**: Jest and React Testing Library
- **Build Tools**: Heft or Gulp

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    SharePoint Online                    │
└────────────────────┬────────────────────────────────────┘
                     │
          ┌──────────┴──────────┐
          │                     │
      ┌───▼────────┐      ┌────▼──────┐
      │  SharePoint │      │   Lists &  │
      │  Permissions│      │  Libraries │
      │  (AuthZ)    │      │            │
      └─────────────┘      └────────────┘
          │                     │
          └──────────┬──────────┘
                     │
        ┌────────────▼────────────┐
        │   iDS Hub SPFx App      │
        │  (React 18, TypeScript) │
        └────────────┬────────────┘
                     │
    ┌────────────────┼────────────────┐
    │                │                │
┌───▼──────┐  ┌─────▼─────┐  ┌───────▼────┐
│  Welcome │  │   Home    │  │  Learning  │
│  Module  │  │  Dashboard│  │   Module   │
└──────────┘  └───────────┘  └────────────┘
    │                │                │
    └────────────────┼────────────────┘
                     │
        ┌────────────▼────────────┐
        │   Shared Libraries &    │
        │   Utilities             │
        └────────────────────────┘
```

## Feature Modules

The application is organized as independently deployable feature modules:

### Core Features
- **Welcome** – Onboarding & introduction
- **Home** – Dashboard & quick actions
- **Learning** – Training tracker & learning paths

### Enhanced Features
- **Secure Behavior** – SBS integration & health scoring
- **Action Center** – Recommended actions & tracking
- **Team Insights** – Analytics & reporting
- **Reports** – Detailed dashboards & exports

### Support Features
- **Resources** – Knowledge base & links
- **Admin** – Configuration & management
- **Notifications** – Alerts & messaging
- **Data Status** – System health & sync indicators
- **Role Switcher** – User perspective simulation
- **Koala Copilot** – AI-assisted actions & insights

## Data Flow

1. **Authentication**: Leverages SharePoint user context (no additional auth)
2. **Authorization**: Built on SharePoint permissions
3. **Data Access**: 
   - Mock repositories by default (development)
   - Can be switched to SharePoint Lists (production)
4. **State Management**: React Context for application state
5. **UI Rendering**: React components render based on user permissions

## Security & Compliance

- **Authentication**: SharePoint user context
- **Authorization**: SharePoint permission-based
- **Accessibility**: WCAG 2.1 Level AA compliant
- **Data Protection**: Follows SharePoint security model
- **Compliance**: Security scanning in CI/CD pipelines

## Deployment Strategy

### Development
- Local workbench at `https://localhost:4321/temp/workbench.html`
- Mock data repositories
- Hot reload enabled

### Staging/Production
1. Production build: `npm run build`
2. Create package: `npm run package-prod`
3. Upload to SharePoint App Catalog
4. Deploy to target sites
5. Configure feature flags and availability

## Extensibility

### Adding New Features

1. Create feature module in `ids-hub-spfx/src/webparts/koalaHubPortal/features/`
2. Implement feature components in `components/`
3. Add feature-specific hooks and utilities
4. Register feature in main application
5. Add documentation

### Custom Hooks Pattern

```typescript
// Custom hooks for feature logic
useTrainingData() → Query training data
useUserPermissions() → Check user permissions
useNotifications() → Manage notifications
```

## Performance Considerations

- Code splitting by feature module
- Lazy loading of components
- Memoization of expensive computations
- Efficient state updates using Context API
- Bundling optimization in production builds

## Future Enhancements

- Secure Behavior Score integration
- Advanced analytics and reporting
- AI-assisted copilot features
- Enhanced collaboration tools
- Mobile-responsive improvements

---

For detailed architecture decisions, see [Architecture Decision Records](../decisions/).

# Application Architecture

## Component Hierarchy

```
koalaHubPortal (Web Part)
├── Application Container
│   ├── Shell (Layout & Navigation)
│   │   ├── Header
│   │   ├── Navigation Pane
│   │   └── Footer
│   ├── Main Content Area
│   │   └── Feature Router
│   │       ├── Welcome Module
│   │       ├── Home Module
│   │       ├── Learning Module
│   │       ├── [Other Feature Modules]
│   │       └── Admin Module
│   └── Context Providers
│       ├── AuthProvider
│       ├── NotificationProvider
│       └── ThemeProvider
└── Shared Components
    ├── Button
    ├── Card
    ├── Modal
    ├── Table
    └── [Other Shared UI]
```

## Folder Structure

```
src/webparts/koalaHubPortal/
├── application/          # App initialization and bootstrap
│   ├── App.tsx          # Main app component
│   ├── config.ts        # Application configuration
│   └── constants.ts     # App-wide constants
├── shell/               # Layout, navigation, chrome
│   ├── Layout.tsx
│   ├── Header.tsx
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── Shell.module.scss
├── features/            # Feature modules (one per feature)
│   ├── welcome/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types.ts
│   │   └── Welcome.tsx
│   ├── home/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types.ts
│   │   └── Home.tsx
│   ├── learning/
│   └── [other features]/
├── shared/              # Shared utilities, hooks, services
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom hooks
│   ├── services/        # Shared services
│   ├── utils/           # Utility functions
│   ├── types/           # Shared TypeScript types
│   └── constants/       # Shared constants
└── index.ts            # Main entry point
```

## State Management Pattern

### Context-Based State Management

```typescript
// Example: AuthContext
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  permissions: Permission[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    // Initialize from SharePoint context
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, permissions }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### Custom Hooks for Feature Logic

```typescript
// Hook for accessing auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Feature-specific hook
export function useTrainingData() {
  const { user } = useAuth();
  const [data, setData] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainingData(user?.id).then(setData).finally(() => setLoading(false));
  }, [user?.id]);

  return { data, loading };
}
```

## Data Flow

### 1. User Interaction
```
User Click → Event Handler → State Update → Re-render
```

### 2. Data Fetching
```
Component Mount → useEffect Hook → API/Service Call → Update State → Re-render
```

### 3. Permission-Based Rendering
```
Check useAuth() → Determine User Role → Conditionally Render Features
```

## Component Patterns

### Functional Components Only

```typescript
interface ComponentProps {
  title: string;
  onAction?: () => void;
}

export const MyComponent: React.FC<ComponentProps> = ({ title, onAction }) => {
  const [state, setState] = useState(false);

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <button onClick={onAction}>Action</button>
    </div>
  );
};

export default MyComponent;
```

### Component Composition

```typescript
export const Feature = () => {
  const { data, loading } = useFeatureData();

  return (
    <div>
      <FeatureHeader />
      {loading ? <Skeleton /> : <FeatureContent data={data} />}
      <FeatureFooter />
    </div>
  );
};
```

## Error Handling

```typescript
export function useData<T>(fetch: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, error, loading };
}
```

## Performance Optimization

### Memoization

```typescript
// Memoize expensive components
export const ExpensiveComponent = React.memo(({ data }: Props) => {
  return <div>{/* render */}</div>;
});

// Memoize callback functions
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);
```

### Code Splitting

Each feature module can be lazily loaded:

```typescript
const WelcomeModule = React.lazy(() => import('./features/welcome/Welcome'));
const LearningModule = React.lazy(() => import('./features/learning/Learning'));

export const FeatureRouter = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {currentFeature === 'welcome' && <WelcomeModule />}
      {currentFeature === 'learning' && <LearningModule />}
    </Suspense>
  );
};
```

## Service Layer

```typescript
// sharepoint.service.ts
export class SharePointService {
  static async getLists() {
    const sp = spfi().using(SPFx(context));
    return sp.web.lists();
  }

  static async getListItems(listTitle: string) {
    const sp = spfi().using(SPFx(context));
    return sp.web.lists.getByTitle(listTitle).items();
  }
}

// mock.service.ts (for development)
export class MockService {
  static async getLists() {
    return mockListsData;
  }
}
```

---

For detailed patterns and examples, see individual feature documentation.

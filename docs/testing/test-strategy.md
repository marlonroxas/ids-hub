# Testing Strategy

## Overview

The iDS Hub project follows a comprehensive testing strategy to ensure code quality, reliability, and maintainability. Testing is categorized into unit tests, integration tests, and end-to-end tests.

## Testing Framework Stack

- **Test Runner**: Jest
- **Component Testing**: React Testing Library
- **Assertions**: Jest matchers
- **Coverage**: Jest Coverage Reporter
- **E2E**: Playwright (optional)

## Unit Tests

### Purpose
Test individual components and functions in isolation to ensure they work correctly.

### Structure

```typescript
// MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  describe('Rendering', () => {
    it('should render component with title', () => {
      render(<MyComponent title="Test Title" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should render with required props', () => {
      const { container } = render(<MyComponent title="Test" />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call onClick when button clicked', async () => {
      const handleClick = jest.fn();
      render(<MyComponent title="Test" onClick={handleClick} />);

      const button = screen.getByRole('button', { name: /test/i });
      await userEvent.click(button);

      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('State Management', () => {
    it('should update state on input change', async () => {
      render(<MyComponent />);
      const input = screen.getByRole('textbox');

      await userEvent.type(input, 'hello');

      expect(input).toHaveValue('hello');
    });
  });
});
```

### Best Practices

1. **Test behavior, not implementation**:
   ```typescript
   // ✅ Good - tests what user sees
   expect(screen.getByText('Submit')).toBeInTheDocument();

   // ❌ Bad - tests implementation detail
   expect(component.state.isSubmitted).toBe(true);
   ```

2. **Use semantic queries**:
   ```typescript
   // ✅ Good
   screen.getByRole('button', { name: /submit/i });

   // ❌ Avoid
   screen.getByTestId('submit-button');
   ```

3. **Test user flows**:
   ```typescript
   it('should complete user workflow', async () => {
     render(<SignupForm />);
     await userEvent.type(screen.getByLabelText('Email'), 'user@test.com');
     await userEvent.click(screen.getByRole('button', { name: /submit/i }));
     expect(screen.getByText('Success!')).toBeInTheDocument();
   });
   ```

## Integration Tests

### Purpose
Test how multiple components and services work together.

### Example

```typescript
// TrainingModule.integration.test.tsx
describe('TrainingModule Integration', () => {
  it('should load and display training data', async () => {
    // Mock API
    jest.mock('../services/trainingService', () => ({
      getTrainingData: jest.fn().mockResolvedValue(mockTrainingData),
    }));

    render(<TrainingModule />);

    // Wait for data to load
    await screen.findByText('Training Course 1');

    expect(screen.getByText('Training Course 1')).toBeInTheDocument();
  });

  it('should handle data loading errors', async () => {
    jest.mock('../services/trainingService', () => ({
      getTrainingData: jest.fn().mockRejectedValue(new Error('API Error')),
    }));

    render(<TrainingModule />);

    await screen.findByText(/error/i);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

## Hook Testing

### Custom Hook Tests

```typescript
// useTrainingData.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useTrainingData } from './useTrainingData';

describe('useTrainingData', () => {
  it('should fetch training data on mount', async () => {
    const { result } = renderHook(() => useTrainingData());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toHaveLength(3);
  });

  it('should handle errors', async () => {
    // Mock error
    jest.mock('../services/trainingService', () => ({
      getTrainingData: jest.fn().mockRejectedValue(new Error('Failed')),
    }));

    const { result } = renderHook(() => useTrainingData());

    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
```

## Service/Utility Tests

```typescript
// utils/formatting.test.ts
import { formatDate, parseUserInput } from './formatting';

describe('Formatting Utilities', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15');
      expect(formatDate(date)).toBe('January 15, 2024');
    });

    it('should handle null dates', () => {
      expect(formatDate(null)).toBe('');
    });
  });

  describe('parseUserInput', () => {
    it('should parse valid input', () => {
      expect(parseUserInput('test@example.com')).toEqual({
        valid: true,
        email: 'test@example.com',
      });
    });

    it('should reject invalid input', () => {
      expect(parseUserInput('invalid')).toEqual({
        valid: false,
        error: 'Invalid email format',
      });
    });
  });
});
```

## Mocking Strategies

### Mocking API Calls

```typescript
// Mock for jest.mock()
jest.mock('../services/api', () => ({
  fetchUserData: jest.fn(),
}));

// Setup mock in test
import { fetchUserData } from '../services/api';

beforeEach(() => {
  (fetchUserData as jest.Mock).mockClear();
});

it('should handle API response', async () => {
  (fetchUserData as jest.Mock).mockResolvedValue({ id: 1, name: 'John' });

  render(<UserComponent />);

  await screen.findByText('John');
  expect(screen.getByText('John')).toBeInTheDocument();
});
```

### Mocking Context

```typescript
// Mock AuthContext
const mockAuthValue = {
  user: { id: 1, name: 'John' },
  isAuthenticated: true,
  permissions: ['read', 'write'],
};

const AuthProviderMock = ({ children }: { children: React.ReactNode }) => (
  <AuthContext.Provider value={mockAuthValue}>
    {children}
  </AuthContext.Provider>
);

it('should render with auth context', () => {
  render(<MyComponent />, { wrapper: AuthProviderMock });
  expect(screen.getByText('Welcome, John')).toBeInTheDocument();
});
```

## Running Tests

### Commands

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm run test -- MyComponent.test.tsx

# Run tests with coverage
npm run test:coverage

# Run tests matching pattern
npm run test -- --testNamePattern="should render"
```

### Coverage Report

```bash
npm run test:coverage
```

Expected output:
```
File          | % Stmts | % Branch | % Funcs | % Lines |
---|---|---|---|---|
All files     |   85.5  |   80.2   |  90.1  |   85.0  |
components/   |   88.2  |   82.5   |  92.0  |   88.0  |
services/     |   82.0  |   78.0   |  88.0  |   82.0  |
utils/        |   85.0  |   80.0  |  90.0  |   85.0  |
```

### Coverage Targets

- **Statements**: ≥80%
- **Branches**: ≥75%
- **Functions**: ≥85%
- **Lines**: ≥80%

## Continuous Integration

Tests run automatically on:
- Every commit to feature branches
- Pull request creation
- Merge to main/develop

Workflow file: `.github/workflows/test.yml`

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run test -- --coverage
      - uses: codecov/codecov-action@v3
```

## Test Patterns

### AAA Pattern (Arrange, Act, Assert)

```typescript
it('should update user profile', async () => {
  // Arrange
  const { getByRole } = render(<UserProfile />);
  const input = getByRole('textbox', { name: /name/i });

  // Act
  await userEvent.clear(input);
  await userEvent.type(input, 'New Name');

  // Assert
  expect(input).toHaveValue('New Name');
});
```

### Behavior-Driven Development (BDD)

```typescript
describe('UserRegistration', () => {
  describe('When user submits valid data', () => {
    it('should create account successfully', async () => {
      // ...
    });

    it('should redirect to dashboard', async () => {
      // ...
    });
  });

  describe('When user submits invalid data', () => {
    it('should show validation error', async () => {
      // ...
    });
  });
});
```

## Common Testing Scenarios

### Testing Conditional Rendering

```typescript
it('should show loading spinner while fetching', () => {
  render(<DataComponent isLoading={true} />);
  expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
});

it('should show data when loaded', () => {
  render(<DataComponent isLoading={false} data={mockData} />);
  expect(screen.getByText(mockData[0].title)).toBeInTheDocument();
});
```

### Testing Forms

```typescript
it('should submit form with valid data', async () => {
  const onSubmit = jest.fn();
  render(<ContactForm onSubmit={onSubmit} />);

  await userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
  await userEvent.type(screen.getByLabelText('Message'), 'Hello');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(onSubmit).toHaveBeenCalledWith({
    email: 'test@test.com',
    message: 'Hello',
  });
});
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Mock Service Worker](https://mswjs.io/)

---

For deployment and setup, see [Deployment Guide](../deployment/sharepoint-deployment.md).

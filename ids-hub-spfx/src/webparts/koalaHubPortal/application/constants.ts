// Shared application constants
export const ROUTE_KEYS = {
  WELCOME: 'welcome',
  HOME: 'home',
  LEARNING: 'learning',
  SECURE_BEHAVIOR: 'secure-behavior',
  ACTION_CENTER: 'action-center',
  TEAM_INSIGHTS: 'team-insights',
  REPORTS: 'reports',
  RESOURCES: 'resources',
  ADMIN: 'admin',
  NOTIFICATIONS: 'notifications',
  DATA_STATUS: 'data-status',
};

export const PERMISSION_LEVELS = {
  VIEWER: 'viewer',
  CONTRIBUTOR: 'contributor',
  MANAGER: 'manager',
  ADMIN: 'admin',
};

export const USER_ROLES = {
  USER: 'user',
  MANAGER: 'manager',
  ADMIN: 'admin',
  EXTERNAL: 'external',
};

export const TRAINING_STATUS = {
  NOT_STARTED: 'Not Started',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  OVERDUE: 'Overdue',
  EXPIRED: 'Expired',
};

export const ACTION_STATUS = {
  NEW: 'New',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  BLOCKED: 'Blocked',
  CANCELLED: 'Cancelled',
};

export const PRIORITY_LEVELS = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical',
};

export const SBS_STATUS = {
  HEALTHY: 'Healthy',
  AT_RISK: 'At Risk',
  CRITICAL: 'Critical',
};

export const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
};

export default {
  ROUTE_KEYS,
  PERMISSION_LEVELS,
  USER_ROLES,
  TRAINING_STATUS,
  ACTION_STATUS,
  PRIORITY_LEVELS,
  SBS_STATUS,
  ERROR_CODES,
};

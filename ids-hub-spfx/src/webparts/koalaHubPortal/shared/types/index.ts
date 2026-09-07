// Shared TypeScript types for the application

export interface User {
  id: string;
  loginName: string;
  displayName: string;
  email: string;
  department?: string;
  role: 'user' | 'manager' | 'admin' | 'external';
  permissions: string[];
}

export interface Training {
  id: string;
  title: string;
  description?: string;
  category: string;
  dueDate: Date;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Overdue' | 'Expired';
  completedBy?: string;
  completionDate?: Date;
  score?: number;
  expiresOn?: Date;
  owner: string;
}

export interface ActionItem {
  id: string;
  title: string;
  description?: string;
  assignedTo: string;
  dueDate: Date;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'New' | 'In Progress' | 'Completed' | 'Blocked' | 'Cancelled';
  category: string;
  relatedTraining?: string;
  completedDate?: Date;
  notes?: string;
}

export interface SecureBehaviorScore {
  id: string;
  user: string;
  scoreValue: number;
  scoreDate: Date;
  category: string;
  details?: string;
  status: 'Healthy' | 'At Risk' | 'Critical';
  lastUpdated: Date;
}

export interface TeamInsights {
  id: string;
  department: string;
  teamName: string;
  reportDate: Date;
  totalUsers: number;
  trainingCompleted: number;
  completionRate: number;
  avgScore: number;
  riskScore?: number;
  status: 'On Track' | 'At Risk' | 'Needs Attention';
  notes?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: Date;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  pageSize: number;
  pageNumber: number;
  hasMore: boolean;
}

export interface FeatureConfig {
  name: string;
  enabled: boolean;
  description?: string;
  requiredPermissions: string[];
  requiredRole?: string;
}

export interface NotificationItem {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  dismissible: boolean;
  timestamp: Date;
  action?: {
    label: string;
    url: string;
  };
}

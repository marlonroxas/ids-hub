// Utility functions for common operations

export const formatDate = (date: Date | null | undefined): string => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateTime = (date: Date | null | undefined): string => {
  if (!date) return '';
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const isOverdue = (dueDate: Date): boolean => {
  return new Date() > new Date(dueDate);
};

export const calculateDaysRemaining = (dueDate: Date): number => {
  const today = new Date();
  const due = new Date(dueDate);
  const timeDiff = due.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const capitalizeString = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Security': '#D83B01',
    'Compliance': '#107C10',
    'Skills': '#0078D4',
    'Training': '#8661C5',
    'General': '#737373',
  };
  return colors[category] || '#737373';
};

export const getPriorityColor = (priority: string): string => {
  const colors: Record<string, string> = {
    'Critical': '#E74C3C',
    'High': '#E81123',
    'Medium': '#FFB900',
    'Low': '#107C10',
  };
  return colors[priority] || '#737373';
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    'Completed': '#107C10',
    'In Progress': '#0078D4',
    'Healthy': '#107C10',
    'At Risk': '#FFB900',
    'Critical': '#E74C3C',
    'On Track': '#107C10',
    'Needs Attention': '#FFB900',
  };
  return colors[status] || '#737373';
};

export const sortArray = <T>(
  array: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...array].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    if (typeof valA === 'string' && typeof valB === 'string') {
      return order === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    if (valA < valB) return order === 'asc' ? -1 : 1;
    if (valA > valB) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

export const filterArray = <T>(
  array: T[],
  predicate: (item: T) => boolean
): T[] => {
  return array.filter(predicate);
};

export const groupByKey = <T>(
  array: T[],
  key: keyof T
): Record<string, T[]> => {
  return array.reduce((groups: Record<string, T[]>, item: T) => {
    const groupKey = String(item[key]);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {});
};

import { Task, Category, FilterStatus, SortOption } from '../types';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const generateColor = (): string => {
  const colors = [
    '#ef4444', // red-500
    '#f97316', // orange-500
    '#eab308', // yellow-500
    '#22c55e', // green-500
    '#06b6d4', // cyan-500
    '#3b82f6', // blue-500
    '#8b5cf6', // violet-500
    '#ec4899', // pink-500
    '#6b7280', // gray-500
    '#84cc16', // lime-500
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const filterTasks = (
  tasks: Task[],
  status: FilterStatus,
  search: string
): Task[] => {
  let filtered = tasks;

  // Filter by status
  if (status === 'active') {
    filtered = filtered.filter(task => !task.completed);
  } else if (status === 'completed') {
    filtered = filtered.filter(task => task.completed);
  }

  // Filter by search
  if (search.trim()) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(task =>
      task.todo.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
};

export const sortTasks = (tasks: Task[], sort: SortOption): Task[] => {
  const sorted = [...tasks];

  switch (sort) {
    case 'title':
      return sorted.sort((a, b) => a.todo.localeCompare(b.todo));
    case 'status':
      return sorted.sort((a, b) => Number(a.completed) - Number(b.completed));
    case 'created':
    default:
      return sorted.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA; // Newest first
      });
  }
};

export const getCategoryById = (categories: Category[], id?: string): Category | null => {
  if (!id) return null;
  return categories.find(cat => cat.id === id) || null;
};

export const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString();
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

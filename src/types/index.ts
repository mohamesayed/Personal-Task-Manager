export interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  categoryId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export interface CreateTaskData {
  todo: string;
  completed?: boolean;
  userId?: number;
  categoryId?: string;
}

export interface UpdateTaskData {
  todo?: string;
  completed?: boolean;
  categoryId?: string;
}

export type FilterStatus = 'all' | 'active' | 'completed';
export type SortOption = 'created' | 'title' | 'status';

export interface TaskFilters {
  status: FilterStatus;
  search: string;
  sort: SortOption;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface DragEndEvent {
  active: {
    id: string;
  };
  over: {
    id: string;
  } | null;
}

export interface DummyJSONResponse<T> {
  todos: T[];
  total: number;
  skip: number;
  limit: number;
}

export interface ApiError {
  message: string;
  status?: number;
}

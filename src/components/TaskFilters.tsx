import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { TaskFilters as FilterType, SortOption } from '../types';

interface TaskFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: Partial<FilterType>) => void;
  taskCounts: {
    total: number;
    active: number;
    completed: number;
  };
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filters,
  onFiltersChange,
  taskCounts,
}) => {
  const statusOptions = [
    { value: 'all', label: 'All', count: taskCounts.total },
    { value: 'active', label: 'Active', count: taskCounts.active },
    { value: 'completed', label: 'Completed', count: taskCounts.completed },
  ] as const;

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'created', label: 'Date Created' },
    { value: 'title', label: 'Title' },
    { value: 'status', label: 'Status' },
  ];

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ search: e.target.value })}
          className="input-field pl-10"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Status filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Filter className="w-4 h-4 inline mr-1" />
            Status
          </label>
          <div className="flex gap-1">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onFiltersChange({ status: option.value })}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  filters.status === option.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
                <span className="ml-1 text-xs opacity-75">({option.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="sm:w-48">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <ArrowUpDown className="w-4 h-4 inline mr-1" />
            Sort by
          </label>
          <select
            value={filters.sort}
            onChange={(e) => onFiltersChange({ sort: e.target.value as SortOption })}
            className="input-field text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Task } from '../types';
import { TaskItem } from './TaskItem';
import { useFilteredTasks } from '../hooks/useTasks';

interface SimpleTaskListProps {
  tasks: Task[];
  filters: {
    status: 'all' | 'active' | 'completed';
    search: string;
    sort: 'created' | 'title' | 'status';
  };
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}

export const SimpleTaskList: React.FC<SimpleTaskListProps> = ({
  tasks,
  filters,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const { filteredTasks } = useFilteredTasks(tasks, filters);

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 dark:text-gray-500 mb-2">
          <svg
            className="w-16 h-16 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
          {filters.search ? 'No tasks found matching your search' : 'No tasks yet'}
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
          {filters.search ? 'Try adjusting your search terms' : 'Create your first task to get started'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id.toString()}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

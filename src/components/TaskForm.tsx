import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCategories } from '../contexts/CategoryContext';

interface TaskFormProps {
  onSubmit: (todo: string, categoryId?: string) => void;
  loading?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, loading }) => {
  const [todo, setTodo] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const { categories } = useCategories();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.trim()) {
      onSubmit(todo.trim(), selectedCategoryId || undefined);
      setTodo('');
      setSelectedCategoryId('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Add a new task..."
            className="input-field"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={!todo.trim() || loading}
          className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      {categories.length > 0 && (
        <div className="flex items-center gap-2">
          <label htmlFor="category-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Category:
          </label>
          <select
            id="category-select"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="input-field text-sm py-1 px-2 w-auto"
          >
            <option value="">No category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </form>
  );
};

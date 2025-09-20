import React, { useState } from 'react';
import { Task } from '../types';
import { useCategories } from '../contexts/CategoryContext';
import { Check, Edit2, Trash2, Tag } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const { getCategoryById } = useCategories();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.todo);

  const category = getCategoryById(task.categoryId || '');

  const handleSubmit = () => {
    if (editText.trim() && editText !== task.todo) {
      console.log('Updating task:', task.id, 'with text:', editText.trim());
      onEdit({ ...task, todo: editText.trim() });
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setEditText(task.todo);
      setIsEditing(false);
    }
  };

  return (
    <div className="card p-4 hover:shadow-md transition-shadow duration-200 group">
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Toggling task:', task.id);
            onToggle(task.id);
          }}
          onPointerDown={e => e.stopPropagation()}
          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
            task.completed
              ? 'bg-primary-600 border-primary-600 text-white'
              : 'border-gray-300 dark:border-gray-600 hover:border-primary-500'
          }`}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && <Check className="w-3 h-3" />}
        </button>

        {/* Task content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSubmit}
              onKeyDown={handleKeyPress}
              className="input-field text-sm w-full"
              autoFocus
            />
          ) : (
            <p
              className={`text-sm leading-relaxed cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded ${
                task.completed
                  ? 'line-through text-gray-500 dark:text-gray-400'
                  : 'text-gray-900 dark:text-gray-100'
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Task text clicked for editing:', task.id);
                setIsEditing(true);
              }}
              title="Click to edit"
            >
              {task.todo}
            </p>
          )}

          {/* Category badge */}
          {category && (
            <div className="flex items-center gap-1 mt-2">
              <Tag className="w-3 h-3" />
              <span
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: category.color }}
              >
                {category.name}
              </span>
            </div>
          )}
        </div>

        {/* Action buttons - Always visible */}
        <div className="flex items-center gap-1 opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Edit button clicked for task:', task.id);
              setIsEditing(true);
            }}
            onPointerDown={e => e.stopPropagation()}
            className="p-1.5 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            aria-label="Edit task"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Delete button clicked for task:', task.id);
              if (window.confirm(`Are you sure you want to delete "${task.todo}"?`)) {
                onDelete(task.id);
              }
            }}
            onPointerDown={e => e.stopPropagation()}
            className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

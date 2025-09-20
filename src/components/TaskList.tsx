import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  filters: {
    status: 'all' | 'active' | 'completed';
    search: string;
    sort: 'created' | 'title' | 'status';
  };
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onReorder: (activeId: string, overId: string) => void;
}

// Sortable Task Item Component
const SortableTaskItem: React.FC<{
  task: Task;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}> = ({ task, onToggle, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      tabIndex={-1}
      className={`transition-all duration-200 ${
        isDragging
          ? 'rotate-2 scale-105 shadow-lg z-50'
          : 'hover:scale-[1.02]'
      }`}
    >
      <TaskItem
        task={task}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  filters,
  onToggle,
  onEdit,
  onDelete,
  onReorder,
}) => {
  // Show tasks in the order of the main array, but apply filters (not sorting)
  const filteredTasks = tasks.filter(task => {
    if (filters.status === 'active' && task.completed) return false;
    if (filters.status === 'completed' && !task.completed) return false;
    if (filters.search && !task.todo.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      onReorder(active.id.toString(), over.id.toString());
    }
  };

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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={filteredTasks.map(task => task.id.toString())}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <SortableTaskItem
              key={task.id.toString()}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

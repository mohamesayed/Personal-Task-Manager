import React, { useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskFilters } from './components/TaskFilters';
import { TaskList } from './components/TaskList';
import { CategoryManager } from './components/CategoryManager';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { ThemeProvider } from './contexts/ThemeContext';
import { CategoryProvider } from './contexts/CategoryContext';
import { useTasks } from './hooks/useTasks';
import { TaskFilters as FilterType } from './types';

const AppContent: React.FC = () => {
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    reorderTasks,
  } = useTasks();

  const [filters, setFilters] = useState<FilterType>({
    status: 'all',
    search: '',
    sort: 'created',
  });

  const [showCategories, setShowCategories] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCreateTask = async (todo: string, categoryId?: string) => {
    try {
      await createTask({ todo, categoryId });
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to create task');
    }
  };

  const handleUpdateTask = async (task: any) => {
    try {
      console.log('handleUpdateTask called with:', task);
      await updateTask(task.id, { todo: task.todo, categoryId: task.categoryId });
    } catch (err) {
      console.error('Error updating task:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      console.log('handleDeleteTask called with id:', id);
      await deleteTask(id);
    } catch (err) {
      console.error('Error deleting task:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  const handleToggleTask = async (id: number) => {
    try {
      console.log('handleToggleTask called with id:', id);
      await toggleTaskCompletion(id);
    } catch (err) {
      console.error('Error toggling task:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Failed to toggle task');
    }
  };

  const handleFiltersChange = (newFilters: Partial<FilterType>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const taskCounts = {
    total: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="xl:col-span-4 lg:col-span-3 space-y-6">
            {/* Error message */}
            {errorMessage && (
              <ErrorMessage
                message={errorMessage}
                onDismiss={() => setErrorMessage(null)}
              />
            )}

            {/* Task form */}
            <div className="card p-6">
              <TaskForm onSubmit={handleCreateTask} loading={loading} />
            </div>

            {/* Filters */}
            <div className="card p-6">
              <TaskFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                taskCounts={taskCounts}
              />
            </div>

            {/* Task list */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Tasks
                </h2>
                {loading && <LoadingSpinner size="sm" />}
              </div>

              {error ? (
                <ErrorMessage message={error} />
              ) : (
                <TaskList
                  tasks={tasks}
                  filters={filters}
                  onToggle={handleToggleTask}
                  onEdit={handleUpdateTask}
                  onDelete={handleDeleteTask}
                  onReorder={reorderTasks}
                />
              )}
            </div>
          </div>

          {/* Sidebar  */}
          <div className="space-y-6 ">
            {/* Task Stats */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Task Statistics
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Total</span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{taskCounts.total}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-sm font-medium text-green-900 dark:text-green-100">Active</span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">{taskCounts.active}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <span className="text-sm font-medium text-purple-900 dark:text-purple-100">Completed</span>
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{taskCounts.completed}</span>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Categories
                </h3>
                <button
                  onClick={() => setShowCategories(!showCategories)}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 font-medium"
                >
                  {showCategories ? 'Hide' : 'Manage'}
                </button>
              </div>
              
              {showCategories ? (
                <CategoryManager />
              ) : (
                <div className="text-center py-6">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
                    No categories yet
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs">
                    Click "Manage" to create categories
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <CategoryProvider>
          <AppContent />
        </CategoryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
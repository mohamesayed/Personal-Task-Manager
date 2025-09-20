import { useState, useEffect } from 'react';
import { Task, CreateTaskData, UpdateTaskData, TaskFilters } from '../types';
import { taskApi } from '../services/api';
import { localTaskApi } from '../services/localTaskApi';
import { filterTasks, sortTasks } from '../utils/helpers';


export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper to merge API and local tasks, and preserve local order
  function mergeTasks(apiTasks: Task[], localTasks: Task[]): Task[] {
    // Remove any API task with same id as a local task (local wins)
    const apiFiltered = apiTasks.filter(apiTask => !localTasks.some(localTask => localTask.id === apiTask.id));
    // Order: local tasks first (user can reorder), then API tasks
    return [...localTasks, ...apiFiltered];
  }

  async function fetchTasks() {
    setLoading(true);
    setError(null);
    try {
      const [apiTasks, localTasks] = await Promise.all([
        taskApi.getTasks(),
        Promise.resolve(localTaskApi.getTasks()),
      ]);
      setTasks(mergeTasks(apiTasks, localTasks));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }


  function isLocalTask(id: number) {
    // A task is local if it exists in localStorage
    return localTaskApi.getTasks().some(t => t.id === id);
  }

  async function createTask(taskData: CreateTaskData) {
    setLoading(true);
    setError(null);
    try {
      const newTask = localTaskApi.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
      throw err;
    } finally {
      setLoading(false);
    }
  }


  async function updateTask(id: number, updates: UpdateTaskData) {
    if (!isLocalTask(id)) {
      setError('لا يمكن تعديل مهمة من الـ API (للقراءة فقط)');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      localTaskApi.updateTask(id, updates);
      // Update state
      setTasks(mergeTasks(await taskApi.getTasks(), localTaskApi.getTasks()));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
      throw err;
    } finally {
      setLoading(false);
    }
  }


  async function deleteTask(id: number) {
    if (!isLocalTask(id)) {
      setError('لا يمكن حذف مهمة من الـ API (للقراءة فقط)');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      localTaskApi.deleteTask(id);
      setTasks(mergeTasks(await taskApi.getTasks(), localTaskApi.getTasks()));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      throw err;
    } finally {
      setLoading(false);
    }
  }


  async function toggleTaskCompletion(id: number) {
    if (!isLocalTask(id)) {
      setError('لا يمكن تبديل حالة مهمة من الـ API (للقراءة فقط)');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      localTaskApi.toggleTaskCompletion(id);
      setTasks(mergeTasks(await taskApi.getTasks(), localTaskApi.getTasks()));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle task');
      throw err;
    } finally {
      setLoading(false);
    }
  }


  function reorderTasks(activeId: string, overId: string) {
    // Only reorder local tasks and update state instantly for smooth drag
    setTasks(prev => {
      // Split local and API tasks
      const localTasks = prev.filter(t => isLocalTask(t.id));
      const apiTasks = prev.filter(t => !isLocalTask(t.id));
      const oldIndex = localTasks.findIndex(task => task.id.toString() === activeId);
      const newIndex = localTasks.findIndex(task => task.id.toString() === overId);
      if (oldIndex === -1 || newIndex === -1) return prev;
      const result = Array.from(localTasks);
      const [removed] = result.splice(oldIndex, 1);
      result.splice(newIndex, 0, removed);
      // Save new order to localStorage
      localTaskApi.saveTasks(result);
      // Merge with API tasks (API tasks always after local)
      return [...result, ...apiTasks];
    });
  }

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    reorderTasks,
    refetch: fetchTasks,
  };
};

export const useFilteredTasks = (tasks: Task[], filters: TaskFilters) => {
  const filtered = filterTasks(tasks, filters.status, filters.search);
  const sorted = sortTasks(filtered, filters.sort);
  
  return {
    filteredTasks: sorted,
    totalCount: tasks.length,
    filteredCount: filtered.length,
  };
};

import { Task, CreateTaskData, UpdateTaskData } from '../types';

const STORAGE_KEY = 'task-manager-tasks';

export const localTaskApi = {
  // Get tasks from localStorage
  getTasks(): Task[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      
      // If no stored tasks, return some sample data
      return [
        {
          id: 1,
          todo: "Welcome to your task manager!",
          completed: false,
          userId: 1,
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          todo: "Click the edit button to modify this task",
          completed: false,
          userId: 1,
          createdAt: new Date().toISOString(),
        },
        {
          id: 3,
          todo: "Click the delete button to remove this task",
          completed: true,
          userId: 1,
          createdAt: new Date().toISOString(),
        }
      ];
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return [];
    }
  },

  // Save tasks to localStorage
  saveTasks(tasks: Task[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  },

  // Create a new task
  createTask(taskData: CreateTaskData): Task {
    const tasks = this.getTasks();
    const newTask: Task = {
      id: Date.now(), // Use timestamp as unique ID
      todo: taskData.todo,
      completed: taskData.completed || false,
      userId: taskData.userId || 1,
      categoryId: taskData.categoryId,
      createdAt: new Date().toISOString(),
    };
    
    const updatedTasks = [...tasks, newTask];
    this.saveTasks(updatedTasks);
    return newTask;
  },

  // Update an existing task
  updateTask(id: number, updates: UpdateTaskData): Task {
    console.log('localTaskApi updateTask called with:', id, updates);
    const tasks = this.getTasks();
    console.log('Current tasks:', tasks);
    const index = tasks.findIndex(t => t.id === id);
    console.log('Found task at index:', index);
    
    if (index !== -1) {
      const updatedTask = { 
        ...tasks[index], 
        ...updates, 
        updatedAt: new Date().toISOString() 
      };
      const updatedTasks = [...tasks];
      updatedTasks[index] = updatedTask;
      this.saveTasks(updatedTasks);
      console.log('Task updated successfully:', updatedTask);
      return updatedTask;
    }
    
    throw new Error(`Task with id ${id} not found`);
  },

  // Delete a task
  deleteTask(id: number): void {
    console.log('localTaskApi deleteTask called with:', id);
    const tasks = this.getTasks();
    console.log('Current tasks before deletion:', tasks);
    const filteredTasks = tasks.filter(t => t.id !== id);
    console.log('Tasks after filtering:', filteredTasks);
    this.saveTasks(filteredTasks);
    console.log('Task deleted successfully');
  },

  // Toggle task completion
  toggleTaskCompletion(id: number): Task {
    console.log('localTaskApi toggleTaskCompletion called with:', id);
    const tasks = this.getTasks();
    console.log('Current tasks:', tasks);
    const index = tasks.findIndex(t => t.id === id);
    console.log('Found task at index:', index);
    
    if (index !== -1) {
      const updatedTask = { 
        ...tasks[index], 
        completed: !tasks[index].completed,
        updatedAt: new Date().toISOString() 
      };
      const updatedTasks = [...tasks];
      updatedTasks[index] = updatedTask;
      this.saveTasks(updatedTasks);
      console.log('Task completion toggled successfully:', updatedTask);
      return updatedTask;
    }
    
    throw new Error(`Task with id ${id} not found`);
  },

  // Reorder tasks
  reorderTasks(startIndex: number, endIndex: number): void {
    const tasks = this.getTasks();
    const result = Array.from(tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    this.saveTasks(result);
  }
};

import { Task, CreateTaskData, UpdateTaskData, DummyJSONResponse, ApiError } from '../types';

const API_BASE_URL = 'https://dummyjson.com';

class ApiError extends Error {
  status?: number;
  
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new ApiError(`API Error: ${response.statusText}`, response.status);
  }
  
  return response.json();
}

export const taskApi = {
  // Fetch all tasks
  async getTasks(): Promise<Task[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`);
      const data: DummyJSONResponse<Task> = await handleResponse(response);
      return data.todos;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Fetch a specific task
  async getTask(id: number): Promise<Task> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`);
      return await handleResponse<Task>(response);
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error);
      throw error;
    }
  },

  // Create a new task
  async createTask(taskData: CreateTaskData): Promise<Task> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todo: taskData.todo,
          completed: taskData.completed || false,
          userId: taskData.userId || 1,
        }),
      });
      return await handleResponse<Task>(response);
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update a task
  async updateTask(id: number, taskData: UpdateTaskData): Promise<Task> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      return await handleResponse<Task>(response);
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
      throw error;
    }
  },

  // Delete a task
  async deleteTask(id: number): Promise<Task> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      return await handleResponse<Task>(response);
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error);
      throw error;
    }
  },
};

// Mock API for local dev when backend isn't running
import type { Task } from '@/types/models';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const mockTasks: Task[] = [
  { id: '1', name: 'Sample Task', owner: 'admin', command: 'echo Hello', taskExecutions: [] },
  { id: '2', name: 'Demo Task', owner: 'user1', command: 'echo World', taskExecutions: [] }
];

export const mockApi = {
  async getTasks(name?: string): Promise<Task[]> {
    await delay(300);
    if (!name) return mockTasks;
    return mockTasks.filter((t) => t.name.toLowerCase().includes(name.toLowerCase()));
  },
  async createTask(data: Omit<Task, 'taskExecutions'>): Promise<Task> {
    await delay(500);
    const newTask: Task = {
      ...data,
      taskExecutions: []
    };
    mockTasks.push(newTask);
    return newTask;
  },
  async deleteTask(id: string): Promise<void> {
    await delay(300);
    const idx = mockTasks.findIndex((t) => t.id === id);
    if (idx >= 0) mockTasks.splice(idx, 1);
  }
};

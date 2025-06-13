import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@/types';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const getInitialTasks = (): Task[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('tasks');
    if (stored) return JSON.parse(stored);
  }
  return [];
};

const initialState: TaskState = {
  tasks: getInitialTasks(),
  loading: false,
  error: null,
};

const persistTasks = (tasks: Task[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      persistTasks(state.tasks);
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      persistTasks(state.tasks);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        persistTasks(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      persistTasks(state.tasks);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setTasks, 
  addTask, 
  updateTask, 
  deleteTask, 
  setLoading, 
  setError 
} = taskSlice.actions;

export default taskSlice.reducer; 
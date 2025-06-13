import { configureStore } from '@reduxjs/toolkit';
import taskReducer, {
  addTask,
  updateTask,
  deleteTask,
  setTasks
} from '../store/taskSlice';
import { Task, Status } from '../types';

interface RootState {
  tasks: {
    tasks: Task[];
    loading: boolean;
    error: string | null;
  };
}

describe('Task Slice', () => {
  let store: ReturnType<typeof configureStore<RootState>>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        tasks: taskReducer
      }
    });
  });

  it('should handle initial state', () => {
    expect(store.getState().tasks.tasks).toEqual([]);
  });

  it('should handle creating a new task', () => {
    const newTask: Task = {
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      status: Status.OPEN,
    };

    store.dispatch(addTask(newTask));
    const state = store.getState().tasks;
    expect(state.tasks).toHaveLength(1);
    expect(state.tasks[0]).toEqual(newTask);
  });

  it('should handle updating a task', () => {
    const task: Task = {
      id: '1',
      title: 'Original Task',
      description: 'Original Description',
      status: Status.OPEN,
    };

    store.dispatch(addTask(task));

    const updatedTask: Task = {
      ...task,
      title: 'Updated Task',
      description: 'Updated Description',
      status: Status.DONE
    };

    store.dispatch(updateTask(updatedTask));
    const state = store.getState().tasks;
    expect(state.tasks[0]).toEqual(updatedTask);
  });

  it('should handle deleting a task', () => {
    const task: Task = {
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      status: Status.OPEN,
    };

    store.dispatch(addTask(task));
    expect(store.getState().tasks.tasks).toHaveLength(1);

    store.dispatch(deleteTask('1'));
    expect(store.getState().tasks.tasks).toHaveLength(0);
  });

  it('should handle setting multiple tasks', () => {
    const tasks: Task[] = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Description 1',
        status: Status.OPEN,
      },
      {
        id: '2',
        title: 'Task 2',
        description: 'Description 2',
        status: Status.DONE,
      }
    ];

    store.dispatch(setTasks(tasks));
    const state = store.getState().tasks;
    expect(state.tasks).toHaveLength(2);
    expect(state.tasks).toEqual(tasks);
  });
}); 
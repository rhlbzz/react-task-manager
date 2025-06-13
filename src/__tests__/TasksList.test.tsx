import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../store/taskSlice';
import TasksList from '../components/task/TasksList';
import { Status, Task } from '../types';

const createMockStore = (initialTasks: Task[] = []) => {
  return configureStore({
    reducer: {
      tasks: taskReducer
    },
    preloadedState: {
      tasks: {
        tasks: initialTasks,
        loading: false,
        error: null
      }
    }
  });
};

describe('TasksList', () => {
  const mockTasks: Task[] = [
    {
      id: 'task-1',
      title: 'Task 1',
      description: 'Description 1',
      status: Status.OPEN
    },
    {
      id: 'task-2',
      title: 'Task 2',
      description: 'Description 2',
      status: Status.DONE
    }
  ];

  it('should render list of tasks', () => {
    const store = createMockStore(mockTasks);
    
    render(
      <Provider store={store}>
        <TasksList />
      </Provider>
    );

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('should delete task when close button is clicked', () => {
    const store = createMockStore(mockTasks);
    
    render(
      <Provider store={store}>
        <TasksList />
      </Provider>
    );

    const closeButtons = screen.getAllByText(/close/i);
    fireEvent.click(closeButtons[0]); // Click close button for first task

    // Check if task was deleted from store
    const state = store.getState();
    expect(state.tasks.tasks).toHaveLength(1);
    expect(state.tasks.tasks[0].id).toBe('task-2');
  });

  it('should complete task when complete button is clicked', () => {
    const store = createMockStore(mockTasks);
    
    render(
      <Provider store={store}>
        <TasksList />
      </Provider>
    );

    const completeButton = screen.getByText(/complete/i);
    fireEvent.click(completeButton);

    // Check if task status was updated in store
    const state = store.getState();
    expect(state.tasks.tasks[0].status).toBe(Status.DONE);
  });

  it('should not show complete button for completed tasks', () => {
    const store = createMockStore(mockTasks);
    
    render(
      <Provider store={store}>
        <TasksList />
      </Provider>
    );

    const completeButtons = screen.getAllByText(/complete/i);
    expect(completeButtons).toHaveLength(1); // Only one task is OPEN
  });
}); 
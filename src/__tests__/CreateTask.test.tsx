import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../store/taskSlice';
import CreateTask from '../components/form/CreateTask';
import { Status } from '../types';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

const createMockStore = () => {
  return configureStore({
    reducer: {
      tasks: taskReducer
    }
  });
};

describe('CreateTask', () => {
  it('should create a new task when form is submitted', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <CreateTask />
      </Provider>
    );

    // Fill in the form
    const titleInput = screen.getByLabelText(/task title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByText(/create task/i);

    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
    fireEvent.click(submitButton);

    // Check if task was added to store
    const state = store.getState();
    expect(state.tasks.tasks).toHaveLength(1);
    expect(state.tasks.tasks[0]).toMatchObject({
      title: 'New Task',
      description: 'New Description',
      status: Status.OPEN
    });
  });

  it('should not submit form with empty fields', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <CreateTask />
      </Provider>
    );

    const submitButton = screen.getByText(/create task/i);
    fireEvent.click(submitButton);

    // Form should not submit and store should remain empty
    const state = store.getState();
    expect(state.tasks.tasks).toHaveLength(0);
  });
}); 
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../store/taskSlice';
import EditTask from '../components/form/EditTask';
import { Status, Task } from '../types';

// Mock the modal context
jest.mock('../components/modal/ModalComponent', () => ({
  useModal: () => ({
    close: jest.fn()
  })
}));

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

describe('EditTask', () => {
  const mockTask: Task = {
    id: 'task-1',
    title: 'Original Task',
    description: 'Original Description',
    status: Status.OPEN
  };

  it('should update task when form is submitted', () => {
    const store = createMockStore([mockTask]);
    
    render(
      <Provider store={store}>
        <EditTask id={mockTask.id} />
      </Provider>
    );

    // Fill in the form
    const titleInput = screen.getByLabelText(/task title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const statusSelect = screen.getByLabelText(/status/i);
    const submitButton = screen.getByText(/confirm/i);

    fireEvent.change(titleInput, { target: { value: 'Updated Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Updated Description' } });
    fireEvent.change(statusSelect, { target: { value: Status.DONE } });
    fireEvent.click(submitButton);

    // Check if task was updated in store
    const state = store.getState();
    expect(state.tasks.tasks).toHaveLength(1);
    expect(state.tasks.tasks[0]).toMatchObject({
      id: mockTask.id,
      title: 'Updated Task',
      description: 'Updated Description',
      status: Status.DONE
    });
  });

  it('should not update task if form is submitted with empty fields', () => {
    const store = createMockStore([mockTask]);
    
    render(
      <Provider store={store}>
        <EditTask id={mockTask.id} />
      </Provider>
    );

    const titleInput = screen.getByLabelText(/task title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByText(/confirm/i);

    // Clear the fields
    fireEvent.change(titleInput, { target: { value: '' } });
    fireEvent.change(descriptionInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    // Task should remain unchanged
    const state = store.getState();
    expect(state.tasks.tasks).toHaveLength(1);
    expect(state.tasks.tasks[0]).toEqual(mockTask);
  });

  it('should not update if task does not exist', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <EditTask id="non-existent" />
      </Provider>
    );

    const submitButton = screen.getByText(/confirm/i);
    fireEvent.click(submitButton);

    // Store should remain empty
    const state = store.getState();
    expect(state.tasks.tasks).toHaveLength(0);
  });
}); 
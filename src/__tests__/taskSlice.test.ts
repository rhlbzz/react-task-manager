import taskReducer, { addTask, updateTask, deleteTask } from '../store/taskSlice';
import { Status } from '../types';

describe('taskSlice', () => {
  const initialState = {
    tasks: [],
    loading: false,
    error: null
  };

  const mockTask = {
    id: 'task-1',
    title: 'Test Task',
    description: 'Test Description',
    status: Status.OPEN
  };

  describe('addTask', () => {
    it('should add a new task to the state', () => {
      const nextState = taskReducer(initialState, addTask(mockTask));
      expect(nextState.tasks).toHaveLength(1);
      expect(nextState.tasks[0]).toEqual(mockTask);
    });
  });

  describe('updateTask', () => {
    it('should update an existing task', () => {
      const state = {
        ...initialState,
        tasks: [mockTask]
      };

      const updatedTask = {
        ...mockTask,
        title: 'Updated Title',
        description: 'Updated Description',
        status: Status.DONE
      };

      const nextState = taskReducer(state, updateTask(updatedTask));
      expect(nextState.tasks).toHaveLength(1);
      expect(nextState.tasks[0]).toEqual(updatedTask);
    });

    it('should not update if task does not exist', () => {
      const state = {
        ...initialState,
        tasks: [mockTask]
      };

      const nonExistentTask = {
        ...mockTask,
        id: 'non-existent',
        title: 'Updated Title'
      };

      const nextState = taskReducer(state, updateTask(nonExistentTask));
      expect(nextState.tasks).toHaveLength(1);
      expect(nextState.tasks[0]).toEqual(mockTask);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task by id', () => {
      const state = {
        ...initialState,
        tasks: [mockTask]
      };

      const nextState = taskReducer(state, deleteTask(mockTask.id));
      expect(nextState.tasks).toHaveLength(0);
    });

    it('should not delete if task id does not exist', () => {
      const state = {
        ...initialState,
        tasks: [mockTask]
      };

      const nextState = taskReducer(state, deleteTask('non-existent'));
      expect(nextState.tasks).toHaveLength(1);
      expect(nextState.tasks[0]).toEqual(mockTask);
    });
  });
}); 
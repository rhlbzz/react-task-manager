'use client';

import React, { useEffect, useState } from 'react';
import StatusComponent from '../ui/StatusComponent';
import CtaComponent from '../ui/CtaComponent';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteTask, updateTask } from '../../store/taskSlice';
import { Task, Status } from '@/src/types';

const TasksList: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks.tasks);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCloseTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleCompleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const updatedTask: Task = {
      ...task,
      status: Status.DONE
    };
    dispatch(updateTask(updatedTask));
  };

  if (!isMounted) {
    return null; // Return null on server-side and first render
  }

  return (
    <div>
      <h1 className={`font-bold text-2xl mb-2 ${tasks && tasks.length > 0 ? 'mb-2' : 'text-center'}`}>{tasks && tasks.length > 0 ? 'Your tasks:' : 'You don\'t have any tasks!'}</h1>
      { tasks && tasks.length > 0 && <hr /> } 
      {tasks && tasks.length > 0 ? (
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border-b border-gray-300 w-[50%]">Title</th>
              <th className="text-left px-4 py-2 border-b border-gray-300 whitespace-nowrap w-[20%]">Status</th>
              <th className="text-left px-4 py-2 border-b border-gray-300 whitespace-nowrap w-[30%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{task.title}</td>
                <td className="px-4 py-2">
                  <StatusComponent status={task.status} />
                </td>
                <td className="px-4 py-2">
                  <div className="flex flex-wrap gap-2">
                    {task.status === Status.OPEN && (
                      <CtaComponent
                        text="Complete"
                        className="text-sm"
                        variant="primary"
                        onClickCallback={() => handleCompleteTask(task.id)}
                      />
                    )}
                    <CtaComponent
                      text="View"
                      className="text-sm"
                      variant="tertiary"
                      href={`task/${task.id}`}
                    />
                    <CtaComponent
                      text="Close"
                      className="text-sm"
                      variant="secondary"
                      onClickCallback={() => handleCloseTask(task.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TasksList;
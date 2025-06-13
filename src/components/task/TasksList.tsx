'use client';

import React from 'react';
import StatusComponent from '../ui/StatusComponent';
import CtaComponent from '../ui/CtaComponent';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteTask } from '../../store/taskSlice';

const TasksList: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks.tasks);

  const handleCloseTask = (id: string) => {
    dispatch(deleteTask(id));
    localStorage.setItem('tasks', JSON.stringify(tasks.filter(task => task.id !== id)));
  };

  return (
    tasks && tasks.length !== 0 ? (
    <>
    <h1 className="font-bold text-2xl">Tasks</h1>
    <hr />
    <div className='grid grid-cols-3'>
      {
        tasks.map((task) => (
          <React.Fragment key={task.id}>
            <div className="col-span-1 py-1 flex items-center">
              <p className='p1'>{task.title}</p>
            </div>
            <div className="col-span-1 py-1 text-center">
              <StatusComponent status={task.status} />
            </div>
            <div className="col-span-1 py-1 text-right">
              <CtaComponent text="View" className="mx-auto mr-1" variant="tertiary" href={`task/${task.id}`} />
              <CtaComponent text="Complete" className="mx-auto ml-1" variant="secondary" onClickCallback={() => (handleCloseTask(task.id))}/>
            </div>
          </React.Fragment>
        ))
      }
    </div>
    </>
    ) : (<></>)
  );
};

export default TasksList;
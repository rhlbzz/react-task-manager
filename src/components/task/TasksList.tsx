'use client';

import React from 'react';
import StatusComponent from '../ui/StatusComponent';
import CtaComponent from '../ui/CtaComponent';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteTask, updateTask } from '../../store/taskSlice';
import { Task, Status } from '@/src/types';

const TasksList: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks.tasks);

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
              <div className={`grid gap-2 ${task.status === Status.DONE ? 'grid-cols-2' : 'grid-cols-3'}`}>
                 { task.status === Status.OPEN && <CtaComponent text="Complete" className="mx-auto mr-1" variant="primary" onClickCallback={() => (handleCompleteTask(task.id))}/> }
                <CtaComponent text="View" className="mx-auto" variant="tertiary" href={`task/${task.id}`} />
                <CtaComponent text="Close" className="mx-auto" variant="secondary" onClickCallback={() => (handleCloseTask(task.id))}/>
              </div>
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
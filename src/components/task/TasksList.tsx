
'use client';

import React, { useEffect, useState }  from 'react';
import StatusComponent from '../ui/StatusComponent';
import CtaComponent from '../ui/CtaComponent';
import { Task } from '@/types';


const TasksList: React.FC = () => {
  
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);

   useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  const handleCloseTask = (id: string) => {
    if (!tasks) return;
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
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
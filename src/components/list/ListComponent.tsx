
'use client';

import React, { useEffect, useState }  from 'react';
import StatusComponent from '../ui/StatusComponent';
import CtaComponent from '../ui/CtaComponent';


const ListComponent: React.FC = () => {
  
  const [tasks, setTasks] = useState([]);

   useEffect(() => {
    // Questo codice gira solo nel client (dopo il mount)
    const stored = localStorage.getItem('tasks');
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  return (
    tasks && tasks.length !== 0 ? (
    <>
    <h1 className="font-bold text-2xl">Tasks</h1>
    <hr />
    <div className='grid grid-cols-3'>
      {
        tasks.map((task) => (
          <React.Fragment key={task.id}>
            <div className="col-span-1">
              <p className='text-md'>{task.title}</p>
            </div>
            <div className="col-span-1 text-center">
              <StatusComponent status={task.status} />
            </div>
            <div className="col-span-1">
              <CtaComponent text="Edit" className="mx-auto p-2" variant="tertiary"/>
              <CtaComponent text="Close" className="mx-auto p-2" variant="secondary"/>
            </div>
          </React.Fragment>
        ))
      }
    </div>
    </>
    ) : (<></>)
  );
};
export default ListComponent;
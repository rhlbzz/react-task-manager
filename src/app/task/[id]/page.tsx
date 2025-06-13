'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/src/store/hooks';
import { Task } from '@/src/types';
import CtaComponent from '@/src/components/ui/CtaComponent';
import StatusComponent from '@/src/components/ui/StatusComponent';

interface PageProps {
  params: {
    id: string;
  };
}

const TaskPage: React.FC<PageProps> = ({ params }) => {
  const [task, setTask] = useState<Task | null>(null);
  const tasks = useAppSelector(state => state.tasks.tasks);

  useEffect(() => {
    if (params?.id) {
      const foundTask = tasks.find(t => t.id === params.id);
      setTask(foundTask || null);
    }
  }, [params?.id, tasks]);

  if (!task) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center">Task not found</h1>
        <div className="mt-4 text-center">
          <CtaComponent
            text="Back to Tasks"
            href="/"
            variant="primary"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{task.title}</h1>
          <StatusComponent status={task.status} />
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-gray-700">{task.description}</p>
        </div>

        <div className="flex gap-4">
          <CtaComponent
            text="Back to Tasks"
            href="/"
            variant="secondary"
          />
          {task.status === 'OPEN' && (
            <CtaComponent
              text="Edit Task"
              href={`/task/${task.id}/edit`}
              variant="primary"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskPage; 
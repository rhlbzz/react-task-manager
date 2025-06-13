'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TaskItemProps {
   id: string
}
const CtaComponent: React.FC<TaskItemProps> = ({ id }) => {
  const router = useRouter();
  const [task, setTask] = useState(null);
  console.log('Task ID:', id);
  useEffect(() => {
  // Questo codice gira solo nel client (dopo il mount)
  const stored = localStorage.getItem('tasks');
  if (stored) {
    console.log('Stored tasks:', JSON.parse(stored));
    const tasks = JSON.parse(stored); 
    setTask(tasks.find((task: any) => task.id === id));
  } else router.push('/');
}, []);
  return (
    <div className="container mx-auto p-4">
      {
      task ? (
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{task.title}</h1>
          <p className="text-gray-700">{task.description}</p>
          <p className="text-sm text-gray-500">Status: {task.status}</p>
        </div>
      ) : (
        <h1 className="text-3xl text-center">Task not found</h1>
      )}
    </div>
  );

};

export default CtaComponent;

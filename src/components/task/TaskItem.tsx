'use client';

import { Task } from "@/types";
import { useEffect, useState } from "react";
import StatusComponent from "../ui/StatusComponent";
import CtaComponent from "../ui/CtaComponent";
import { useModal } from "../modal/ModalComponent";
import EditTask from "../form/EditTask";

interface TaskItemProps {
   id: string
}
const TaskItem: React.FC<TaskItemProps> = ({ id }) => {
  const { open } = useModal();
  const [task, setTask] = useState<Task | undefined>(undefined);
  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      const tasks = JSON.parse(stored) as Task[]; 
      setTask(tasks.find((task: Task) => task.id === id));
    }
  }, [id]);

  // Add event listener for task updates
  useEffect(() => {
    const handleTaskUpdate = () => {
      const stored = localStorage.getItem('tasks');
      if (stored) {
        const tasks = JSON.parse(stored) as Task[];
        setTask(tasks.find((task: Task) => task.id === id));
      }
    };

    window.addEventListener('taskUpdated', handleTaskUpdate);
    return () => window.removeEventListener('taskUpdated', handleTaskUpdate);
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      {
      task ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{task.title}</h1>
            <StatusComponent status={task.status}/>
          </div>
          <p className="text-gray-700">{task.description}</p>
          <CtaComponent
            text="Edit" 
            variant="tertiary" 
            className="mt-4"
            onClickCallback={()=> (open(
              <EditTask id={task.id} />
            ))}
          />
        </div>
      ) : (
        <h1 className="text-3xl text-center">
          <span className="font-black">404</span>
          <br/> 
          Task not found
        </h1>
      )}
    </div>
  );

};

export default TaskItem;

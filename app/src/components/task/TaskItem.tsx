'use client';

import { useEffect, useState } from 'react';
import StatusComponent from "../ui/StatusComponent";
import CtaComponent from "../ui/CtaComponent";
import { useModal } from "../modal/ModalComponent";
import EditTask from "../form/EditTask";
import { useAppSelector } from "../../store/hooks";
import { Task } from "../../types";

interface TaskItemProps {
   id: string
}

const TaskItem: React.FC<TaskItemProps> = ({ id }) => {
  const { open } = useModal();
  const tasks = useAppSelector(state => state.tasks.tasks);
  const [task, setTask] = useState<Task | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const foundTask = tasks.find(t => t.id === id);
    setTask(foundTask);
  }, [id, tasks]);

  if (!isClient) {
    return (
      <div className="container mx-auto p-4">
        <div className="space-y-4">
          <h1 className="text-4xl">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {
      task ? (
        <div className="space-y-4">
          <h1 className="text-4xl">Task Details</h1>
          <hr />
          <div className="flex items-center justify-between">
            <h1 className="text-3xl"><span className="italic">Title:</span> <span className="font-bold">{task.title}</span></h1>
            <StatusComponent status={task.status}/>
          </div>
          <p className="text-gray-700"><span className="italic">Description</span>: {task.description}</p>
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

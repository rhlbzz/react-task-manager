'use client';

import { Task } from "@/types";
import { useEffect, useState } from "react";
import CtaComponent from "../ui/CtaComponent";
import { useModal } from "../modal/ModalComponent";

interface EditTaskProps {
   id: string
}
const EditTask: React.FC<EditTaskProps> = ({ id }) => {
  const { close } = useModal();
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);
  const [task, setTask] = useState<Task | undefined>(undefined);
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');

  
  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (!stored) return;
    setTasks(JSON.parse(stored));
    if (!tasks) return;
    setTask(tasks.find((task: Task) => task.id === id));
    if (!task) return;
    setTitle(task.title);
    setDescription(task.description);
  }, [id]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!tasks) return
      const updatedTasks = tasks.map((t) => {
        if (t.id === id) {
          return { ...t, title, description };
        }
        return t;
      });
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('taskUpdated'));
      close();
    };

  return (
    <div className="container mx-auto p-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Task Title</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            required 
            className="mt-1 block w-full border-gray-950 rounded-md shadow-sm" 
            value={title}
            onChange={(e) => (setTitle(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            id="description" 
            name="description" 
            rows={4} 
            required 
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" 
            value={description}
            onChange={(e) => (setDescription(e.target.value))}
          ></textarea>
        </div>
        <CtaComponent
          text="Confirm" 
          variant="primary" 
          className="mt-4"
        />
      </form>
    </div>
  );

};

export default EditTask;

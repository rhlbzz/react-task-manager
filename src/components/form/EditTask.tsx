'use client';

import { Task } from "@/types";
import { useEffect, useState } from "react";
import CtaComponent from "../ui/CtaComponent";
import { useModal } from "../modal/ModalComponent";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateTask } from "../../store/taskSlice";

interface EditTaskProps {
   id: string
}

const EditTask: React.FC<EditTaskProps> = ({ id }) => {
  const { close } = useModal();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks.tasks);
  const task = tasks.find(t => t.id === id);
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task) return;
    const updatedTask: Task = {
      ...task,
      title,
      description
    };
    dispatch(updateTask(updatedTask));
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
          action='submit'
        />
      </form>
    </div>
  );
};

export default EditTask;

'use client';
import React, { useState, useEffect } from 'react';
import CtaComponent from '../ui/CtaComponent';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '../../store/hooks';
import { addTask } from '../../store/taskSlice';
import { Task, Status } from '../../types';

const CreateTask: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isClient) return;
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      description,
      status: Status.OPEN
    };
    dispatch(addTask(newTask));
    setTitle(''); 
    setDescription('');
    router.push('/');
  };

  if (!isClient) return null;

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          required 
          className="mt-1 block w-full border-b-[1px] border-gray-300 focus:outline-none focus:border-gray-400" 
          value={title}
          onChange={(e) => (setTitle(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea 
          id="description" 
          name="description" 
          rows={4} 
          required 
          className="mt-1 block w-full border-b-[1px] border-gray-300 focus:outline-none focus:border-gray-400" 
          value={description}
          onChange={(e) => (setDescription(e.target.value))}
        ></textarea>
      </div>
      <div>
        <CtaComponent
          text="Create Task"
          variant="primary"
          action='submit'
        />
      </div>
    </form>
  );
};
export default CreateTask;
'use client';
import React, { useState, useEffect } from 'react';
import CtaComponent from '../ui/CtaComponent';
import { Status } from '@/contants';
import { useRouter } from 'next/navigation';

const CreateTaks: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isClient) return;
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const newTask = {
      id: `task-${storedTasks.length + 1}`,
      title,
      description,
      status: Status.OPEN
    };
    const updatedTasks = [...storedTasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTitle(''); 
    setDescription('');
    router.push('/');
  };

  if (!isClient) return null;

  return (
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
export default CreateTaks;
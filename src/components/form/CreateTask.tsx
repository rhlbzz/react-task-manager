'use client';
import React, { useState } from 'react';
import CtaComponent from '../ui/CtaComponent';


const CreateTaks: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Recupera i task esistenti o crea array vuoto
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const newTask = {
      id: `task-${storedTasks.length + 1}`,
      title,
      description,
      status: 'open',
    };

    // Aggiungi il nuovo task
    const updatedTasks = [...storedTasks, newTask];

    // Salva in localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Reset dei campi (opzionale)
    setTitle('');
    setDescription('');
    console.log('Task created:', newTask);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Task Title</label>
        <input type="text" id="title" name="title" required className="mt-1 block w-full border-gray-950 rounded-md shadow-sm" onChange={(e) => (setTitle(e.target.value))}/>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea id="description" name="description" rows={4} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" onChange={(e) => (setDescription(e.target.value))}></textarea>
      </div>
      <div>
        <CtaComponent
          text="Create Task"
          variant="primary"
        />
      </div>
    </form>
  );
};
export default CreateTaks;
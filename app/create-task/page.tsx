'use client';

import CreateTaskForm from '@/src/components/form/CreateTask';
import React from 'react';

export default function CreateTask() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">New Task</h1>
      <CreateTaskForm />
    </div>
  );
}

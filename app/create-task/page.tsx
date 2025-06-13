'use client';

import CreateTask from '../src/components/form/CreateTask';
import React from 'react';

export default function CreateTaskPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">New Task</h1>
      <CreateTask />
    </div>
  );
}

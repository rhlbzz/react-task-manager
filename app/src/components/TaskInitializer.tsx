'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setTasks } from '../store/taskSlice';
import { Task } from '../types';

export default function TaskInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      const tasks = JSON.parse(stored) as Task[];
      dispatch(setTasks(tasks));
    }
  }, [dispatch]);

  return null;
} 
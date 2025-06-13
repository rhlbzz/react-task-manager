export type STATUS = 'OPEN' | 'CLOSE';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: STATUS;
};
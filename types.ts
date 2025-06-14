export enum Status {
  OPEN = 'open',
  DONE = 'done',
  CLOSE = 'close'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status.OPEN | Status.DONE | Status.CLOSE;
} 
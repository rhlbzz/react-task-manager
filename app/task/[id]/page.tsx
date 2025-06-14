import TaskItem from '../../src/components/task/TaskItem';
import { store } from '../../src/store/store';

interface TaskPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const tasks = store.getState().tasks.tasks;
  
  return tasks.map((task) => ({
    id: task.id,
  }));
}

export default function TaskPage({ params }: TaskPageProps) {
  const { id } = params;

  return (
    <>
      <TaskItem id={id} />
    </>
  );
}

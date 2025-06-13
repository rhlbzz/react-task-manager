import TaskItem from '../../../src/components/task/TaskItem';

interface TaskPageProps {
  params: { id: string };
}

export default async function TaskPage({ params }: TaskPageProps) {
  const { id } = params;
  
  return (
  <>
    <TaskItem id={id} />
  </>
  );
}

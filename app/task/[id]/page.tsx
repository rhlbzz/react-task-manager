import TaskItem from '../../src/components/task/TaskItem';

interface TaskPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [];
}

export default async function TaskPage({ params }: TaskPageProps) {
  const { id } = await params;

  return (
    <>
      <TaskItem id={id} />
    </>
  );
}

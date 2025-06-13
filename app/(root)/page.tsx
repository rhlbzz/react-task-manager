import TasksList from "../../src/components/task/TasksList";
import CtaComponent from "../../src/components/ui/CtaComponent";


export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to your Tasks Manager!</h1>
      <CtaComponent 
        text="Create Task"
        variant="primary" 
        href="/create-task"
      />
      </div>
      <TasksList />
    </div>
  );
}

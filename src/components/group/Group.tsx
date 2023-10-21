import { Task } from '@/components/task/Task';
import { TASKS } from '@/constants/task';
import { Group } from '@/types/api';

export function Group(props: { group: Group }) {
  const tasksOfGroup = TASKS.filter((task) => task.group === props.group.id);
  // TODO: Sort by dependencies
  const tasksSorted = tasksOfGroup;

  return (
    <section>
      <h2 className="font-bold mb-2">{props.group.label}</h2>
      <ol>
        {tasksSorted.map((task) => (
          <li key={task.id}>
            <Task task={task} />
          </li>
        ))}
      </ol>
    </section>
  );
}

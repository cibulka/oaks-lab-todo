import { Task } from '@/components/task/Task';
import { TASKS } from '@/constants/task';
import { useAppContext } from '@/context/App.context';
import { Group } from '@/types/api';

export function Group(props: { group: Group }) {
  const tasksOfGroup = TASKS.filter((task) => task.group === props.group.id);
  // TODO: Sort by dependencies
  const tasksSorted = tasksOfGroup;

  const { state } = useAppContext();
  const isGroupCompleted =
    tasksOfGroup.map((t) => t.id).filter((id) => !state.completed.includes(id)).length === 0;

  return (
    <section>
      <div className="flex items-center gap-2 mb-2">
        <h2 className="font-bold">{props.group.label}</h2>
        {isGroupCompleted && <span className="text-xl">🎉</span>}
      </div>
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

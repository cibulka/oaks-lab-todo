import { useState } from 'react';

import { Modal } from '@/components/modal/Modal';
import { useAppContext } from '@/context/App.context';
import { ACTION } from '@/context/App.actionTypes';
import { TASKS } from '@/constants/task';
import { IconBriefcase } from '@/icons/IconBriefcase';
import { Task } from '@/types/api';
import { getArrayIntersection } from '@/utils/array';

export function Task(props: { task: Task }) {
  const [isConfirmModal, setIsConfirmModal] = useState(false);

  const { state, dispatch } = useAppContext();
  const isCompleted = state.completed.includes(props.task.id);
  const isDisabled = props.task.blockers.filter((id) => !state.completed.includes(id)).length > 0;
  const isCanceled = isDisabled && isCompleted;
  const canceledTaskIds = getArrayIntersection(
    TASKS.filter((t) => t.blockers.includes(props.task.id)).map((task) => task.id),
    state.completed,
  );

  function onCancel() {
    dispatch({ type: ACTION.TASK_CANCELLED, payload: props.task.id });
  }

  function onChange() {
    if (isCompleted) {
      if (canceledTaskIds.length > 0) {
        setIsConfirmModal(true);
      } else {
        onCancel();
      }
    } else {
      dispatch({ type: ACTION.TASK_COMPLETED, payload: props.task.id });
    }
  }

  function onCloseModal() {
    setIsConfirmModal(false);
  }

  return (
    <>
      <label
        className={['flex items-center gap-3', isCanceled && 'text-red-500']
          .filter(Boolean)
          .join(' ')}
      >
        {state.isLocalStorageReady ? (
          <input
            type="checkbox"
            checked={isCompleted}
            disabled={isCanceled || isDisabled}
            onChange={onChange}
          />
        ) : (
          <span>⏳</span>
        )}
        <span className={isCompleted ? 'line-through' : undefined}>{props.task.label}</span>
      </label>
      {isConfirmModal && (
        <Modal
          onClose={onCloseModal}
          title={
            <>
              Cancel <strong>{props.task.label}</strong>?
            </>
          }
        >
          <div className="flex flex-col py-2">
            <p className="text-2xl leading-normal mb-4">
              The task <strong>{props.task.label}</strong> is a blocker for the following tasks:
            </p>
            <ul className="border-t border-b border-dashed py-2">
              {canceledTaskIds.map((taskId) => {
                const task = TASKS.find((task) => task.id === taskId);
                return (
                  <li key={taskId} className="flex items-center gap-2">
                    <span className="w-6 h-6 -mt-0.5 text-neutral-600">
                      <IconBriefcase />
                    </span>
                    {task ? task.label : 'Unknown task'}
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-8 mt-6">
              <button
                type="button"
                className="bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  onCancel();
                  onCloseModal();
                }}
              >
                Yes, cancel the task
              </button>
              <button className="text-blue-500 underline" type="button" onClick={onCloseModal}>
                No, go back
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

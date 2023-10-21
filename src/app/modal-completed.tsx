import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

import { Modal } from '@/components/modal/Modal';
import { TASKS } from '@/constants/task';
import { useAppContext } from '@/context/App.context';
import { Fact } from '@/types/api';
import { API } from '@/constants/api';
import { STATE } from '@/constants/state';
import { State } from '@/types/state';

export function ModalCompleted() {
  const [fetchState, setFetchState] = useState<State>(STATE.IDLE);
  const [fact, setFact] = useState<Fact | null>(null);

  const { state } = useAppContext();
  const tasksUnfinished = TASKS.filter((task) => !state.completed.includes(task.id));
  const isAllFinished = tasksUnfinished.length === 0;
  const [isModalOpened, setIsModalOpened] = useState(tasksUnfinished.length === 0);

  useEffect(() => {
    if (isAllFinished) setIsModalOpened(isAllFinished);
  }, [isAllFinished]);

  useEffect(() => {
    setFetchState(STATE.LOADING);
    fetch(API.USELESS_FACT)
      .then((res) => res.json())
      .then((res) => {
        setFact(res);
        setFetchState(STATE.SUCCESS);
      })
      .catch(() => setFetchState(STATE.FAILURE));
  }, []);

  return isModalOpened ? (
    <>
      <Confetti />
      <Modal onClose={() => setIsModalOpened(false)} title="🎉 Yay!">
        <p className="text-xl">
          All your tasks are finished! {`You're`} ready to change the world now.
        </p>
        {fetchState !== STATE.FAILURE && (
          <p className="mt-4 pt-2 border-t text-sm">
            {fact && fetchState === STATE.SUCCESS ? (
              <>
                <strong>Did you know that</strong>
                {` `}
                {fact?.text.toLocaleLowerCase().replace(/\.$/, '') + '?'}
              </>
            ) : (
              <span className="animate-pulse">Loading ...</span>
            )}
          </p>
        )}
      </Modal>
    </>
  ) : null;
}

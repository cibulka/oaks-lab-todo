'use client';

import { Group } from '@/components/group/Group';
import { GROUPS } from '@/constants/task';
import { AppContextWrap } from '@/context/App.context';

import { ModalCompleted } from './modal-completed';

export default function Home() {
  return (
    <AppContextWrap>
      <section>
        <h1 className="text-4xl font-bold mb-4">My startup progress</h1>
        <ol className="flex flex-col gap-4">
          {GROUPS.map((group) => (
            <li key={group.id}>
              <Group group={group} />
            </li>
          ))}
        </ol>
      </section>
      <ModalCompleted />
    </AppContextWrap>
  );
}

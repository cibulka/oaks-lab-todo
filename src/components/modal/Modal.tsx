import { PropsWithChildren } from 'react';
import { Dialog } from '@headlessui/react';
import { IconX } from '@/icons/IconX';

export function Modal(
  props: PropsWithChildren & { onClose: () => void; title: string | JSX.Element },
) {
  return (
    <Dialog open onClose={props.onClose}>
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="fixed z-10 inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-white">
          <div className="flex items-center justify-between gap-4 border-b pl-4 pr-2">
            <Dialog.Title>{props.title}</Dialog.Title>
            <button type="button" onClick={props.onClose} className="text-red-500 w-8 h-8 p-1">
              <IconX />
            </button>
          </div>
          <div className="px-4 pt-2 pb-4">{props.children}</div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

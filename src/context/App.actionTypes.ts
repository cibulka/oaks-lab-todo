export const ACTION = {
  LOCAL_STORAGE_READY: 'LOCAL_STORAGE_READY',
  TASK_CANCELLED: 'TASK_CANCELLED',
  TASK_COMPLETED: 'TASK_COMPLETED',
} as const;

export type Action =
  | { type: typeof ACTION.LOCAL_STORAGE_READY; payload: number[] }
  | { type: typeof ACTION.TASK_CANCELLED; payload: number }
  | { type: typeof ACTION.TASK_COMPLETED; payload: number };

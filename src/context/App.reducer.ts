import { LOCAL_STORAGE_KEY } from '@/constants/local-storage';
import { ACTION, Action } from './App.actionTypes';
import { ContextValue } from './App.context';

function updateLocalStorage(payload: number[]) {
  if (window.localStorage) {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
  }
}

export function appReducer(state: ContextValue, action: Action): ContextValue {
  switch (action.type) {
    case ACTION.LOCAL_STORAGE_READY:
      return {
        ...state,
        isLocalStorageReady: true,
        completed: action.payload,
      };
    case ACTION.TASK_CANCELLED: {
      const newCompleted = state.completed.filter((id) => id !== action.payload);
      updateLocalStorage(newCompleted);
      return {
        ...state,
        completed: newCompleted,
      };
    }
    case ACTION.TASK_COMPLETED:
      const newCompleted = [...state.completed, action.payload];
      updateLocalStorage(newCompleted);
      return {
        ...state,
        completed: newCompleted,
      };
    default:
      return state;
  }
}

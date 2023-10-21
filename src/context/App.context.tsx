'use client';
import React, { PropsWithChildren, useContext, useEffect, useReducer } from 'react';

import { ACTION, Action } from './App.actionTypes';
import { appReducer } from './App.reducer';
import { LOCAL_STORAGE_KEY } from '@/constants/local-storage';

/* Types */

export type ContextValue = {
  completed: number[];
  isLocalStorageReady: boolean;
};

/* Context */

export const AppContext = React.createContext<{
  state: ContextValue;
  dispatch: React.Dispatch<Action>;
} | null>(null);

// TODO: Populate initial state from localStorage
// TODO: Save to localStorage (as side effect
export function AppContextWrap(props: PropsWithChildren) {
  const initialState = {
    isLocalStorageReady: false,
    completed: [],
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    let payload: number[];
    if (window.localStorage) {
      const value = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      payload = value ? (JSON.parse(value) as number[]) : [];
    } else {
      payload = [];
    }
    dispatch({ type: ACTION.LOCAL_STORAGE_READY, payload });
  }, [dispatch]);

  return <AppContext.Provider value={{ state, dispatch }}>{props.children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('No context found. Is the app wrapped with AppContextWrap?');
  return ctx;
}

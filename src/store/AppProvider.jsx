import { createContext, useReducer, useEffect } from 'react';
import { appReducer, initialState } from './reducer';

export const AppContext = createContext(null);

export default function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    if (!state.toast) return;
    const timer = setTimeout(() => {
      dispatch({ type: 'CLEAR_TOAST' });
    }, 2200);
    return () => clearTimeout(timer);
  }, [state.toast]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

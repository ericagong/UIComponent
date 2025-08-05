import {
  createContext,
  Dispatch,
  EventHandler,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from 'react';

import SnackbarsRoot from '@/components/snackbar/1_context/SnackbarsRoot';

type SnackbarProps = {
  id: string;
  children: ReactNode;
  isOpen: boolean;
  timeoutId: number | null;
  onMouseEnter?: EventHandler<any>;
  onMouseLeave?: EventHandler<any>;
};
type SnackbarAction = 'upsert' | 'remove';
type SnackbarsState = SnackbarProps[];

const SnackbarsContext = createContext<SnackbarsState>([]);
const SnackbarsSetContext = createContext<
  Dispatch<{ type: SnackbarAction; payload: Record<string, any> }>
>(() => {});

const DefaultSnackbar: SnackbarProps = {
  id: '',
  children: null,
  isOpen: true,
  timeoutId: null,
};

const snackbarsActionHandlers: Record<
  SnackbarAction,
  (state: SnackbarsState, payload: any) => SnackbarsState
> = {
  upsert: (state, payload: Partial<SnackbarProps>) => {
    if (!payload.id) return state;
    const existingSnackbar = state.find(
      (snackbar) => snackbar.id === payload.id,
    );
    if (existingSnackbar) {
      return state.map((snackbar) => {
        if (snackbar.id === payload.id) {
          return { ...snackbar, ...payload };
        }
        return snackbar;
      });
    }
    const newSnackbar = { ...DefaultSnackbar, ...payload };
    return [...state, newSnackbar];
  },
  remove: (state, id: { id: string }) => {
    if (!id.id) return state;
    const targetSnackbar = state.find((snackbar) => snackbar.id === id.id);
    if (!targetSnackbar) return state;
    return state.filter((snackbar) => snackbar.id !== id.id);
  },
};

const snackbarsReducer = (
  state: SnackbarsState,
  { type, payload }: { type: SnackbarAction; payload: Record<string, any> },
) => snackbarsActionHandlers[type](state, payload);

const SnackbarsContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(snackbarsReducer, []);

  return (
    <SnackbarsContext.Provider value={state}>
      <SnackbarsSetContext.Provider value={dispatch}>
        {children}
        <SnackbarsRoot />
      </SnackbarsSetContext.Provider>
    </SnackbarsContext.Provider>
  );
};

const TIMEOUT_DURATION = 3000;
const useSnackbars = () => useContext(SnackbarsContext);
const useSetSnackbar = () => {
  const dispatch = useContext(SnackbarsSetContext);

  const upsertSnackbar = useCallback(
    (id: string, children: ReactNode) => {
      const closeSnackbar = () => {
        dispatch({
          type: 'upsert',
          payload: { id, isOpen: false, timeoutId: null },
        });
      };

      const startAutoCloseTimer = () =>
        window.setTimeout(closeSnackbar, TIMEOUT_DURATION);

      const newSnackbar: SnackbarProps = {
        id,
        children,
        isOpen: true,
        timeoutId: startAutoCloseTimer(),
        onMouseEnter: () => {
          if (newSnackbar.timeoutId) {
            clearTimeout(newSnackbar.timeoutId);
          }
        },
        onMouseLeave: () => {
          newSnackbar.timeoutId = startAutoCloseTimer();
        },
      };

      dispatch({ type: 'upsert', payload: newSnackbar });
    },
    [dispatch],
  );

  const removeSnackbar = useCallback(
    (id: string) => {
      dispatch({ type: 'remove', payload: { id } });
    },
    [dispatch],
  );

  return {
    upsertSnackbar,
    removeSnackbar,
  };
};

export default SnackbarsContextProvider;
export { useSetSnackbar, useSnackbars };
export type { SnackbarProps };

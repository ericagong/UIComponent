import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

const SingleActiveItemContext = createContext<
  [string | null, Dispatch<SetStateAction<string | null>>]
>([null, () => {}]);

const SingleActiveItemProvider = ({ children }: { children: ReactNode }) => {
  const state = useState<string | null>(null);
  return (
    <SingleActiveItemContext.Provider value={state}>
      {children}
    </SingleActiveItemContext.Provider>
  );
};

const useSingleActiveItem = (id: string) => {
  const [activeId, setActiveId] = useContext(SingleActiveItemContext);

  return [id === activeId, setActiveId] as const;
};

export default SingleActiveItemProvider;
export { useSingleActiveItem };

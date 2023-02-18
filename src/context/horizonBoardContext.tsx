import { createContext, ReactNode, useContext, useState } from "react";

type HorizonBoardContextProps = {
  itemIndex: number;
  movePrev: VoidFunction;
  moveNext: VoidFunction;
};

const HorizonBoardContext = createContext<HorizonBoardContextProps>(null!);

export function HorizonBoardProvider({ children }: { children: ReactNode }) {
  const [itemIndex, setItemIndex] = useState(0);
  const movePrev = () => setItemIndex(itemIndex - 1);
  const moveNext = () => setItemIndex(itemIndex + 1);

  return (
    <HorizonBoardContext.Provider value={{ itemIndex, movePrev, moveNext }}>
      {children}
    </HorizonBoardContext.Provider>
  );
}

export function useHorizonBoard() {
  return useContext(HorizonBoardContext);
}

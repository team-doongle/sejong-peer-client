import { createContext, ReactNode, useContext, useState } from "react";
import Loading from "../components/atoms/Loading";

type LoadingContextProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoadingContext = createContext<LoadingContextProps>(null!);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ setIsLoading }}>
      {isLoading ? <Loading /> : null}
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}

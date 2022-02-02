import React, { createContext, useState } from "react";

type ShoppingContextType = {
  count: number | null;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

type ShoppingContextProviderProps = {
  children: React.ReactNode;
};

export const ShoppingContext = createContext({} as ShoppingContextType);

export const ShoppingProvider = ({ children }: ShoppingContextProviderProps) => {
  const [count, setCount] = useState<number>(0);

  return (
    <ShoppingContext.Provider
      value={{
        count,
        setCount,
      }}>
      {children}
    </ShoppingContext.Provider>
  );
};
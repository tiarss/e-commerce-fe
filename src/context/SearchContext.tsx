import React, { createContext, useState } from "react";

type SearchContextType = {
  textSearch: string | null;
  setTextSearch: React.Dispatch<React.SetStateAction<string>>;
};

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContext = createContext({} as SearchContextType);

export const SearchProvider = ({ children }: SearchContextProviderProps) => {
  const [textSearch, setTextSearch] = useState<string>("");

  return (
    <SearchContext.Provider
      value={{
        textSearch,
        setTextSearch,
      }}>
      {children}
    </SearchContext.Provider>
  );
};
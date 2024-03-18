import React, { useState } from "react";

type SearchContext = {
  name: string;
  saveSearch: (name: string) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState<string>("");
  const saveSearch = (name: string) => {
    setName(name);
  };
  return (
    <SearchContext.Provider value={{ name, saveSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearchContext = () => {
  const context = React.useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useSearchContext must be used within SearchContextProvider"
    );
  }
  return context;
};

export { SearchContextProvider, useSearchContext };

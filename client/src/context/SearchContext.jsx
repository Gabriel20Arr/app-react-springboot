import { createContext, useState, useContext } from "react";

const SearchContext = createContext();
export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if(!context) {
        throw new Error("useSearchContext tiene que estar dentro de un provider");
    }

    return context;
}

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider 
        value={{ 
            searchTerm, 
            setSearchTerm 
        }}
    >
      {children}
    </SearchContext.Provider>
  );
};

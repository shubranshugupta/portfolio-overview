import React, { createContext, useContext, useState } from 'react';

export interface QuickSearchContextType {
  searchValue: string;
  setSearchValue: (val: string) => void;
}

const QuickSearchContext = createContext<QuickSearchContextType | undefined>(undefined);

export const useQuickSearch = (): QuickSearchContextType => {
  const context = useContext(QuickSearchContext);
  if (!context) throw new Error('useSearch must be used within SearchProvider');
  return context;
};

export const QuickSearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <QuickSearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </QuickSearchContext.Provider>
  );
};

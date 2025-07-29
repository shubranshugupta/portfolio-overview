import React, { createContext, useContext, useState } from 'react';
import { GridFilterModel } from '@mui/x-data-grid';

export interface FilterModelContextType {
  filterModel: GridFilterModel;
  setFilterModel: (val: GridFilterModel) => void;
}

const FilterModelContext = createContext<FilterModelContextType | undefined>(undefined);

export const useFilterModel = (): FilterModelContextType => {
  const context = useContext(FilterModelContext);
  if (!context) throw new Error('useSearch must be used within SearchProvider');
  return context;
};

export const FilterModelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filterModel, setFilterModel] = useState<GridFilterModel>({items: []});

  return (
    <FilterModelContext.Provider value={{ filterModel, setFilterModel }}>
      {children}
    </FilterModelContext.Provider>
  );
};
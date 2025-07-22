import React, { createContext, useContext, useState } from 'react';

export interface ThemeModeContextType {
  mode: boolean;
  setMode: (val: boolean) => void;
}

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(undefined);

export const useThemeMode = (): ThemeModeContextType => {
  const context = useContext(ThemeModeContext);
  if (!context) throw new Error('useSearch must be used within SearchProvider');
  return context;
};

export const ThemeModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<boolean>(false);

  return (
    <ThemeModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
};

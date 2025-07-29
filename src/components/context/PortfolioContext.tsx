import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define a type for your asset for better type-safety
// (You should replace this with your actual Asset type)
export interface Asset {
  id: number;
  name: string;
  sector: string;
}

// Define the shape of your context's value
interface PortfolioContextType {
  selectedAsset: Asset | null;
  selectedSector: string | null;
  setSelectedAsset: (asset: Asset | null) => void;
  setSelectedSector: (sector: string | null) => void;
}

// Create the context with an undefined default value
const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Create the Provider component
export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const value = {
    selectedAsset,
    selectedSector,
    setSelectedAsset,
    setSelectedSector
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

// Create a custom hook for consuming the context
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
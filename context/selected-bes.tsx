"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SelectedBesContextType {
  selectedBesType: string;
  setSelectedBesType: (besType: string) => void;
}

const defaultState = {
  selectedBesType: "NULL",
  setSelectedBesType: () => {},
};

const SelectedBesContext = createContext<SelectedBesContextType>(defaultState);

export const useSelectedBes = () => useContext(SelectedBesContext);

interface SelectedBesProviderProps {
  children: ReactNode;
}

export const SelectedBesProvider = ({ children }: SelectedBesProviderProps) => {
  const [selectedBesType, setSelectedBesType] = useState<string>("");

  const value = {
    selectedBesType,
    setSelectedBesType,
  };

  return (
    <SelectedBesContext.Provider value={value}>
      {children}
    </SelectedBesContext.Provider>
  );
};

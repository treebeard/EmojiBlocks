import { createContext, useContext, useState } from "react";
import { chains } from "../config/config";

const ChainSelectionContext = createContext();

export function ChainSelectionProvider({ children }) {
  const [selectedChain, setSelectedChain] = useState(chains.ethereum);
  return (
    <ChainSelectionContext.Provider value={{ selectedChain, setSelectedChain }}>
      {children}
    </ChainSelectionContext.Provider>
  );
}

export function useChainSelectionContext() {
  return useContext(ChainSelectionContext);
}

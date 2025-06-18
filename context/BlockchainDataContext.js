import React, { createContext, useContext } from "react";
import { useBlockchainData } from "../hooks/useBlockchainData";

const BlockchainDataContext = createContext();

export function BlockchainDataProvider({ chain, children }) {
  const blockchainData = useBlockchainData(chain.wss, chain.sliceLimit);
  return (
    <BlockchainDataContext.Provider value={blockchainData}>
      {children}
    </BlockchainDataContext.Provider>
  );
}

export function useBlockchainDataContext() {
  return useContext(BlockchainDataContext);
}

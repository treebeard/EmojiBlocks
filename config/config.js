export const chains = {
  ethereum: {
    key: "ethereum",
    name: "Ethereum",
    wss: "wss://eth.llamarpc.com",
    explorer: "https://etherscan.io",
    sliceLimit: 20,
  },
  base: {
    key: "base",
    name: "Base",
    wss: "wss://base-rpc.publicnode.com",
    explorer: "https://basescan.org",
    sliceLimit: 20,
  },
  optimism: {
    key: "optimism",
    name: "Optimism",
    wss: "wss://optimism-rpc.publicnode.com",
    explorer: "https://optimistic.etherscan.io",
    sliceLimit: 50,
  },
  arbitrum: {
    key: "arbitrum",
    name: "Arbitrum",
    wss: "wss://arbitrum-one-rpc.publicnode.com",
    explorer: "https://arbiscan.io",
    sliceLimit: 50,
  },
  zksync: {
    key: "zksync",
    name: "ZKSync Era",
    wss: "wss://mainnet.era.zksync.io/ws",
    explorer: "https://era.zksync.network",
    sliceLimit: 50,
  },
  linea: {
    key: "linea",
    name: "Linea",
    wss: "wss://linea-rpc.publicnode.com",
    explorer: "https://lineascan.build",
    sliceLimit: 50,
  },
  scroll: {
    key: "scroll",
    name: "Scroll",
    wss: "wss://scroll-rpc.publicnode.com",
    explorer: "https://scrollscan.com",
    sliceLimit: 50,
  },
  taiko: {
    key: "taiko",
    name: "Taiko",
    wss: "wss://taiko-rpc.publicnode.com",
    explorer: "https://taikoscan.io",
    sliceLimit: 20,
  },
};

export const sortingModes = {
  default: "Default",
  sorted: "Sorted",
};

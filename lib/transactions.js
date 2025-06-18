// --- Transaction Mapping Configuration ---
// Note: The "test" function is used to determine if a transaction matches the mapping.
// The last mapping (Unknown) is always defined explicitly so that it shows in the legend.
// Checks are performed top down, while order is only used for sorting.
// Emojis: https://github.com/twitter/twemoji/blob/master/assets/svg
// TODO: make these checks mutually exclusive
export const transactionMappings = [
  {
    description: "Blob Commitment",
    test: (tx) => tx.type === "0x3" || tx.type === 3 || tx.maxFeePerBlobGas,
    emoji: "/emojis/package.svg",
    order: 12,
  },
  {
    description: "Contract Creation",
    test: (tx) => !tx.to,
    emoji: "/emojis/memo.svg",
    order: 11,
  },
  {
    description: "ETH Transfer",
    test: (tx) => tx.input === "0x" && parseInt(tx.value, 16) > 0,
    emoji: "/emojis/eth-logo.svg",
    order: 1,
  },
  {
    description: "Zero-Value Transfer",
    test: (tx) => tx.input === "0x" && parseInt(tx.value, 16) === 0,
    emoji: "/emojis/zero.svg",
    order: 2,
  },
  {
    description: "Token Transfer",
    test: (tx) => isTokenTransfer(tx),
    emoji: "/emojis/coin.svg",
    order: 3,
  },
  {
    description: "Token Approval",
    test: (tx) => isApprovalTx(tx),
    emoji: "/emojis/check-mark.svg",
    order: 4,
  },
  {
    description: "ETH Wrap/Unwrap",
    test: (tx) => isWETHTx(tx),
    emoji: "/emojis/wrapped-gift.svg",
    order: 5,
  },
  {
    description: "Uniswap",
    test: (tx) => isUniswapTx(tx),
    emoji: "/emojis/unicorn.svg",
    order: 6,
  },
  {
    description: "Jared From Subway",
    test: (tx) => isJaredFromSubway(tx),
    emoji: "/emojis/sandwich.svg",
    order: 7,
  },
  {
    description: "OpenSea",
    test: (tx) => isOpenSeaTx(tx),
    emoji: "/emojis/sailboat.svg",
    order: 8,
  },
  {
    description: "Beacon Chain Deposit",
    test: (tx) => isBeaconDepositTx(tx),
    emoji: "/emojis/steak.svg",
    order: 9,
  },
  {
    description: "Contract Interaction",
    test: (tx) => tx.input !== "0x",
    emoji: "/emojis/gear.svg",
    order: 10,
  },
  {
    description: "Unknown",
    test: () => false, // never matches
    emoji: "/emojis/question-mark.svg",
    order: 100,
    default: true,
  },
];

const isTokenTransfer = (tx) => {
  const TOKEN_SIGNATURES = [
    "0xa9059cbb", // transfer
    "0x23b872dd", // transferFrom
    "0x42842e0e", // ERC-721 safeTransferFrom
    "0xf242432a", // ERC-1155 safeTransferFrom
  ];
  return TOKEN_SIGNATURES.some((sig) => tx.input.startsWith(sig));
};

const isApprovalTx = (tx) => {
  const APPROVAL_SIGNATURES = [
    "0x095ea7b3", // approve
    "0xa22cb465", // setApprovalForAll
    "0xd505accf", // permit
    "0x9fd5a6cf", // permit
  ];
  return APPROVAL_SIGNATURES.some((sig) => tx.input.startsWith(sig));
};

const isWETHTx = (tx) => {
  const WETH_ADDRESSES = [
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // Ethereum
    "0x4200000000000000000000000000000000000006", // Optimism, Base
    "0x82af49447d8a07e3bd95bd0d56f35241523fbab1", // Arbitrum
    "0x5aea5775959fbc2557cc8789bc1bf90a239d9a91", // ZKSync Era
    "0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f", // Linea
    "0x5300000000000000000000000000000000000004", // Scroll
    "0xa51894664a773981c6c112c43ce576f315d5b1b6", // Taiko
  ];
  const WETH_SIGNATURES = ["0xd0e30db0", "0x2e1a7d4d"];

  const validAddress = WETH_ADDRESSES.map((a) => a.toLowerCase()).includes(
    tx.to.toLowerCase(),
  );
  const validPrefix = WETH_SIGNATURES.some((prefix) =>
    tx.input.startsWith(prefix),
  );

  return validAddress && validPrefix;
};

const isOpenSeaTx = (tx) => {
  const OPENSEA_SIGNATURES = [
    "0xe7acab24", // fulfillAdvancedOrder
    "0x87201b41", // fulfillAvailableAdvancedOrders
    "0xed98a574", // fulfillAvailableOrders
    "0xfb0f3ee1", // fulfillBasicOrder
    "0xb3a34c4c", // fulfillOrder
    "0xf2d12b12", // matchAdvancedOrders
    "0xa8174404", // matchOrders
  ];
  return OPENSEA_SIGNATURES.some((sig) => tx.input.startsWith(sig));
};

const isUniswapTx = (tx) => {
  const UNISWAP_V2_SIGNATURES = [
    "0xfb3bdb41", // swapETHForExactTokens
    "0x7ff36ab5", // swapExactETHForTokens
    "0xb6f9de95", // swapExactETHForTokensSupportingFeeOnTransferTokens
    "0x18cbafe5", // swapExactTokensForETH
    "0x791ac947", // swapExactTokensForETHSupportingFeeOnTransferTokens
    "0x38ed1739", // swapExactTokensForTokens
    "0x5c11d795", // swapExactTokensForTokensSupportingFeeOnTransferTokens
    "0x4a25d94a", // swapTokensForExactETH
    "0x8803dbee", // swapTokensForExactTokens
  ];
  const UNISWAP_V3_SIGNATURES = [
    "0xc04b8d59", // exactInput
    "0x414bf389", // exactInputSingle
    "0xf28c0498", // exactOutput
    "0xdb3e2198", // exactOutputSingle
  ];
  return (
    UNISWAP_V2_SIGNATURES.some((sig) => tx.input.startsWith(sig)) ||
    UNISWAP_V3_SIGNATURES.some((sig) => tx.input.startsWith(sig))
  );
};

const isBeaconDepositTx = (tx) => {
  const txTo = tx.to.toLowerCase();
  if (txTo === "0x00000000219ab540356cbb839cbe05303d7705fa") {
    return tx.input.startsWith("0x22895118");
  }
  return false;
};

const isJaredFromSubway = (tx) => {
  const txFrom = tx.from.toLowerCase();
  const txTo = tx.to.toLowerCase();
  if (
    txFrom === "0xae2fc483527b8ef99eb5d9b44875f005ba1fae13" &&
    txTo === "0x1f2f10d1c40777ae1da742455c65828ff36df387"
  ) {
    return true;
  }
  return false;
};

// Checks each mapping in order and returns the first one that matches.
// If none match, it returns the "Unknown" mapping.
export const getTransactionMapping = (tx) => {
  const mapping =
    transactionMappings.find((m) => m.test(tx)) ||
    transactionMappings.find((m) => m.default);
  return mapping;
};

import { useState, useEffect, useRef } from "react";

export function useBlockchainData(wssEndpoint, sliceLimit = 50) {
  const [blocks, setBlocks] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const blocksRef = useRef([]);
  const knownBlocksRef = useRef(new Set());
  const wsRef = useRef(null);
  const shouldReconnectRef = useRef(true);
  const reconnectTimeoutRef = useRef(null);

  const resetBlockState = () => {
    if (blocksRef.current.length > 0 || knownBlocksRef.current.size > 0) {
      setBlocks([]);
      blocksRef.current = [];
      knownBlocksRef.current = new Set();
    }
  };

  const clearReconnectTimeout = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  const sendWithRetry = (message, retries = 3, delay = 50) => {
    const attempt = (remainingRetries) => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

      try {
        wsRef.current.send(JSON.stringify(message));
      } catch (error) {
        console.warn("WebSocket send failed, retrying...", error);
        if (remainingRetries > 0) {
          setTimeout(() => attempt(remainingRetries - 1), delay);
        } else {
          console.error("WebSocket send failed after retries:", error);
        }
      }
    };

    attempt(retries);
  };

  const storeBlock = (newBlock) => {
    setBlocks((prev) => {
      const updated = [...prev, newBlock];
      if (prev.length > 0 && newBlock.number < prev[prev.length - 1].number) {
        updated.sort((a, b) => a.number - b.number);
      }
      blocksRef.current = updated;
      return updated.length > sliceLimit ? updated.slice(-sliceLimit) : updated;
    });
  };

  const fetchBlockWithTransactions = (blockNumber) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    sendWithRetry({
      jsonrpc: "2.0",
      id: blockNumber,
      method: "eth_getBlockByNumber",
      params: [blockNumber, true],
    });
  };

  const processBlock = (block) => {
    if (!block || !block.number) return;

    const blockNumber = parseInt(block.number, 16);

    if (knownBlocksRef.current.has(blockNumber)) return;

    //TODO: remove
    const highestStored =
      blocksRef.current.length > 0
        ? Math.max(...blocksRef.current.map((b) => b.number))
        : null;

    if (highestStored !== null && blockNumber < highestStored) {
      console.warn(`Block ${blockNumber} is outdated, discarding.`);
      return;
    }

    knownBlocksRef.current.add(blockNumber);
    storeBlock({ number: blockNumber, transactions: block.transactions });
  };

  const createWebSocket = () => {
    console.info(`Opening WebSocket connection (${wssEndpoint})...`);
    wsRef.current = new WebSocket(wssEndpoint);

    wsRef.current.onopen = () => {
      console.info("WebSocket connected, subscribing to new blocks...");
      clearReconnectTimeout();
      setConnectionStatus("connected");
      fetchBlockWithTransactions("latest");
      sendWithRetry(
        {
          jsonrpc: "2.0",
          id: 2,
          method: "eth_subscribe",
          params: ["newHeads"],
        },
        5,
        1000,
      );
    };

    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.method === "eth_subscription" && data.params?.result?.number) {
          // New block header detected, request block data
          fetchBlockWithTransactions(data.params.result.number);
        }

        if (data.result?.number) {
          // Response to eth_getBlockByNumber, process the block data
          processBlock(data.result);
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      clearReconnectTimeout();
      wsRef.current?.close();
    };

    wsRef.current.onclose = () => {
      setConnectionStatus("disconnected");
      if (shouldReconnectRef.current) {
        console.warn("WebSocket closed, reconnecting in 5 seconds...");
        clearReconnectTimeout();
        reconnectTimeoutRef.current = setTimeout(createWebSocket, 5000);
      }
    };
  };

  useEffect(() => {
    shouldReconnectRef.current = true;
    resetBlockState();
    createWebSocket();

    return () => {
      clearReconnectTimeout();
      shouldReconnectRef.current = false;
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [wssEndpoint]);

  return { blocks, connectionStatus };
}

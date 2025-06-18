import React from "react";
import { useBlockchainDataContext } from "../context/BlockchainDataContext";
import styles from "../styles/ConnectionIndicator.module.css";

function ConnectionIndicator() {
  const { connectionStatus } = useBlockchainDataContext();
  return (
    <div
      className={`${styles.connectionIndicator} ${
        connectionStatus === "connected"
          ? styles.connected
          : styles.disconnected
      }`}
      title={connectionStatus === "connected" ? "Connected" : "Disconnected"}
    />
  );
}

export default ConnectionIndicator;

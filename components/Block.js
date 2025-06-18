import React from "react";
import { getTransactionMapping } from "../lib/transactions";
import Tx from "./Tx";
import styles from "../styles/Block.module.css";

const Block = ({
  block,
  sortingMode,
  isLatest,
  showConnector,
  selectedChain,
}) => {
  const sortTransactions = (txArray = []) => {
    return sortingMode === "sorted"
      ? [...txArray].sort(
          (a, b) =>
            getTransactionMapping(a).order - getTransactionMapping(b).order,
        )
      : txArray;
  };

  return (
    <div className={styles.blockWrapper}>
      {showConnector && (
        <div
          className={
            isLatest
              ? `${styles.connector} ${styles.newConnector}`
              : styles.connector
          }
        />
      )}
      <div className={styles.blockContent}>
        <a
          href={`${selectedChain.explorer}/block/${block.number}`}
          target="_blank"
          rel="noopener noreferrer"
          className={
            isLatest
              ? `${styles.blockLink} ${styles.newBlockLink}`
              : styles.blockLink
          }
        >
          Block #{block.number}{" "}
        </a>
        <div
          className={
            isLatest ? `${styles.block} ${styles.newBlock}` : styles.block
          }
        >
          {sortTransactions(block.transactions).map((tx, idx) => (
            <Tx key={tx.hash || idx} tx={tx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Block;

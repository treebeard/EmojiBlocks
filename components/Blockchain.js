import React, { useRef } from "react";
import { useChainSelectionContext } from "../context/ChainSelectionContext";
import { useBlockchainDataContext } from "../context/BlockchainDataContext";
import { useSlidingOffset } from "../hooks/useSlidingOffset";
import styles from "../styles/Blockchain.module.css";
import Block from "./Block";

function Blockchain({ sortingMode }) {
  const { selectedChain } = useChainSelectionContext();
  const { blocks } = useBlockchainDataContext();
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const offset = useSlidingOffset(containerRef, innerRef, blocks);

  return (
    <div className={styles.blockchainContainer} ref={containerRef}>
      <div
        className={
          blocks.length === 1
            ? `${styles.blockchainInner} ${styles.noTransition}`
            : styles.blockchainInner
        }
        ref={innerRef}
        style={{ transform: `translateX(${offset}px)` }}
      >
        {blocks.map((block, index) => {
          const isLatest = index === blocks.length - 1;
          return (
            <Block
              key={block.number}
              block={block}
              isLatest={isLatest}
              sortingMode={sortingMode}
              showConnector={index > 0}
              selectedChain={selectedChain}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Blockchain;

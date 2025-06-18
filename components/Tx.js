import { useState, useRef } from "react";
import { useChainSelectionContext } from "../context/ChainSelectionContext";
import { getTransactionMapping } from "../lib/transactions";
import styles from "../styles/Tx.module.css";
import Tooltip from "./Tooltip";

/**
 * Tx wraps each transaction’s emoji and shows its tooltip on hover.
 */
function Tx({ tx }) {
  const { selectedChain } = useChainSelectionContext();
  const [hover, setHover] = useState(false);
  const ref = useRef(null);
  const { emoji, description } = getTransactionMapping(tx);
  return (
    <div
      className={styles.txItem}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      ref={ref}
    >
      <a
        href={`${selectedChain.explorer}/tx/${tx.hash}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.txLink}
      >
        <span className={styles.txIcon}>
          <img src={emoji} />
        </span>
      </a>
      <Tooltip visible={hover} targetRef={ref}>
        {description}
      </Tooltip>
    </div>
  );
}

export default Tx;

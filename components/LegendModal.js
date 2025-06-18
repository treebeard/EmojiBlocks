import React from "react";
import styles from "../styles/LegendModal.module.css";
import { transactionMappings } from "../lib/transactions";

function LegendModal({ onClose }) {
  const sortedMappings = [...transactionMappings].sort(
    (a, b) => a.order - b.order,
  );

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalTitle}>Legend</div>
        <div className={styles.legendList}>
          {sortedMappings.map((item) => (
            <div key={item.order} className={styles.legendItem}>
              <div className={styles.legendIcon}>
                <img src={item.emoji} />
              </div>
              <div className={styles.legendDescription}>
                - {item.description}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.modalClose} onClick={onClose}>
          close
        </div>
      </div>
    </div>
  );
}

export default LegendModal;

import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/Tooltip.module.css";

/**
 * Tooltip component that renders its children into a portal.
 * It positions itself relative to a target element via a ref.
 */
function Tooltip({ children, visible, targetRef }) {
  const [coords, setCoords] = useState({ left: 0, top: 0 });
  useEffect(() => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setCoords({
        left: rect.left + rect.width / 2,
        top: rect.top, // position above the target
      });
    }
  }, [targetRef, visible]);
  if (!visible) return null;
  return ReactDOM.createPortal(
    <div
      className={styles.tooltip}
      style={{
        position: "fixed",
        left: coords.left,
        top: coords.top,
        transform: "translate(-50%, -110%)", // adjust vertical offset as needed
      }}
    >
      {children}
    </div>,
    document.body,
  );
}

export default Tooltip;

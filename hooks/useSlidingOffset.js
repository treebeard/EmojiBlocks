import { useState, useLayoutEffect, useEffect } from "react";

export function useSlidingOffset(containerRef, innerRef, blocks) {
  const [offset, setOffset] = useState(0);

  useLayoutEffect(() => {
    if (!containerRef.current || !innerRef.current) return;

    const cw = containerRef.current.clientWidth;
    const sw = innerRef.current.scrollWidth;

    // Align right if overflowing, otherwise center it
    const newOffset = sw > cw ? cw - sw : Math.max((cw - sw) / 2, 0);

    setOffset((prevOffset) =>
      prevOffset !== newOffset ? newOffset : prevOffset,
    );
  }, [blocks]);

  return offset;
}

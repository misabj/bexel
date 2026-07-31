"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wraps a wide table and adds a second horizontal scrollbar pinned to the top,
 * synced with the main scroll area — so users can scroll right without having
 * to reach the bottom of a tall table first.
 */
export function TableScroll({ children }: { children: React.ReactNode }) {
  const topRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const update = () => setContentWidth(body.scrollWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(body);
    if (body.firstElementChild) ro.observe(body.firstElementChild);
    return () => ro.disconnect();
  }, []);

  const syncFromTop = () => {
    if (topRef.current && bodyRef.current) {
      bodyRef.current.scrollLeft = topRef.current.scrollLeft;
    }
  };

  const syncFromBody = () => {
    if (topRef.current && bodyRef.current) {
      topRef.current.scrollLeft = bodyRef.current.scrollLeft;
    }
  };

  return (
    <div>
      <div
        ref={topRef}
        onScroll={syncFromTop}
        className="overflow-x-auto"
        aria-hidden="true"
      >
        <div style={{ width: contentWidth, height: 1 }} />
      </div>
      <div ref={bodyRef} onScroll={syncFromBody} className="overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

import { useRef, useCallback, useState } from 'react';

interface UseDraggableOptions {
  onDragEnd?: (position: { x: number; y: number }) => void;
  initialPosition?: { x: number; y: number };
}

export function useDraggable(options: UseDraggableOptions = {}) {
  const { onDragEnd, initialPosition = { x: 0, y: 0 } } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const posRef = useRef({ x: initialPosition.x, y: initialPosition.y });
  const startRef = useRef({ pointerX: 0, pointerY: 0, startX: 0, startY: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    el.setPointerCapture(e.pointerId);
    startRef.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      startX: posRef.current.x,
      startY: posRef.current.y,
    };
    setIsDragging(true);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const el = ref.current;
    if (!el) return;
    const dx = e.clientX - startRef.current.pointerX;
    const dy = e.clientY - startRef.current.pointerY;
    posRef.current = {
      x: startRef.current.startX + dx,
      y: startRef.current.startY + dy,
    };
    el.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
  }, [isDragging]);

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
    onDragEnd?.(posRef.current);
  }, [onDragEnd]);

  const setPosition = useCallback((pos: { x: number; y: number }) => {
    posRef.current = pos;
    if (ref.current) {
      ref.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    }
  }, []);

  return {
    ref,
    isDragging,
    position: posRef,
    setPosition,
    handlers: { onPointerDown, onPointerMove, onPointerUp },
  };
}

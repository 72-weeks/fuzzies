import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useFuzzyStore, useActiveFuzzy, assetUrl } from '../store';
import type { Hat } from '../store';

const DISPLAY_SIZE = 640;

const HAT_POSITIONS: Record<Exclude<Hat, 'none'>, { top: string; left: string; width: string }> = {
  cap:        { top: '12%', left: '53%', width: '28%' },
  magic:      { top: '5%',  left: '53%', width: '22%' },
  helicopter: { top: '8%',  left: '53%', width: '30%' },
};

export const FuzzyDisplay: React.FC = () => {
  const active = useActiveFuzzy();
  const { setPosition, closeMenu } = useFuzzyStore();

  const color = active?.color ?? 'blue';
  const species = active?.species ?? 'ice';
  const hat = active?.hat ?? 'none';

  // ── Fuzzy drag ──
  const fuzzyRef = useRef<HTMLDivElement>(null);
  const [fuzzyDragging, setFuzzyDragging] = useState(false);
  const fuzzyPosRef = useRef({ x: active?.position?.x ?? 0, y: active?.position?.y ?? 0 });
  const fuzzyStartRef = useRef({ px: 0, py: 0, sx: 0, sy: 0 });

  useEffect(() => {
    fuzzyPosRef.current = { x: active?.position?.x ?? 0, y: active?.position?.y ?? 0 };
    if (fuzzyRef.current) {
      fuzzyRef.current.style.transform = `translate(${fuzzyPosRef.current.x}px, ${fuzzyPosRef.current.y}px)`;
    }
  }, [active?.id]);

  const onFuzzyDown = useCallback((e: React.PointerEvent) => {
    closeMenu();
    fuzzyRef.current?.setPointerCapture(e.pointerId);
    fuzzyStartRef.current = {
      px: e.clientX, py: e.clientY,
      sx: fuzzyPosRef.current.x, sy: fuzzyPosRef.current.y,
    };
    setFuzzyDragging(true);
  }, [closeMenu]);

  const onFuzzyMove = useCallback((e: React.PointerEvent) => {
    if (!fuzzyDragging) return;
    const dx = e.clientX - fuzzyStartRef.current.px;
    const dy = e.clientY - fuzzyStartRef.current.py;
    fuzzyPosRef.current = {
      x: fuzzyStartRef.current.sx + dx,
      y: fuzzyStartRef.current.sy + dy,
    };
    if (fuzzyRef.current) {
      fuzzyRef.current.style.transform = `translate(${fuzzyPosRef.current.x}px, ${fuzzyPosRef.current.y}px)`;
    }
  }, [fuzzyDragging]);

  const onFuzzyUp = useCallback(() => {
    setFuzzyDragging(false);
    setPosition(fuzzyPosRef.current);
  }, [setPosition]);

  const hatPos = hat !== 'none' ? HAT_POSITIONS[hat] : null;

  return (
    <div
      ref={fuzzyRef}
      onPointerDown={onFuzzyDown}
      onPointerMove={onFuzzyMove}
      onPointerUp={onFuzzyUp}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        userSelect: 'none',
        touchAction: 'none',
        cursor: fuzzyDragging ? 'grabbing' : 'grab',
        transform: `translate(${active?.position?.x ?? 0}px, ${active?.position?.y ?? 0}px)`,
      }}
    >
      <div
        className={fuzzyDragging ? '' : 'fuzzy-bob'}
        style={{
          position: 'relative',
          width: `${DISPLAY_SIZE}px`,
          height: `${DISPLAY_SIZE}px`,
          animationPlayState: fuzzyDragging ? 'paused' : 'running',
        }}
      >
        {/* Layer 0: Wings (dragon only) */}
        {species === 'dragon' && (
          <img
            src={assetUrl('wings-dragon.png')}
            alt="Dragon wings"
            style={{
              position: 'absolute',
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '75%',
              height: 'auto',
              objectFit: 'contain',
              zIndex: 0,
              pointerEvents: 'none',
            }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        )}

        {/* Layer 1: Body */}
        <img
          src={assetUrl(`body-${color}.png`)}
          alt="Fuzzy body"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            zIndex: 1,
            pointerEvents: 'none',
          }}
          onError={(e) => { (e.target as HTMLImageElement).src = assetUrl('body-blue.png'); }}
        />

        {/* Layer 2: Tummy icon */}
        <img
          src={assetUrl(`tummy-${species}.png`)}
          alt={`${species} tummy icon`}
          style={{
            position: 'absolute',
            bottom: '24%',
            left: '55%',
            transform: 'translateX(-52%)',
            width: '10%',
            height: '10%',
            objectFit: 'contain',
            opacity: 0.9,
            zIndex: 2,
            pointerEvents: 'none',
          }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />

        {/* Layer 3: Hat (fixed position) */}
        {hat !== 'none' && hatPos && (
          <img
            src={assetUrl(`hat-${hat}.png`)}
            alt={`${hat} hat`}
            style={{
              position: 'absolute',
              top: hatPos.top,
              left: hatPos.left,
              transform: 'translateX(-50%)',
              width: hatPos.width,
              objectFit: 'contain',
              zIndex: 3,
              pointerEvents: 'none',
            }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        )}
      </div>
    </div>
  );
};

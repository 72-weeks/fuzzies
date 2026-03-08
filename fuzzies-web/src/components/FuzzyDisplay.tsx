import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useFuzzyStore, useActiveFuzzy, assetUrl } from '../store';
import type { Hat } from '../store';

const DISPLAY_SIZE = 640;

const HAT_POSITIONS: Record<Exclude<Hat, 'none'>, { top: string; left: string; width: string }> = {
  cap:        { top: '12%', left: '53%', width: '28%' },
  magic:      { top: '5%',  left: '53%', width: '22%' },
  helicopter: { top: '8%',  left: '53%', width: '30%' },
};

const SNAP_DISTANCE = 120;

export const FuzzyDisplay: React.FC = () => {
  const active = useActiveFuzzy();
  const { setPosition, setHat, setHatDetached, setHatOffset, setDetachedHatType, closeMenu } = useFuzzyStore();

  const color = active?.color ?? 'blue';
  const species = active?.species ?? 'ice';
  const hat = active?.hat ?? 'none';
  const hatDetached = active?.hatDetached ?? false;
  const hatOffset = active?.hatOffset ?? { x: 0, y: 0 };
  const detachedHatType = active?.detachedHatType ?? 'none';

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
    // Don't capture if the hat handles it
    if ((e.target as HTMLElement).closest('[data-hat-drag]')) return;
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

  // ── Hat drag ──
  const attachedHatRef = useRef<HTMLDivElement>(null);
  const detachedHatRef = useRef<HTMLDivElement>(null);
  const [hatDragging, setHatDragging] = useState(false);
  const hatPosRef = useRef({ x: 0, y: 0 });
  const hatStartRef = useRef({ px: 0, py: 0, sx: 0, sy: 0 });
  const activeHatRef = useRef<HTMLDivElement | null>(null);

  const onHatDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    closeMenu();
    const ref = hatDetached ? detachedHatRef : attachedHatRef;
    activeHatRef.current = ref.current;
    activeHatRef.current?.setPointerCapture(e.pointerId);
    hatPosRef.current = hatDetached ? { ...hatOffset } : { x: 0, y: 0 };
    hatStartRef.current = {
      px: e.clientX, py: e.clientY,
      sx: hatPosRef.current.x, sy: hatPosRef.current.y,
    };
    setHatDragging(true);
  }, [hatDetached, hatOffset, closeMenu]);

  const onHatMove = useCallback((e: React.PointerEvent) => {
    if (!hatDragging) return;
    const dx = e.clientX - hatStartRef.current.px;
    const dy = e.clientY - hatStartRef.current.py;
    hatPosRef.current = {
      x: hatStartRef.current.sx + dx,
      y: hatStartRef.current.sy + dy,
    };
    if (activeHatRef.current) {
      activeHatRef.current.style.transform = `translate(${hatPosRef.current.x}px, ${hatPosRef.current.y}px)`;
    }
  }, [hatDragging]);

  const onHatUp = useCallback(() => {
    setHatDragging(false);
    const dist = Math.sqrt(hatPosRef.current.x ** 2 + hatPosRef.current.y ** 2);
    if (dist < SNAP_DISTANCE) {
      // Snap back
      if (hatDetached) {
        setHat(detachedHatType);
        setHatDetached(false);
        setHatOffset({ x: 0, y: 0 });
      }
      if (activeHatRef.current) activeHatRef.current.style.transform = '';
    } else {
      // Detach
      const currentHat = hatDetached ? detachedHatType : hat;
      if (currentHat !== 'none') {
        setDetachedHatType(currentHat);
        setHatDetached(true);
        setHatOffset(hatPosRef.current);
        if (!hatDetached) setHat('none');
      }
    }
    activeHatRef.current = null;
  }, [hat, hatDetached, detachedHatType, setHat, setHatDetached, setHatOffset, setDetachedHatType]);

  // Reset hat visual when reattached
  useEffect(() => {
    if (!hatDetached && attachedHatRef.current) {
      attachedHatRef.current.style.transform = '';
    }
  }, [hatDetached]);

  const renderHatType = hatDetached ? detachedHatType : hat;
  const hatPos = renderHatType !== 'none' ? HAT_POSITIONS[renderHatType as Exclude<Hat, 'none'>] : null;

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

        {/* Layer 3: Hat (attached — draggable) */}
        {hat !== 'none' && !hatDetached && hatPos && (
          <div
            ref={attachedHatRef}
            data-hat-drag
            onPointerDown={onHatDown}
            onPointerMove={onHatMove}
            onPointerUp={onHatUp}
            style={{
              position: 'absolute',
              top: hatPos.top,
              left: hatPos.left,
              transform: 'translateX(-50%)',
              width: hatPos.width,
              zIndex: 3,
              cursor: hatDragging ? 'grabbing' : 'grab',
              touchAction: 'none',
            }}
          >
            <img
              src={assetUrl(`hat-${hat}.png`)}
              alt={`${hat} hat`}
              style={{ width: '100%', objectFit: 'contain', pointerEvents: 'none' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        )}

        {/* Layer 3: Hat (detached — floating, draggable) */}
        {hatDetached && detachedHatType !== 'none' && hatPos && (
          <div
            ref={detachedHatRef}
            data-hat-drag
            onPointerDown={onHatDown}
            onPointerMove={onHatMove}
            onPointerUp={onHatUp}
            style={{
              position: 'absolute',
              top: hatPos.top,
              left: hatPos.left,
              width: hatPos.width,
              zIndex: 3,
              cursor: hatDragging ? 'grabbing' : 'grab',
              touchAction: 'none',
              transform: `translate(${hatOffset.x}px, ${hatOffset.y}px)`,
            }}
          >
            <img
              src={assetUrl(`hat-${detachedHatType}.png`)}
              alt={`${detachedHatType} hat`}
              style={{ width: '100%', objectFit: 'contain', pointerEvents: 'none' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useFuzzyStore, assetUrl } from '../store';
import type { Color, Species, Hat } from '../store';

type Category = 'color' | 'species' | 'hat';

const COLORS: { id: Color; hex: string }[] = [
  { id: 'blue',   hex: '#8ab4e8' },
  { id: 'pink',   hex: '#f4a7c3' },
  { id: 'green',  hex: '#8fd5b0' },
  { id: 'yellow', hex: '#f5d56e' },
  { id: 'purple', hex: '#c3a0e8' },
  { id: 'orange', hex: '#f5a96e' },
];

const SPECIES_LIST: Species[] = ['ice', 'heart', 'hypno', 'icecream', 'tv', 'paint'];

const HATS: { id: Hat; emoji: string }[] = [
  { id: 'none',       emoji: '✨' },
  { id: 'cap',        emoji: '🧢' },
  { id: 'magic',      emoji: '🎩' },
  { id: 'helicopter', emoji: '🚁' },
];

const BUBBLE = 56;
const OPTION = 50;
const GAP = 12;

const CloseX: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <line x1="5" y1="5" x2="17" y2="17" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="17" y1="5" x2="5" y2="17" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const NavBubbles: React.FC = () => {
  const { color, species, hat, setColor, setSpecies, setHat } = useFuzzyStore();
  const [openMenu, setOpenMenu] = useState<Category | null>(null);

  const currentHex = COLORS.find(c => c.id === color)?.hex ?? '#8ab4e8';

  const open = (cat: Category) => setOpenMenu(cat);
  const close = () => setOpenMenu(null);

  const previewStyle = (active: boolean): React.CSSProperties => ({
    width: BUBBLE,
    height: BUBBLE,
    borderRadius: '50%',
    border: '3px solid rgba(255,255,255,0.5)',
    boxShadow: active
      ? '0 0 20px rgba(255,255,255,0.4), 0 4px 20px rgba(0,0,0,0.25)'
      : '0 4px 16px rgba(0,0,0,0.2)',
    cursor: 'pointer',
    transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s',
    transform: active ? 'scale(1.15)' : 'scale(1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    overflow: 'hidden',
  });

  const closeStyle: React.CSSProperties = {
    width: BUBBLE,
    height: BUBBLE,
    borderRadius: '50%',
    border: '3px solid rgba(255,255,255,0.6)',
    background: 'rgba(0,0,0,0.35)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    boxShadow: '0 0 20px rgba(255,255,255,0.3), 0 4px 20px rgba(0,0,0,0.25)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    transform: 'scale(1.15)',
    transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
  };

  const optionStyle = (selected: boolean, index: number): React.CSSProperties => ({
    width: OPTION,
    height: OPTION,
    borderRadius: '50%',
    border: selected ? '3px solid white' : '2px solid rgba(255,255,255,0.35)',
    boxShadow: selected
      ? '0 0 16px rgba(255,255,255,0.35), 0 4px 12px rgba(0,0,0,0.2)'
      : '0 4px 12px rgba(0,0,0,0.15)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    overflow: 'hidden',
    animation: `bubbleUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.04}s both`,
  });

  const optionsColumn: React.CSSProperties = {
    position: 'absolute',
    bottom: BUBBLE + 16,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column-reverse',
    gap: GAP,
    alignItems: 'center',
  };

  const glassOption = (selected: boolean): React.CSSProperties => ({
    background: selected ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.12)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  });

  return (
    <>
      {/* Invisible backdrop to close menu */}
      {openMenu && (
        <div
          onClick={close}
          style={{ position: 'fixed', inset: 0, zIndex: 99 }}
        />
      )}

      {/* Nav */}
      <div style={{
        position: 'fixed',
        bottom: '44px',
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        gap: '28px',
        pointerEvents: 'none',
      }}>

        {/* ── Color ────────────────────────────────── */}
        <div style={{ position: 'relative', pointerEvents: 'auto' }}>
          {openMenu === 'color' && (
            <div style={optionsColumn}>
              {COLORS.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id)}
                  style={{
                    ...optionStyle(color === c.id, i),
                    background: c.hex,
                  }}
                  aria-label={c.id}
                />
              ))}
            </div>
          )}
          {openMenu === 'color' ? (
            <button onClick={close} style={closeStyle} aria-label="Close">
              <CloseX />
            </button>
          ) : (
            <button
              onClick={() => open('color')}
              style={{ ...previewStyle(false), background: currentHex }}
              aria-label="Color"
            />
          )}
        </div>

        {/* ── Species ──────────────────────────────── */}
        <div style={{ position: 'relative', pointerEvents: 'auto' }}>
          {openMenu === 'species' && (
            <div style={optionsColumn}>
              {SPECIES_LIST.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setSpecies(s)}
                  style={{
                    ...optionStyle(species === s, i),
                    ...glassOption(species === s),
                    padding: '8px',
                  }}
                  aria-label={s}
                >
                  <img
                    src={assetUrl(`tummy-${s}.png`)}
                    alt={s}
                    style={{ width: 30, height: 30, objectFit: 'contain' }}
                  />
                </button>
              ))}
            </div>
          )}
          {openMenu === 'species' ? (
            <button onClick={close} style={closeStyle} aria-label="Close">
              <CloseX />
            </button>
          ) : (
            <button
              onClick={() => open('species')}
              style={{
                ...previewStyle(false),
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                padding: '10px',
              }}
              aria-label="Species"
            >
              <img
                src={assetUrl(`tummy-${species}.png`)}
                alt={species}
                style={{ width: 32, height: 32, objectFit: 'contain' }}
              />
            </button>
          )}
        </div>

        {/* ── Hat ───────────────────────────────────── */}
        <div style={{ position: 'relative', pointerEvents: 'auto' }}>
          {openMenu === 'hat' && (
            <div style={optionsColumn}>
              {HATS.map((h, i) => (
                <button
                  key={h.id}
                  onClick={() => setHat(h.id)}
                  style={{
                    ...optionStyle(hat === h.id, i),
                    ...glassOption(hat === h.id),
                  }}
                  aria-label={h.id}
                >
                  {h.id === 'none' ? (
                    <span style={{ fontSize: '1.3rem' }}>{h.emoji}</span>
                  ) : (
                    <img
                      src={assetUrl(`hat-${h.id}.png`)}
                      alt={h.id}
                      style={{ width: 30, height: 30, objectFit: 'contain' }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
          {openMenu === 'hat' ? (
            <button onClick={close} style={closeStyle} aria-label="Close">
              <CloseX />
            </button>
          ) : (
            <button
              onClick={() => open('hat')}
              style={{
                ...previewStyle(false),
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
              aria-label="Hat"
            >
              {hat === 'none' ? (
                <span style={{ fontSize: '1.5rem' }}>✨</span>
              ) : (
                <img
                  src={assetUrl(`hat-${hat}.png`)}
                  alt={hat}
                  style={{ width: 34, height: 34, objectFit: 'contain' }}
                />
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

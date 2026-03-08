import React, { useState } from 'react';
import { useFuzzyStore, assetUrl } from '../store';
import type { Color, Species, Hat } from '../store';
import { TummyIcon } from './TummyIcons';

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

export const NavBubbles: React.FC = () => {
  const { color, species, hat, setColor, setSpecies, setHat } = useFuzzyStore();
  const [openMenu, setOpenMenu] = useState<Category | null>(null);

  const currentHex = COLORS.find(c => c.id === color)?.hex ?? '#8ab4e8';

  const toggle = (cat: Category) => setOpenMenu(prev => prev === cat ? null : cat);
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
            <div style={{
              position: 'absolute',
              bottom: BUBBLE + 16,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column-reverse',
              gap: GAP,
              alignItems: 'center',
            }}>
              {COLORS.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => { setColor(c.id); close(); }}
                  style={{
                    ...optionStyle(color === c.id, i),
                    background: c.hex,
                  }}
                  aria-label={c.id}
                />
              ))}
            </div>
          )}
          <button
            onClick={() => toggle('color')}
            style={{
              ...previewStyle(openMenu === 'color'),
              background: currentHex,
            }}
            aria-label="Color"
          />
        </div>

        {/* ── Species ──────────────────────────────── */}
        <div style={{ position: 'relative', pointerEvents: 'auto' }}>
          {openMenu === 'species' && (
            <div style={{
              position: 'absolute',
              bottom: BUBBLE + 16,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column-reverse',
              gap: GAP,
              alignItems: 'center',
            }}>
              {SPECIES_LIST.map((s, i) => (
                <button
                  key={s}
                  onClick={() => { setSpecies(s); close(); }}
                  style={{
                    ...optionStyle(species === s, i),
                    background: species === s
                      ? 'rgba(255,255,255,0.3)'
                      : 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    padding: '8px',
                  }}
                  aria-label={s}
                >
                  <div style={{ width: 30, height: 30 }}>
                    <TummyIcon species={s} />
                  </div>
                </button>
              ))}
            </div>
          )}
          <button
            onClick={() => toggle('species')}
            style={{
              ...previewStyle(openMenu === 'species'),
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              padding: '10px',
            }}
            aria-label="Species"
          >
            <div style={{ width: 32, height: 32 }}>
              <TummyIcon species={species} />
            </div>
          </button>
        </div>

        {/* ── Hat ───────────────────────────────────── */}
        <div style={{ position: 'relative', pointerEvents: 'auto' }}>
          {openMenu === 'hat' && (
            <div style={{
              position: 'absolute',
              bottom: BUBBLE + 16,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column-reverse',
              gap: GAP,
              alignItems: 'center',
            }}>
              {HATS.map((h, i) => (
                <button
                  key={h.id}
                  onClick={() => { setHat(h.id); close(); }}
                  style={{
                    ...optionStyle(hat === h.id, i),
                    background: hat === h.id
                      ? 'rgba(255,255,255,0.3)'
                      : 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
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
                      onError={(e) => {
                        (e.target as HTMLImageElement).replaceWith(
                          Object.assign(document.createElement('span'), {
                            textContent: h.emoji,
                            style: 'font-size:1.3rem',
                          })
                        );
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={() => toggle('hat')}
            style={{
              ...previewStyle(openMenu === 'hat'),
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
                onError={(e) => {
                  (e.target as HTMLImageElement).replaceWith(
                    Object.assign(document.createElement('span'), {
                      textContent: '🎩',
                      style: 'font-size:1.5rem',
                    })
                  );
                }}
              />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

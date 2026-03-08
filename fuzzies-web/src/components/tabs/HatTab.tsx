import React from 'react';
import { useFuzzyStore } from '../../store';
import type { Hat } from '../../store';

const HATS: { id: Hat; label: string; emoji: string }[] = [
  { id: 'none',       label: 'None',       emoji: '✨' },
  { id: 'cap',        label: 'Cap',        emoji: '🧢' },
  { id: 'magic',      label: 'Magic',      emoji: '🎩' },
  { id: 'helicopter', label: 'Copter',     emoji: '🚁' },
];

export const HatTab: React.FC = () => {
  const { hat, setHat } = useFuzzyStore();

  return (
    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', padding: '4px 0' }}>
      {HATS.map((h) => (
        <button
          key={h.id}
          onClick={() => setHat(h.id)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            padding: '12px 16px',
            borderRadius: '16px',
            border: 'none',
            background: hat === h.id ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.15)',
            boxShadow: hat === h.id ? '0 0 0 3px white' : 'none',
            cursor: 'pointer',
            transition: 'background 0.15s, box-shadow 0.15s, transform 0.15s',
            transform: hat === h.id ? 'scale(1.1)' : 'scale(1)',
            minWidth: '72px',
          }}
          aria-label={h.label}
          aria-pressed={hat === h.id}
        >
          {h.id !== 'none' ? (
            <div style={{ width: 56, height: 56, position: 'relative' }}>
              <img
                src={`/assets/hat-${h.id}.png`}
                alt={h.label}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                onError={(e) => {
                  // show emoji fallback if image not found
                  const el = e.target as HTMLImageElement;
                  el.style.display = 'none';
                  const span = document.createElement('span');
                  span.style.fontSize = '2.5rem';
                  span.textContent = h.emoji;
                  el.parentElement?.appendChild(span);
                }}
              />
            </div>
          ) : (
            <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>{h.emoji}</span>
          )}
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            color: 'white',
            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}>
            {h.label}
          </span>
        </button>
      ))}
    </div>
  );
};

import React from 'react';
import { useFuzzyStore } from '../../store';
import type { Color } from '../../store';

const COLORS: { id: Color; hex: string; label: string }[] = [
  { id: 'blue',   hex: '#8ab4e8', label: 'Blue' },
  { id: 'pink',   hex: '#f4a7c3', label: 'Pink' },
  { id: 'green',  hex: '#8fd5b0', label: 'Green' },
  { id: 'yellow', hex: '#f5d56e', label: 'Yellow' },
  { id: 'purple', hex: '#c3a0e8', label: 'Purple' },
  { id: 'orange', hex: '#f5a96e', label: 'Orange' },
];

export const ColorTab: React.FC = () => {
  const { color, setColor } = useFuzzyStore();

  return (
    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', padding: '8px 0' }}>
      {COLORS.map((c) => (
        <button
          key={c.id}
          onClick={() => setColor(c.id)}
          title={c.label}
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: c.hex,
            border: color === c.id ? '4px solid white' : '4px solid transparent',
            boxShadow: color === c.id
              ? '0 0 0 3px #666, 0 4px 12px rgba(0,0,0,0.25)'
              : '0 2px 8px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            transition: 'transform 0.15s, box-shadow 0.15s',
            transform: color === c.id ? 'scale(1.15)' : 'scale(1)',
          }}
          aria-label={c.label}
          aria-pressed={color === c.id}
        />
      ))}
    </div>
  );
};

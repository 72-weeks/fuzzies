import React from 'react';
import { useFuzzyStore } from '../../store';
import type { Species } from '../../store';
import { TummyIcon } from '../TummyIcons';

const SPECIES: { id: Species; label: string }[] = [
  { id: 'ice',     label: 'Ice' },
  { id: 'heart',   label: 'Heart' },
  { id: 'hypno',   label: 'Hypno' },
  { id: 'icecream',label: 'Cream' },
  { id: 'tv',      label: 'TV' },
  { id: 'paint',   label: 'Paint' },
];

export const SpeciesTab: React.FC = () => {
  const { species, setSpecies } = useFuzzyStore();

  return (
    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', padding: '4px 0' }}>
      {SPECIES.map((s) => (
        <button
          key={s.id}
          onClick={() => setSpecies(s.id)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            padding: '10px',
            borderRadius: '16px',
            border: 'none',
            background: species === s.id ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.15)',
            boxShadow: species === s.id ? '0 0 0 3px white' : 'none',
            cursor: 'pointer',
            transition: 'background 0.15s, box-shadow 0.15s, transform 0.15s',
            transform: species === s.id ? 'scale(1.1)' : 'scale(1)',
          }}
          aria-label={s.label}
          aria-pressed={species === s.id}
        >
          <div style={{ width: 48, height: 48 }}>
            <TummyIcon species={s.id} />
          </div>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            color: 'white',
            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}>
            {s.label}
          </span>
        </button>
      ))}
    </div>
  );
};

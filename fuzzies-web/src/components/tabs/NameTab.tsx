import React from 'react';
import { useFuzzyStore, useActiveFuzzy } from '../../store';

export const NameTab: React.FC = () => {
  const { setName } = useFuzzyStore();
  const active = useActiveFuzzy();
  const name = active?.name ?? '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name your Fuzzy..."
        maxLength={24}
        style={{
          width: '100%',
          maxWidth: '320px',
          padding: '14px 20px',
          fontSize: '1.2rem',
          fontFamily: '"Fredoka One", "Nunito", system-ui, sans-serif',
          borderRadius: '16px',
          border: '3px solid rgba(255,255,255,0.6)',
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          outline: 'none',
          textAlign: 'center',
          letterSpacing: '0.04em',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'white';
          e.target.style.background = 'rgba(255,255,255,0.3)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'rgba(255,255,255,0.6)';
          e.target.style.background = 'rgba(255,255,255,0.2)';
        }}
      />
      {name && (
        <button
          onClick={() => setName('')}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.7)',
            cursor: 'pointer',
            fontSize: '0.85rem',
            padding: '4px 8px',
          }}
        >
          Clear
        </button>
      )}
    </div>
  );
};

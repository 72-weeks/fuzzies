import React from 'react';
import { useFuzzyStore, useActiveFuzzy } from '../store';
import { FuzzyDisplay } from './FuzzyDisplay';
import { NavBubbles } from './NavBubbles';

export const EditorScreen: React.FC = () => {
  const { goToSplash, setName } = useFuzzyStore();
  const active = useActiveFuzzy();
  const name = active?.name ?? '';

  return (
    <>
      {/* Back button */}
      <button
        onClick={goToSplash}
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 110,
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.5)',
          background: 'rgba(0,0,0,0.25)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          color: 'white',
          fontSize: '1.4rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Back to family"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 4L7 10L13 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Name input */}
      <div style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 110,
      }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name your Fuzzy..."
          maxLength={24}
          style={{
            padding: '10px 20px',
            fontSize: '1.1rem',
            fontFamily: '"Fredoka One", "Nunito", system-ui, sans-serif',
            borderRadius: '20px',
            border: '2px solid rgba(255,255,255,0.5)',
            background: 'rgba(0,0,0,0.2)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            color: 'white',
            outline: 'none',
            textAlign: 'center',
            letterSpacing: '0.04em',
            width: '220px',
          }}
        />
      </div>

      {/* Fuzzy character — centered */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: '120px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FuzzyDisplay />
      </div>

      {/* Bubble nav */}
      <NavBubbles />
    </>
  );
};

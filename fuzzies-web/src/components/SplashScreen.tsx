import React from 'react';
import { useFuzzyStore } from '../store';
import { MiniatureFuzzy } from './MiniatureFuzzy';

export const SplashScreen: React.FC = () => {
  const { fuzzies, createFuzzy, setActiveFuzzy, deleteFuzzy } = useFuzzyStore();

  const isEmpty = fuzzies.length === 0;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '32px',
      padding: '24px',
    }}>
      <h1 style={{
        fontFamily: '"Fredoka One", "Nunito", system-ui, sans-serif',
        fontSize: '2.5rem',
        color: 'white',
        textShadow: '0 2px 12px rgba(0,0,0,0.3)',
        letterSpacing: '0.05em',
        margin: 0,
      }}>
        Fuzzy Family
      </h1>

      {isEmpty ? (
        <button
          onClick={createFuzzy}
          className="bounce-btn"
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            border: '4px solid rgba(255,255,255,0.8)',
            background: 'rgba(255,255,255,0.35)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            fontSize: '3rem',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(255,255,255,0.3), 0 4px 16px rgba(0,0,0,0.2)',
          }}
          aria-label="Create your first Fuzzy"
        >
          +
        </button>
      ) : (
        <div className="hide-scrollbar" style={{
          width: '100%',
          maxWidth: '100vw',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
          display: 'flex',
          gap: '24px',
          padding: '20px 40px',
          alignItems: 'center',
        }}>
          {fuzzies.map((f) => (
            <div
              key={f.id}
              style={{
                scrollSnapAlign: 'center',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <MiniatureFuzzy
                fuzzy={f}
                size={200}
                onClick={() => setActiveFuzzy(f.id)}
              />
              <span style={{
                fontFamily: '"Fredoka One", "Nunito", system-ui, sans-serif',
                fontSize: '1.2rem',
                color: 'white',
                textShadow: '0 1px 4px rgba(0,0,0,0.3)',
              }}>
                {f.name || 'Unnamed'}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); deleteFuzzy(f.id); }}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: '12px',
                  padding: '6px 16px',
                  color: 'white',
                  fontSize: '0.8rem',
                  fontFamily: '"Fredoka One", "Nunito", system-ui, sans-serif',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
          ))}

          {/* Add button at end */}
          <button
            onClick={createFuzzy}
            style={{
              flexShrink: 0,
              scrollSnapAlign: 'center',
              width: 80,
              height: 80,
              borderRadius: '50%',
              border: '3px solid rgba(255,255,255,0.8)',
              background: 'rgba(255,255,255,0.35)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              fontSize: '2.5rem',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(255,255,255,0.3), 0 4px 16px rgba(0,0,0,0.2)',
            }}
            aria-label="Create new Fuzzy"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

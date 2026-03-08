import React, { useState } from 'react';
import { useFuzzyStore, useActiveFuzzy } from '../store';
import { FuzzyDisplay } from './FuzzyDisplay';
import { NavBubbles } from './NavBubbles';

export const EditorScreen: React.FC = () => {
  const { goToSplash, setName } = useFuzzyStore();
  const active = useActiveFuzzy();
  const name = active?.name ?? '';
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [draftName, setDraftName] = useState('');

  const handleBack = () => {
    if (!name) {
      setDraftName('');
      setShowNamePrompt(true);
    } else {
      goToSplash();
    }
  };

  const handleSaveName = () => {
    setName(draftName.trim());
    setShowNamePrompt(false);
    goToSplash();
  };

  const handleSkipName = () => {
    setShowNamePrompt(false);
    goToSplash();
  };

  return (
    <>
      {/* Back button */}
      <button
        onClick={handleBack}
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

      {/* Name prompt modal */}
      {showNamePrompt && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          onClick={handleSkipName}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '2px solid rgba(255,255,255,0.3)',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              width: '300px',
              maxWidth: '85vw',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            <h2 style={{
              fontFamily: '"Fredoka One", "Nunito", system-ui, sans-serif',
              fontSize: '1.5rem',
              color: 'white',
              textShadow: '0 2px 8px rgba(0,0,0,0.25)',
              margin: 0,
            }}>
              Name your Fuzzy!
            </h2>
            <input
              type="text"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              placeholder="Enter a name..."
              maxLength={24}
              autoComplete="off"
              name="fuzzy-name"
              autoFocus
              onKeyDown={(e) => { if (e.key === 'Enter' && draftName.trim()) handleSaveName(); }}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '1.1rem',
                fontFamily: '"Fredoka One", "Nunito", system-ui, sans-serif',
                borderRadius: '16px',
                border: '2px solid rgba(255,255,255,0.5)',
                background: 'rgba(0,0,0,0.2)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                color: 'white',
                outline: 'none',
                textAlign: 'center',
                letterSpacing: '0.04em',
              }}
            />
            <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
              <button
                onClick={handleSkipName}
                style={{
                  flex: 1,
                  padding: '12px',
                  fontSize: '1rem',
                  fontFamily: '"Fredoka One", "Nunito", system-ui, sans-serif',
                  borderRadius: '14px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Skip
              </button>
              <button
                onClick={handleSaveName}
                style={{
                  flex: 1,
                  padding: '12px',
                  fontSize: '1rem',
                  fontFamily: '"Fredoka One", "Nunito", system-ui, sans-serif',
                  borderRadius: '14px',
                  border: '2px solid rgba(255,255,255,0.6)',
                  background: 'rgba(255,255,255,0.25)',
                  color: 'white',
                  cursor: 'pointer',
                  boxShadow: '0 0 12px rgba(255,255,255,0.15)',
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

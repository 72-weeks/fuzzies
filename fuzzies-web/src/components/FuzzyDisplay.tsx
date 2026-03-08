import React from 'react';
import { useFuzzyStore, assetUrl } from '../store';

const DISPLAY_SIZE = 640;

export const FuzzyDisplay: React.FC = () => {
  const { color, species, hat, name } = useFuzzyStore();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      pointerEvents: 'none',
      userSelect: 'none',
    }}>
      {name && (
        <div style={{
          fontFamily: '"Fredoka One", "Nunito", system-ui, sans-serif',
          fontSize: '2rem',
          fontWeight: 700,
          color: 'white',
          textShadow: '0 2px 8px rgba(0,0,0,0.25)',
          letterSpacing: '0.05em',
        }}>
          {name}
        </div>
      )}

      <div
        className="fuzzy-bob"
        style={{
          position: 'relative',
          width: `${DISPLAY_SIZE}px`,
          height: `${DISPLAY_SIZE}px`,
        }}
      >
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
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = assetUrl('body-blue.png');
          }}
        />

        {/* Layer 2: Tummy icon (generated image overlay) */}
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
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />

        {/* Layer 3: Hat accessory (generated image overlay) */}
        {hat !== 'none' && (
          <img
            src={assetUrl(`hat-${hat}.png`)}
            alt={`${hat} hat`}
            style={{
              position: 'absolute',
              top: '15%',
              left: '53%',
              transform: 'translateX(-50%)',
              width: '25%',
              objectFit: 'contain',
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}
      </div>
    </div>
  );
};

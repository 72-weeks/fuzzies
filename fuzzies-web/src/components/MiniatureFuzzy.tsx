import React from 'react';
import { assetUrl } from '../store';
import type { FuzzyConfig, Hat } from '../store';

const HAT_POSITIONS: Record<Exclude<Hat, 'none'>, { top: string; left: string; width: string }> = {
  cap:        { top: '12%', left: '53%', width: '28%' },
  magic:      { top: '5%',  left: '53%', width: '22%' },
  helicopter: { top: '8%',  left: '53%', width: '30%' },
};

interface Props {
  fuzzy: FuzzyConfig;
  size?: number;
  onClick?: () => void;
}

export const MiniatureFuzzy: React.FC<Props> = ({ fuzzy, size = 200, onClick }) => {
  const hatPos = fuzzy.hat !== 'none' ? HAT_POSITIONS[fuzzy.hat] : null;

  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        width: size,
        height: size,
        cursor: onClick ? 'pointer' : 'default',
        flexShrink: 0,
      }}
    >
      {/* Wings */}
      {fuzzy.species === 'dragon' && (
        <img
          src={assetUrl('wings-dragon.png')}
          alt=""
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '56%',
            height: 'auto',
            objectFit: 'contain',
            zIndex: 0,
          }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      )}

      {/* Body */}
      <img
        src={assetUrl(`body-${fuzzy.color}.png`)}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          zIndex: 1,
        }}
        onError={(e) => { (e.target as HTMLImageElement).src = assetUrl('body-blue.png'); }}
      />

      {/* Tummy */}
      <img
        src={assetUrl(`tummy-${fuzzy.species}.png`)}
        alt=""
        style={{
          position: 'absolute',
          bottom: '24%',
          left: '55%',
          transform: 'translateX(-52%)',
          width: '10%',
          height: '10%',
          objectFit: 'contain',
          opacity: 0.9,
          zIndex: 2,
        }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />

      {/* Hat */}
      {fuzzy.hat !== 'none' && hatPos && (
        <img
          src={assetUrl(`hat-${fuzzy.hat}.png`)}
          alt=""
          style={{
            position: 'absolute',
            top: hatPos.top,
            left: hatPos.left,
            transform: 'translateX(-50%)',
            width: hatPos.width,
            objectFit: 'contain',
            zIndex: 3,
          }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      )}
    </div>
  );
};

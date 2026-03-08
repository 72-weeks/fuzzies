import React, { useState } from 'react';
import { ColorTab } from './tabs/ColorTab';
import { SpeciesTab } from './tabs/SpeciesTab';
import { HatTab } from './tabs/HatTab';
import { NameTab } from './tabs/NameTab';

type Tab = 'color' | 'species' | 'hat' | 'name';

const TABS: { id: Tab; label: string }[] = [
  { id: 'color',   label: 'Color' },
  { id: 'species', label: 'Species' },
  { id: 'hat',     label: 'Hat' },
  { id: 'name',    label: 'Name' },
];

export const BottomSheet: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('color');
  const [open, setOpen] = useState(true);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transform: open ? 'translateY(0)' : 'translateY(calc(100% - 60px))',
        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {/* Handle / drag bar */}
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '44px',
          cursor: 'pointer',
          background: 'rgba(80, 60, 120, 0.55)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '20px 20px 0 0',
          borderTop: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <div style={{
          width: '40px',
          height: '5px',
          background: 'rgba(255,255,255,0.5)',
          borderRadius: '3px',
        }}/>
      </div>

      {/* Sheet body */}
      <div
        style={{
          background: 'rgba(80, 60, 120, 0.55)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          padding: '0 16px 32px',
          borderTop: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        {/* Tab bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          padding: '12px 0 16px',
        }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setOpen(true); }}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                border: 'none',
                fontFamily: '"Fredoka One", "Nunito", system-ui, sans-serif',
                fontSize: '0.95rem',
                fontWeight: 600,
                letterSpacing: '0.03em',
                cursor: 'pointer',
                transition: 'background 0.15s, transform 0.15s',
                background: activeTab === tab.id
                  ? 'rgba(255,255,255,0.9)'
                  : 'rgba(255,255,255,0.2)',
                color: activeTab === tab.id ? '#5a3ea0' : 'white',
                transform: activeTab === tab.id ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ minHeight: '100px' }}>
          {activeTab === 'color'   && <ColorTab />}
          {activeTab === 'species' && <SpeciesTab />}
          {activeTab === 'hat'     && <HatTab />}
          {activeTab === 'name'    && <NameTab />}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Background } from './scene/Background';
import { FuzzyDisplay } from './components/FuzzyDisplay';
import { NavBubbles } from './components/NavBubbles';

const App: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Three.js background */}
      <Background />

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
    </div>
  );
};

export default App;

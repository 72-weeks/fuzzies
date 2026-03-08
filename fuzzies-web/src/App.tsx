import React from 'react';
import { Background } from './scene/Background';
import { SplashScreen } from './components/SplashScreen';
import { EditorScreen } from './components/EditorScreen';
import { useFuzzyStore } from './store';

const App: React.FC = () => {
  const screen = useFuzzyStore((s) => s.screen);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Three.js background */}
      <Background />

      {screen === 'splash' ? <SplashScreen /> : <EditorScreen />}
    </div>
  );
};

export default App;

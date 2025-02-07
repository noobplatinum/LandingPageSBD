import { useState } from 'react';
import './App.css';
import Header from './Comps/Header';
import ScrollLine from './Comps/ScrollLine';

function App() {
  const [] = useState(0);

  return (
    <>
      <Header />
      <ScrollLine />
      <div style={{ height: '6000vh' }}>
        {/* Other content */}
        <p style={{ marginTop: '100vh' }}>Scroll down to see the effect</p>
      </div>
    </>
  );
}

export default App;
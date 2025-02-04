import { useState } from 'react';
import './App.css';
import Header from './Comps/Header';

function App() {
  const [] = useState(0);

  return (
    <>
      <Header />
      <div>
        {/* Other content */}
      </div>
    </>
  );
}

export default App;
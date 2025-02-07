import { useState } from 'react';
import './App.css';
import Header from './Comps/Header';
import { TracingBeam } from './components/ui/tracing-beam';
import Profile from './Comps/Profile';

function App() {
  const [] = useState(0);

  return (
    <>
      <Header />
      <TracingBeam className="
        -ml-30             /* mobile (default: <640px) */
        sm:-ml-40         /* sm: 640px (~23% of 2xl) */
        md:-ml-65         /* md: 768px (~40% of 2xl) */
        lg:-ml-75    /* lg: 1024px (~60% of 2xl) */
        xl:-ml-90    /* xl: 1280px (~83% of 2xl) */
        2xl:-ml-110       /* 2xl: 1536px (current) */
        mt-10
        -z-10">
        
        <Profile/>
        <div className="h-[600vh]">
          {/* Other content */}
        </div>
      
      </TracingBeam>

    </>
  );
}

export default App;
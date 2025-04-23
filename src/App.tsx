import './App.css';
import Header from './Comps/Header';
import { AuroraBackground } from './components/ui/aurora-background';
import ScrollProgressTracker from './components/ui/ScrollProgressTracker';
import { ThemeProvider, useTheme } from './lib/ThemeContext';
import Footer from './Comps/Footer';
import ProductGrid from './Comps/ProductGrid';
import Newsletter from './Comps/NewsLetter';
import AboutMeBox from './Comps/AboutMeBox';
import ProjectsBox from './Comps/ProjectBox';
import TechStack from './Comps/TechBox';

const AppContent = () => {
  const { darkMode } = useTheme();

  return (
    <AuroraBackground darkMode={darkMode}>
      <div className={`flex flex-col min-h-screen w-full ${darkMode ? 'dark' : ''}`}>
        <Header />

        <div className="h-[150px]"></div>

        <ScrollProgressTracker />

        <main className="flex flex-col items-center">
          <div id="aboutMe" className="w-[90vw] max-w-7xl mt-[6vh] flex flex-col md:flex-row justify-center items-center gap-8 scroll-mt-24">
            <AboutMeBox />
          </div>

          <div className="h-[100px]"></div>

          <div className="w-[90vw] max-w-7xl mt-[6vh] flex flex-col justify-center items-center gap-8">
            <h2 className={`text-4xl font-bold text-center mb-8 ${darkMode ? 'text-amber-300' : 'text-purple-600'}`}>
              Featured
            </h2>
            <ProjectsBox />
          </div>

          <div className='h-[60px]'></div>
          <TechStack />
          <div className='h-[60px]'></div>

          <div className="h-[100px]"></div>

          <div id="browseItems" className="w-[90vw] max-w-7xl mt-[6vh] flex flex-col justify-center items-center gap-8 scroll-mt-24">
            <h2 className={`text-4xl font-bold text-center mb-8 ${darkMode ? 'text-amber-300' : 'text-purple-600'}`}>
              Temukan Barang-Barang
            </h2>
            <ProductGrid />
          </div>

          <div className="h-[100px]"></div>

          <div id="newsletter" className="w-[90vw] max-w-7xl mt-[8vh] flex flex-col justify-center items-center scroll-mt-24">
            <Newsletter />
          </div>

          <div className="h-[100px]"></div>

          <div className="w-[90vw] max-w-7xl flex flex-col md:flex-row justify-center items-center gap-0 mt-[8vh]">
            <div className="md:w-[90%]">
              <Footer />
            </div>
          </div>

          <div className="h-[50px]"></div>
        </main>
      </div>
    </AuroraBackground>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
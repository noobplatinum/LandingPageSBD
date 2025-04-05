import './App.css';
import Header from './Comps/Header';
import { MaskContainer } from './components/ui/svg-mask-effect';
import { AuroraBackground } from './components/ui/aurora-background';
import ScrollProgressTracker from './components/ui/ScrollProgressTracker';
import { ThemeProvider, useTheme } from './lib/ThemeContext';
import Profile from './Comps/Profile';
import LineDecoration from './components/ui/LineDecoration';
import AboutMeBox from './Comps/AboutMeBox';
import ExperienceBox from './Comps/ExperienceBox';
import Timeline from './Comps/Timeline';
import ProjectsBox from './Comps/ProjectBox';
import TechStack from './Comps/TechBox';
import GlobeImplementation from './components/ui/GlobeImplementation';
import SocialButtons from './components/ui/SocialButton';

const AppContent = () => {
  const { darkMode } = useTheme();

  return (
    <AuroraBackground darkMode={darkMode}>
      <div className={`flex flex-col min-h-screen w-full ${darkMode ? 'dark' : ''}`}>
        <Header />
        <ScrollProgressTracker />
        <main className="flex flex-col items-center">
          <div className="w-[70vw] overflow-hidden mt-[5vh]">
            <LineDecoration
              className="mb-[1.5vh]"
              color={darkMode ? "white" : "black"}
            />

            <MaskContainer
              revealText={
                <p className={`mx-auto max-w-4xl text-center text-4xl font-bold transition-colors duration-500 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  The first rule of MRR Club is you do not talk about MRR Club. The
                  second rule of MRR Club is you DO NOT talk about MRR Club.
                </p>
              }
              className="w-full h-[30vh] rounded-md border-transparent"
            >
              Discover the power of{" "}
              <span className={darkMode ? "text-amber-400" : "text-purple-600"}>modern UIs</span> with native CSS
              variables and container queries with{" "}
              <span className={darkMode ? "text-amber-400" : "text-purple-600"}>advanced animations</span>.
            </MaskContainer>

            <LineDecoration
              className="mt-[1.5vh]"
              color={darkMode ? "white" : "black"}
            />
          </div>

          <div className="w-[90vw] max-w-7xl mt-[6vh] flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="md:w-[90%]">
              <AboutMeBox />
            </div>
            <div className="md:w-[40%] flex justify-center">
              <Profile />
            </div>

          </div>

          <div className="w-[90vw] max-w-7xl mt-[6vh] flex flex-col md:flex-row justify-center items-center gap-8">
            <ExperienceBox
              title="A Brief Overview"
              paragraphs={[
                "With over 5 years of experience in software development...",
                "I hold a Bachelor's degree in Computer Science..."
              ]}
              cvLink="https://drive.google.com/your-cv-link"
            />
          </div>

          <div className="w-[70vw] flex justify-center items-center mt-[6vh]">
            {/* Timeline section */}
            <div className="w-[85vw] max-w-7xl mt-[12vh] mb-[6vh]">
              <h2 className={`text-4xl font-bold text-center mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>              My Journey
              </h2>
              <Timeline />
              <GlobeImplementation/>

            </div>
          </div>
          <div className="w-[90vw] max-w-7xl mt-[6vh] flex flex-col justify-center items-center gap-8">
            <h2 className={`text-4xl font-bold text-center mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              My Projects
            </h2>
            <ProjectsBox />
          </div>

          <div className="w-[90vw] max-w-7xl mt-[6vh] flex flex-col justify-center items-center gap-8">
            <h2 className={`text-4xl font-bold text-center mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Connect With Me
            </h2>
            <SocialButtons className="mb-8" />
          </div>

          <TechStack />

          <div className="w-full h-[1000px]"></div>
        </main>
      </div>
    </AuroraBackground>
  );
};

// Root App component with Theme Provider
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
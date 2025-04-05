import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../lib/ThemeContext';
import { Github } from 'lucide-react';
import '../lib/projectbox.css';
import profilepath from '../assets/sandbox.png';

// Icons for the tech stack
import { DiReact, DiNodejs, DiMongodb } from "react-icons/di";
import { SiExpress, SiEjs, SiFirebase } from "react-icons/si";
import { IconType } from 'react-icons/lib';

// Project type definition
interface ProjectIcon {
  name: string;
  icon: IconType;
}

interface Project {
  id: number;
  title: string;
  role: string;
  images: string[]; // Array of image URLs
  icons: ProjectIcon[];
  description: string[];
  githubLink: string;
}

// Sample projects data
const projectsData: Project[] = [
  {
    id: 1,
    title: "Ecommerce Website",
    role: "Backend Engineer",
    images: [
      profilepath,
      profilepath,
      profilepath,
      profilepath
    ],
    icons: [
      { name: "React", icon: DiReact },
      { name: "MongoDB", icon: DiMongodb },
      { name: "Express", icon: SiExpress },
      { name: "Node.js", icon: DiNodejs }
    ],
    description: [
      "Project made for an online retail business focusing on user experience.",
      "Implemented secure payment processing and inventory management systems.",
      "Reduced page load times by 40% through optimization techniques.",
      "Created responsive design for mobile and desktop users."
    ],
    githubLink: "https://github.com/username/ecommerce-project"
  },
  {
    id: 2,
    title: "Social Media Dashboard",
    role: "Full Stack Developer",
    images: [
      profilepath,
      profilepath,
      profilepath
    ],
    icons: [
      { name: "Vue", icon: SiEjs },
      { name: "Firebase", icon: SiFirebase },
      { name: "Node.js", icon: DiNodejs }
    ],
    description: [
      "Developed a real-time analytics dashboard for social media managers.",
      "Implemented OAuth integration with major social platforms.",
      "Created a custom charting library for visualizing engagement metrics.",
      "Built a notification system for real-time alerts on campaign performance."
    ],
    githubLink: "https://github.com/username/social-dashboard"
  }
];

const ProjectsBox: React.FC = () => {
  const { darkMode } = useTheme();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(0);
  const projectBoxRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animateImage, setAnimateImage] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [animatingProject, setAnimatingProject] = useState(false);
  const [projectAnimationDirection, setProjectAnimationDirection] = useState<'left' | 'right'>('right');

  const [leftSideVisible, setLeftSideVisible] = useState(true);
  const [dividerVisible, setDividerVisible] = useState(true);
  const [rightSideVisible, setRightSideVisible] = useState(true);

  const currentProject = projectsData[currentProjectIndex];

  // Function to handle project navigation with animations
  const navigateProject = (direction: 'next' | 'prev') => {
    if (animatingProject) return;
    
    setAnimatingProject(true);
    setProjectAnimationDirection(direction === 'next' ? 'left' : 'right');
    
    // First, make everything invisible immediately
    setLeftSideVisible(false);
    setDividerVisible(false);
    setRightSideVisible(false);
    
    // Small delay before starting fade out animations
    setTimeout(() => {
      // Now trigger fade-out animations (they'll start from opacity 0)
      // Wait for left side to complete its animation
      setTimeout(() => {
        // Wait for divider animation
        setTimeout(() => {
          // Wait for right side animation
          setTimeout(() => {
            // Now update the project index (content is already invisible)
            if (direction === 'next') {
              setCurrentProjectIndex((prev) => 
                prev === projectsData.length - 1 ? 0 : prev + 1
              );
            } else {
              setCurrentProjectIndex((prev) => 
                prev === 0 ? projectsData.length - 1 : prev - 1
              );
            }
            
            // Reset selected image when changing projects
            setSelectedImageIndex(0);
            setPreviousImageIndex(0);
            
            // Small delay before starting fade in sequence
            setTimeout(() => {
              // Show left side first
              setLeftSideVisible(true);
              
              // Show divider after a delay
              setTimeout(() => {
                setDividerVisible(true);
                
                // Show right side after another delay
                setTimeout(() => {
                  setRightSideVisible(true);
                  
                  // Animation completed
                  setTimeout(() => {
                    setAnimatingProject(false);
                  }, 400); // Time for right side to fully fade in
                  
                }, 100); // Delay before right side starts
                
              }, 100); // Delay before divider starts
              
            }, 50); // Small preparation delay
            
          }, 200); // Right side fade out duration
        }, 100); // Divider fade out duration
      }, 400); // Left side fade out duration
    }, 20); // Small preparation delay
  };

  // Function to handle direct project selection (clicking dots)
  const selectProject = (index: number) => {
    if (animatingProject || index === currentProjectIndex) return;
    
    setAnimatingProject(true);
    setProjectAnimationDirection(index > currentProjectIndex ? 'left' : 'right');
    
    // Wait for exit animations to complete (includes delays for right side)
    setTimeout(() => {
      setCurrentProjectIndex(index);
      
      // Reset selected image when changing projects
      setSelectedImageIndex(0);
      setPreviousImageIndex(0);
      
      // Wait a bit then start entrance animation
      setTimeout(() => {
        setAnimatingProject(false);
      }, 50);
    }, 600); 
    navigateProject(index > currentProjectIndex ? 'next' : 'prev');
  };

  // Function to handle image selection with animation
  const selectImage = (index: number) => {
    if (index === selectedImageIndex) return;
    
    setPreviousImageIndex(selectedImageIndex);
    setSlideDirection(index > selectedImageIndex ? 'right' : 'left');
    setAnimateImage(true);
    setSelectedImageIndex(index);
    
    // Reset animation flag after animation completes
    setTimeout(() => setAnimateImage(false), 500);
  };

  // Set up intersection observer for visibility detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set visibility state when 60% of element is visible
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.6);
      },
      { threshold: 0.6 }
    );

    if (projectBoxRef.current) {
      observer.observe(projectBoxRef.current);
    }

    return () => {
      if (projectBoxRef.current) {
        observer.unobserve(projectBoxRef.current);
      }
    };
  }, []);

  // Calculate thumbnail highlight position
  const getHighlightStyle = () => {
    return {
      transform: `translateX(${selectedImageIndex * (90 + 16)}px)` // thumbnail width + gap
    };
  };

  return (
    <div 
      ref={projectBoxRef}
      className={`
        projects-box
        ${darkMode ? 'dark-box' : 'light-box'}
        ${isVisible ? 'box-visible' : 'box-hidden'}
      `}
      style={ {height: "850px"} }
    >
      <div className="project-content">        
        <div className="projects-layout ">
          {/* Left side - Images with improved animation control */}
          <div 
            className={`
              project-images
              ${animatingProject ? 
                (projectAnimationDirection === 'left' ? 'fade-out-left' : 'fade-out-right') : 
                (leftSideVisible ? (projectAnimationDirection === 'left' ? 'fade-in-right' : 'fade-in-left') : 'invisible')
              }
            `}
          >
            {/* Main image display */}
            <div className="main-image-container">
              <img 
                src={currentProject.images[selectedImageIndex]} 
                alt={`${currentProject.title} - view ${selectedImageIndex + 1}`} 
                className={`main-image ${animateImage ? (slideDirection === 'right' ? 'slide-in-right' : 'slide-in-left') : ''}`}
              />
            </div>
            
            {/* Thumbnail selector row with highlighting */}
            <div className="thumbnail-container">
              <div 
                className="thumbnail-highlight" 
                style={{ transform: `translateX(${selectedImageIndex * (90 + 16)}px)` }}
              />
              {currentProject.images.map((img, index) => (
                <div 
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${index + 1}`} 
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Vertical divider with improved animation control */}
          {window.innerWidth >= 768 && (
            <div 
              className={`
                vertical-divider
                divider-transition
                ${animatingProject ? 'fade-out' : (dividerVisible ? 'fade-in' : 'invisible')}
              `}
            />
          )}
          
          {/* Right side - Project Info with improved animation control */}
          <div 
            className={`
              project-info
              ${animatingProject ? 
                (projectAnimationDirection === 'left' ? 'fade-out-left' : 'fade-out-right') : 
                (rightSideVisible ? (projectAnimationDirection === 'left' ? 'fade-in-right' : 'fade-in-left') : 'invisible')
              }
            `}
          >
            {/* GitHub button */}
            <a 
              href={currentProject.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                github-button
                ${darkMode ? 'dark-github-button' : 'light-github-button'}
                ${isVisible ? 'github-button-visible' : 'github-button-hidden'}
              `}
            >
              <Github size={28} />
            </a>
            
            {/* Project content remains the same */}
            <h2 className={`project-title theme-transition-text ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {currentProject.title}
            </h2>
            <h3 className={`project-role theme-transition-text ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {currentProject.role}
            </h3>
            
            <div className="tech-icons">
              {currentProject.icons.map((icon, index) => (
                <div 
                  key={index} 
                  className="tech-icon"
                  title={icon.name}
                >
                  <icon.icon 
                    className={`${darkMode ? 'text-amber-300' : 'text-purple-600'}`} 
                    size={28} 
                  />
                </div>
              ))}
            </div>
            
            <div className="project-divider"></div>
            
            <div className="project-description">
              {currentProject.description.map((paragraph, index) => (
                <p 
                  key={index} 
                  className={`theme-transition-text ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  • {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
        
        {/* Navigation controls remain the same */}
        <div className="project-nav">
          <button 
            onClick={() => navigateProject('prev')}
            className="nav-button"
            aria-label="Previous project"
            disabled={animatingProject}
          >
            <span>&lt;</span>
          </button>
          
          <div className="nav-dots">
            {projectsData.map((_, index) => (
              <div 
                key={index}
                className={`nav-dot ${currentProjectIndex === index ? 'active' : ''}`}
                onClick={() => selectProject(index)}
                role="button"
                tabIndex={0}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            onClick={() => navigateProject('next')}
            className="nav-button"
            aria-label="Next project"
            disabled={animatingProject}
          >
            <span>&gt;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsBox;
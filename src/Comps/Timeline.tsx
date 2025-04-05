import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../lib/ThemeContext';
import TimelinePart from '../components/ui/TimelinePart';
import '../lib/timeline.css';
import profilepath from '../assets/profile.jpg';
import buspath from '../assets/sandbox.png';
import TimelineMiniCard from '../components/ui/TimelineMiniCard';

// Defining card positions with more spacing
const decorativeMiniCards = [
  // Past section decorations
  { 
    verticalPosition: 10, 
    horizontalPosition: -300, 
    scale: 2.5, 
    rotationX: 15, 
    rotationY: -25, 
    rotationZ: -5, 
    delay: 500,
    miniCardIndex: 1
  },
  { 
    verticalPosition: 25, 
    horizontalPosition: 350, 
    scale: 2.0, 
    rotationX: -10, 
    rotationY: 30, 
    rotationZ: 8, 
    delay: 700,
    miniCardIndex: 6
  },
  
  // Present section decorations
  { 
    verticalPosition: 45, 
    horizontalPosition: -380, 
    scale: 2.2, 
    rotationX: -22, 
    rotationY: -35, 
    rotationZ: -10, 
    delay: 900,
    miniCardIndex: 4
  },
  { 
    verticalPosition: 60, 
    horizontalPosition: 320, 
    scale: 1.8, 
    rotationX: 5, 
    rotationY: 45, 
    rotationZ: -5, 
    delay: 1100,
    miniCardIndex: 8
  },
  { 
    verticalPosition: 75, 
    horizontalPosition: -420, 
    scale: 2.5, 
    rotationX: 25, 
    rotationY: -15, 
    rotationZ: 12, 
    delay: 1300,
    miniCardIndex: 3
  },
  
  // Future section decorations
  { 
    verticalPosition: 85, 
    horizontalPosition: 400, 
    scale: 2.8, 
    rotationX: -30, 
    rotationY: 20, 
    rotationZ: 8, 
    delay: 1500,
    miniCardIndex: 7
  },
  { 
    verticalPosition: 95, 
    horizontalPosition: -350, 
    scale: 2.0, 
    rotationX: 10, 
    rotationY: -40, 
    rotationZ: -12, 
    delay: 1700,
    miniCardIndex: 2
  },
];

const useResponsiveDisplay = () => {
  const [shouldDisplayMiniCards, setShouldDisplayMiniCards] = useState(true);
  
  useEffect(() => {
    const checkScreenWidth = () => {
      // Hide on mobile/small screens
      setShouldDisplayMiniCards(window.innerWidth > 768);
    };
    
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    return () => window.removeEventListener('resize', checkScreenWidth);
  }, []);
  
  return shouldDisplayMiniCards;
};

const Timeline: React.FC = () => {
  const { darkMode } = useTheme();
  const shouldDisplayMiniCards = useResponsiveDisplay();
  
  // Individual visibility state for each card
  const [cardVisibility, setCardVisibility] = useState<boolean[]>(
    Array(decorativeMiniCards.length).fill(false)
  );
  
  // References to track card positions
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Set up intersection observer to track each card individually
  useEffect(() => {
    // Skip if we're not displaying cards at all
    if (!shouldDisplayMiniCards) return;
    
    // Create observer with 70% threshold
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const index = cardRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1) {
            setCardVisibility(prev => {
              const newVisibility = [...prev];
              newVisibility[index] = entry.isIntersecting;
              return newVisibility;
            });
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.7 // 70% visibility threshold
      }
    );
    
    // Observe all card placeholders
    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => observer.disconnect();
  }, [shouldDisplayMiniCards]);

  return (
    <div className="timeline-container relative w-[100vw]" ref={timelineRef}>
      {/* Card visibility markers (invisible placeholders for intersection observer) */}
      {shouldDisplayMiniCards && decorativeMiniCards.map((card, index) => (
        <div 
          key={`card-marker-${index}`}
          ref={el => cardRefs.current[index] = el}
          style={{
            position: 'absolute',
            top: `calc(${card.verticalPosition}vh + 200px)`,
            left: '50%',
            width: '10px',
            height: '10px',
            opacity: 0
          }}
          aria-hidden="true"
        />
      ))}
      
      {/* Actual mini cards */}
      {shouldDisplayMiniCards && decorativeMiniCards.map((card, index) => (
        <TimelineMiniCard
          key={`mini-card-${index}`}
          verticalPosition={card.verticalPosition}
          horizontalPosition={card.horizontalPosition}
          scale={card.scale}
          rotationX={card.rotationX}
          rotationY={card.rotationY}
          rotationZ={card.rotationZ}
          delay={card.delay}
          miniCardIndex={card.miniCardIndex}
          isVisible={cardVisibility[index]}
        />
      ))}

      <TimelinePart
        romanNumeral="I"
        subtitle="The Past"
        categories={[
          {
            title: "Overview",
            entries: [
              {
                title: "Debate Club",
                logoUrl: "/logos/debate.png",
                position: "Active Member",
                accomplishments: [
                  "Participated in 15+ debate competitions",
                  "Received Best Speaker award at regional tournament",
                  "Developed strong public speaking and argumentation skills"
                ],
                dateRange: "2016-2019",
                hoverCard: {
                  side: 'right',
                  imageUrl: profilepath,
                  content: "Graduating with honors",
                  scale: 1.5, // Scale up to 120%
                  horizontalOffset: 150,
                  verticalOffset: -15
                }
              }
            ]
          },
          {
            title: "Extracurricular",
            entries: [
              // ...other entries
              {
                title: "Debate Club",
                logoUrl: "/logos/debate.png",
                position: "Active Member",
                accomplishments: [
                  "Participated in 15+ debate competitions",
                  "Received Best Speaker award at regional tournament",
                  "Developed strong public speaking and argumentation skills"
                ],
                dateRange: "2016-2019",
                hoverCard: {
                  side: 'left',
                  imageUrl: buspath,
                  content: "Receiving the regional debate championship trophy",
                  scale: 2, // Scale down to 70% of original size
                  horizontalOffset: -150, // Add 20px of horizontal offset
                  verticalOffset: 30
                }
              }
            ]
          }
        ]}
      />
      
      <TimelinePart
        romanNumeral="II"
        subtitle="The Present"
        categories={[
          {
            title: "Full-Time",
            entries: [
              {
                title: "Robotics Team",
                logoUrl: "/logos/robotics.png",
                position: "Hardware Senior",
                accomplishments: [
                  "Made a 35% efficiency upgrade to the team's power systems",
                  "Selected and mentored 12 members for the hardware division",
                  "Led development of award-winning autonomous navigation system"
                ],
                dateRange: "2022-Present"
              },
              {
                title: "CSCenter Data Sciences",
                logoUrl: "/logos/data.png",
                position: "Head of Machine Learning",
                accomplishments: [
                  "Implemented neural network models with 93% accuracy",
                  "Supervised a team of 5 ML researchers",
                  "Published 2 papers on predictive analytics in education"
                ],
                dateRange: "2021-2022"
              },
              {
                title: "Digital Labs",
                logoUrl: "/logos/lab.png",
                position: "Lab Assistant",
                accomplishments: [
                  "Coordinator of Computer Science Practicums",
                  "Overseen 25+ lab sessions for undergraduate students",
                  "Developed improved curriculum for intro programming courses"
                ],
                dateRange: "2020-2021"
              }
            ]
          },
          {
            title: "Volunteering",
            entries: [
              {
                title: "Computer Charity",
                logoUrl: "/logos/charity1.png",
                position: "Techno Staff",
                accomplishments: [
                  "Refurbished 50+ computers for underprivileged schools",
                  "Taught basic computer skills to 100+ community members",
                  "Developed a tracking system for donated equipment"
                ],
                dateRange: "2021-Present"
              },
              {
                title: "Supercomputer Charity",
                logoUrl: "/logos/charity2.png",
                position: "Techno Coordinator",
                accomplishments: [
                  "Organized 3 community tech workshops",
                  "Setup open-access computing centers in rural areas",
                  "Created documentation for sustainable tech practices"
                ],
                dateRange: "2020-2021"
              }
            ]
          },
          {
            title: "Competitions",
            entries: [
              {
                title: "Web3 Hackathon",
                logoUrl: "/logos/hackathon.png",
                position: "Backend Engineer",
                accomplishments: [
                  "Developed all backend operations for decentralized app",
                  "Won $10,000 prize for most innovative solution",
                  "Reached 1st place among 50+ competing teams"
                ],
                dateRange: "2023",
              },
              {
                title: "AI Challenge",
                logoUrl: "/logos/ai.png",
                position: "Team Lead",
                accomplishments: [
                  "Created ML model for predictive healthcare diagnostics",
                  "Achieved 2nd place in international competition",
                  "Model achieved 97% accuracy on test data"
                ],
                dateRange: "2022"
              }
            ]
          }
        ]}
      />
      
      <TimelinePart
        romanNumeral="III"
        subtitle="The Beyond"
        categories={[

        ]}
        isLastPart={true}
      />
    </div>
  );
};

export default Timeline;
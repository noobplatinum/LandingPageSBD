import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import LineDecoration from '@/components/ui/LineDecoration';
import { motion, AnimatePresence } from 'framer-motion';
// Import icons from react-icons
import {
    SiPython, SiJavascript, SiTypescript, SiRust, SiCplusplus, SiGo,
    SiReact, SiNextdotjs, SiVuedotjs, SiTailwindcss, SiHtml5, SiCss3,
    SiNodedotjs, SiExpress, SiDjango, SiFlask, SiFastapi, SiSpring,
    SiMongodb, SiPostgresql, SiMysql, SiRedis, SiFirebase, SiAwsamplify,
    SiDocker, SiKubernetes, SiGit, SiAmazon as SiAws, SiMicrobit, SiGooglecloud
} from 'react-icons/si';
import { FaCode, FaLaptopCode, FaServer, FaDatabase, FaCogs } from 'react-icons/fa';

// Define tech category types
type TechCategory = 'Languages' | 'Frontend' | 'Backend' | 'Databases' | 'Misc';
type TransitionType = 'category' | 'tech' | 'none';

// Define tech item structure
interface TechItem {
    name: string;
    icon: React.ReactNode;
    description?: string;
}

// Define category data structure
interface CategoryData {
    name: TechCategory;
    icon: React.ReactNode;
    items: TechItem[];
}

const TechStack: React.FC = () => {
    const { darkMode } = useTheme();
    const [activeCategory, setActiveCategory] = useState<TechCategory>('Languages');
    const [selectedTech, setSelectedTech] = useState<string | null>(null);
    const [displayTitle, setDisplayTitle] = useState<string>('Languages');
    const [transitionType, setTransitionType] = useState<TransitionType>('none');
    const [previousCategory, setPreviousCategory] = useState<TechCategory | null>(null);
    const categoriesRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    // Add a new state to prevent rendering the new category until it's ready
    const [pendingCategory, setPendingCategory] = useState<TechCategory | null>(null);
    const [shouldRenderNewCategory, setShouldRenderNewCategory] = useState(true);

    // Combined animation state to prevent multiple operations
    const [isAnimating, setIsAnimating] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [titleGlowIntensity, setTitleGlowIntensity] = useState(0);
    const [activeGlow, setActiveGlow] = useState<string | null>(null);

    // EXACT colors matching ExperienceBox
    const themeColors = {
        primary: darkMode ? '#fcd34d' : '#9333ea', // amber-300 or purple-600
        secondary: darkMode ? 'rgba(255, 193, 7, 0.4)' : 'rgba(148, 105, 190, 0.4)',
        bg: darkMode ? 'bg-amber-400' : 'bg-purple-600',
        bgHover: darkMode ? 'bg-amber-500' : 'bg-purple-700',
        bgSelected: darkMode ? 'bg-amber-400' : 'bg-purple-600',
        text: darkMode ? 'text-amber-300' : 'text-purple-700',
        iconSelected: darkMode ? 'text-gray-900' : 'text-white',
        iconNormal: darkMode ? 'text-amber-300' : 'text-purple-700',
        border: darkMode ? 'border-amber-300/50' : 'border-purple-500/50',
        borderHover: darkMode ? 'border-amber-300/30' : 'border-purple-300/30',
        boxShadow: darkMode
            ? '0 0 15px rgba(255, 193, 7, 0.3)'
            : '0 0 15px rgba(148, 105, 190, 0.3)',
        textGlow: darkMode
            ? '0 0 20px rgba(255, 193, 7, 0.9), 0 0 10px rgba(255, 193, 7, 0.7)'
            : '0 0 20px rgba(147, 51, 234, 0.9), 0 0 10px rgba(147, 51, 234, 0.7)',
        textGlowLight: darkMode
            ? '0 0 10px rgba(255, 193, 7, 0.5), 0 0 5px rgba(255, 193, 7, 0.3)'
            : '0 0 10px rgba(147, 51, 234, 0.5), 0 0 5px rgba(147, 51, 234, 0.3)',
    };

    // Tech categories data with react-icons
    const categories: CategoryData[] = [
        {
            name: 'Languages',
            icon: <FaCode size={24} />,
            items: [
                { name: 'Python', icon: <SiPython size={42} /> },
                { name: 'JavaScript', icon: <SiJavascript size={42} /> },
                { name: 'TypeScript', icon: <SiTypescript size={42} /> },
                { name: 'Rust', icon: <SiRust size={42} /> },
                { name: 'C++', icon: <SiCplusplus size={42} /> },
                { name: 'Go', icon: <SiGo size={42} /> }
            ]
        },
        {
            name: 'Frontend',
            icon: <FaLaptopCode size={24} />,
            items: [
                { name: 'React', icon: <SiReact size={42} /> },
                { name: 'Next.js', icon: <SiNextdotjs size={42} /> },
                { name: 'Vue', icon: <SiVuedotjs size={42} /> },
                { name: 'Tailwind', icon: <SiTailwindcss size={42} /> },
                { name: 'HTML5', icon: <SiHtml5 size={42} /> },
                { name: 'CSS3', icon: <SiCss3 size={42} /> }
            ]
        },
        {
            name: 'Backend',
            icon: <FaServer size={24} />,
            items: [
                { name: 'Node.js', icon: <SiNodedotjs size={42} /> },
                { name: 'Express', icon: <SiExpress size={42} /> },
                { name: 'Django', icon: <SiDjango size={42} /> },
                { name: 'Flask', icon: <SiFlask size={42} /> },
                { name: 'FastAPI', icon: <SiFastapi size={42} /> },
                { name: 'Spring', icon: <SiSpring size={42} /> }
            ]
        },
        {
            name: 'Databases',
            icon: <FaDatabase size={24} />,
            items: [
                { name: 'MongoDB', icon: <SiMongodb size={42} /> },
                { name: 'PostgreSQL', icon: <SiPostgresql size={42} /> },
                { name: 'MySQL', icon: <SiMysql size={42} /> },
                { name: 'Redis', icon: <SiRedis size={42} /> },
                { name: 'Firebase', icon: <SiFirebase size={42} /> },
                { name: 'DynamoDB', icon: <SiAwsamplify size={42} /> }
            ]
        },
        {
            name: 'Misc',
            icon: <FaCogs size={24} />,
            items: [
                { name: 'Docker', icon: <SiDocker size={42} /> },
                { name: 'Kubernetes', icon: <SiKubernetes size={42} /> },
                { name: 'Git', icon: <SiGit size={42} /> },
                { name: 'AWS', icon: <SiAws size={42} /> },
                { name: 'Azure', icon: <SiMicrobit size={42} /> },
                { name: 'Google Cloud', icon: <SiGooglecloud size={42} /> }
            ]
        }
    ];

    // Find active category data
    const activeCategoryData = categories.find(cat => cat.name === activeCategory) || categories[0];
    const previousCategoryData = previousCategory ? categories.find(cat => cat.name === previousCategory) : null;
    const pendingCategoryData = pendingCategory ? categories.find(cat => cat.name === pendingCategory) : null;

    // Cleanup function for any ongoing animations
    useEffect(() => {
        const timeoutIds: number[] = [];

        return () => {
            // Clear any pending timeouts when component unmounts
            while (timeoutIds.length) {
                const id = timeoutIds.pop();
                if (id !== undefined) clearTimeout(id);
            }
        };
    }, []);

    const handleTechClick = (techName: string) => {
        if (isAnimating) return; // Prevent multiple operations

        setIsAnimating(true); // Block all interactions

        // Immediately set selected tech and start transition
        setSelectedTech(techName);
        setTransitionType('tech');

        // Quick blur transition for title
        const t1 = setTimeout(() => {
            setDisplayTitle(techName);

            // Apply glow after highlight transition completes with 0.5s delay
            const t2 = setTimeout(() => {
                setTitleGlowIntensity(1); // Add the glow effect with transition

                // Activate box glow after title glow
                const t3 = setTimeout(() => {
                    setActiveGlow(techName);
                }, 100);

                // Reset after 3.5 seconds
                const t4 = setTimeout(() => {
                    setTitleGlowIntensity(0); // Remove glow
                    setActiveGlow(null); // Remove box glow

                    const t5 = setTimeout(() => {
                        setDisplayTitle(activeCategory);
                        setSelectedTech(null);
                        setIsAnimating(false); // Re-enable interactions
                    }, 300);
                }, 3500);
            }, 500);
        }, 300);
    };

    const handleCategoryChange = (category: TechCategory) => {
        if (category !== activeCategory && !isAnimating) {
            setIsAnimating(true); // Block all interactions
            setIsTransitioning(true);

            // Instead of immediately changing activeCategory, store it as pending
            setPendingCategory(category);

            // First, hide the current grid completely
            setShouldRenderNewCategory(false);

            // Start by hiding the current content with blur
            setPreviousCategory(activeCategory);

            // Delay the actual category change until after current content is hidden
            setTimeout(() => {
                // Now that previous content is fading out, update the active category
                setActiveCategory(category);
                setTransitionType('category');

                // Scroll the category into view
                if (categoriesRef.current) {
                    const categoryElement = categoriesRef.current.querySelector(`[data-category="${category}"]`);
                    if (categoryElement) {
                        categoryElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                            inline: 'center'
                        });
                    }
                }

                // Update display title with delay to avoid race conditions
                setTimeout(() => {
                    setDisplayTitle(category);

                    // Delay rendering the new category content until previous has fully faded
                    setTimeout(() => {
                        // Allow new content to render now that previous is fully gone
                        setShouldRenderNewCategory(true);

                        // Wait a frame for the browser to process the render
                        requestAnimationFrame(() => {
                            // Then immediately in the next frame, start fading it in
                            setTimeout(() => {
                                setPreviousCategory(null);
                                setIsTransitioning(false);
                                setPendingCategory(null);

                                // Re-enable interactions after all transitions complete
                                setTimeout(() => {
                                    setIsAnimating(false);
                                }, 100);
                            }, 50);
                        });
                    }, 300);
                }, 150);
            }, 300);
        }
    };

    // Title variants with blur effects
    const titleVariants = {
        enter: {
            opacity: 0,
            filter: "blur(12px)"
        },
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            filter: "blur(12px)",
            transition: {
                duration: 0.3,
                ease: "easeIn"
            }
        }
    };

    // Update display title when active category changes (only if not in tech selection)
    useEffect(() => {
        if (!selectedTech && !isAnimating) {
            setDisplayTitle(activeCategory);
        }
    }, [activeCategory, selectedTech, isAnimating]);

    return (
        <div className="w-[90vw] max-w-7xl flex flex-col items-center justify-center mb-[10vh]">
            <h2 className={`text-4xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                My Techstack
            </h2>

            {/* Category tabs with slider functionality */}
            <div
                ref={categoriesRef}
                className="flex overflow-x-auto no-scrollbar pb-2 gap-4 mb-10 w-full max-w-3xl snap-x snap-mandatory scroll-pl-6"
            >
                <div className="flex px-4 md:px-0 md:justify-center w-full">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            data-category={category.name}
                            onClick={() => handleCategoryChange(category.name)}
                            className={`relative flex items-center gap-2 px-6 py-3 rounded-xl backdrop-blur-sm transition-all duration-300 min-w-max snap-center
                              ${activeCategory === category.name
                                    ? (darkMode
                                        ? 'bg-amber-400/20 text-amber-300 border border-amber-300/30'
                                        : 'bg-purple-600/20 text-purple-700 border border-purple-600/30')
                                    : (darkMode
                                        ? 'bg-gray-800/30 text-gray-300 border border-gray-700/30 hover:bg-amber-400/10 hover:text-amber-300/80'
                                        : 'bg-gray-200/30 text-gray-600 border border-gray-300/30 hover:bg-purple-600/10 hover:text-purple-700/80')}
                            `}
                            disabled={isAnimating} // Disable during any animation
                        >
                            <span className="mr-1">{category.icon}</span>
                            {category.name}
                            {activeCategory === category.name && (
                                <motion.div
                                    className="absolute -bottom-1 left-1/2 w-8 h-1 transform -translate-x-1/2 rounded-full"
                                    layoutId="categoryIndicator"
                                    style={{
                                        background: themeColors.primary,
                                        boxShadow: darkMode
                                            ? '0 0 10px rgba(255, 193, 7, 0.5)'
                                            : '0 0 10px rgba(148, 105, 190, 0.5)'
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Title with blur transitions and variable glow intensity */}
            <div
                ref={titleRef}
                className="relative h-20 mb-6 flex items-center justify-center overflow-hidden w-full"
            >
                <AnimatePresence mode="wait">
                    <motion.h3
                        key={displayTitle}
                        initial="enter"
                        animate="visible"
                        exit="exit"
                        variants={titleVariants}
                        className={`text-3xl font-bold text-center ${themeColors.text} w-full`}
                        style={{
                            textShadow: titleGlowIntensity > 0 ? themeColors.textGlow : 'none',
                            transition: "text-shadow 0.5s ease-in-out" // Added transition for glow
                        }}
                    >
                        {displayTitle}
                    </motion.h3>
                </AnimatePresence>
            </div>

            {/* Glowing divider */}
            <div className="relative w-[80%] max-w-3xl mb-12">
                <LineDecoration
                    color={themeColors.primary}
                    opacity={0.7}
                    height={2}
                    className="w-full relative"
                />
            </div>

            {/* Tech grid using improved transition approach */}
            <div className="relative min-h-[350px] w-full max-w-5xl">
                {previousCategoryData && isTransitioning && (
                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 w-full absolute inset-0"
                        style={{
                            opacity: 1,
                            filter: 'blur(0px)',
                            animation: "fadeOutBlur 400ms forwards ease-out",
                            WebkitBackfaceVisibility: 'hidden',
                            backfaceVisibility: 'hidden',
                            willChange: 'opacity, filter',
                            pointerEvents: 'none'
                        }}
                    >
                        {previousCategoryData.items.map((tech) => (
                            <div
                                key={`previous-${tech.name}`}
                                className={`relative aspect-square rounded-2xl backdrop-blur-sm
                    transform scale-75 flex items-center justify-center
                    ${darkMode
                                        ? 'bg-black/20'
                                        : 'bg-white/10'}`}
                                style={{
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    borderColor: darkMode ? 'rgba(255, 193, 7, 0.3)' : 'rgba(147, 51, 234, 0.3)',
                                    animation: "fadeOutBlur 400ms forwards ease-out",
                                    // Remove transition on border-color to keep it consistent
                                }}
                            >
                                <div className={`w-full h-full flex items-center justify-center 
                    ${darkMode ? 'text-amber-300' : 'text-purple-700'}`}>
                                    {tech.icon}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Current category grid - hidden initially during transition */}
                {shouldRenderNewCategory && (
                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 w-full absolute inset-0"
                        style={{
                            opacity: isTransitioning ? 0 : 1,
                            filter: isTransitioning ? 'blur(12px)' : 'blur(0px)',
                            visibility: isTransitioning ? 'hidden' : 'visible',
                            transition: "opacity 400ms ease-in-out, filter 400ms ease-in-out, visibility 0s",
                            transitionDelay: isTransitioning ? "0s" : "0ms",
                            WebkitBackfaceVisibility: 'hidden',
                            backfaceVisibility: 'hidden',
                            willChange: 'opacity, filter, visibility',
                            pointerEvents: isAnimating ? 'none' : 'auto'
                        }}
                    >
                        {activeCategoryData.items.map((tech) => {
                            const isSelected = selectedTech === tech.name;
                            const isGlowing = activeGlow === tech.name;
                            return (
                                <div
                                    key={`${activeCategory}-${tech.name}`}
                                    onClick={() => handleTechClick(tech.name)}
                                    className={`relative aspect-square rounded-2xl backdrop-blur-sm border
                                        transform scale-75 cursor-pointer flex items-center justify-center transition-all duration-300
                                        ${isSelected
                                            ? (darkMode
                                                ? 'bg-amber-400 border-amber-300'
                                                : 'bg-purple-600 border-purple-500')
                                            : (darkMode
                                                ? 'bg-black/20 border-gray-700/30 hover:border-amber-300/30'
                                                : 'bg-white/10 border-gray-200 hover:border-purple-300/30')}`}
                                    style={{
                                        boxShadow: isGlowing ? themeColors.boxShadow : 'none',
                                        backdropFilter: isTransitioning ? 'blur(8px)' : 'blur(0px)', // Add this line
                                        WebkitBackdropFilter: isTransitioning ? 'blur(8px)' : 'blur(0px)', // For Safari
                                        transition: "box-shadow 0.5s ease-in-out, background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, backdrop-filter 0.4s ease-in-out", // Add backdrop-filter here
                                    }}
                                >
                                    <GlowingEffect
                                        blur={0}
                                        borderWidth={3}
                                        spread={60}
                                        glow={isGlowing}
                                        disabled={false}
                                        proximity={100}
                                        inactiveZone={0.2}
                                        intensity={isGlowing ? 2.5 : 1.5}
                                        movementDuration={1.5}
                                    />

                                    {/* Tech icon */}
                                    <div
                                        className={`w-full h-full flex items-center justify-center transition-all duration-300
                                            ${isSelected
                                                ? (darkMode ? 'text-gray-900' : 'text-white')
                                                : (darkMode ? 'text-amber-300' : 'text-purple-700')}`}
                                    >
                                        {tech.icon}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes fadeOutBlur {
                            0% { opacity: 1; filter: blur(0px); }
                            100% { opacity: 0; filter: blur(12px); border-color: ${darkMode ? 'rgba(255, 193, 7, 0.3)' : 'rgba(147, 51, 234, 0.3)'}; }
                        }
                            
                        @keyframes fadeOutBorder {
                            0% { border-color: inherit; }
                            50% { border-color: inherit; }
                            100% { border-color: transparent; }
                        }
                        `
                }} />
            </div>
        </div>
    );
};

export default TechStack;
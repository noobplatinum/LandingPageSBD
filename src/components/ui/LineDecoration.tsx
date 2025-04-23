import React from 'react';

interface LineDecorationProps {
  className?: string;
  color?: string;
  opacity?: number;
  height?: number;
}

const LineDecoration: React.FC<LineDecorationProps> = ({ 
  className = '',
  color = 'currentColor',
  opacity = 0.4,
  height = 1
}) => {
  return (
    <svg 
      className={`w-full ${className}`}
      height={height} 
      viewBox="0 0 1000 1" 
      preserveAspectRatio="none"
    >
      <line 
        x1="0" 
        y1="0.5" 
        x2="1000" 
        y2="0.5" 
        stroke={color} 
        strokeWidth="1"
        opacity={opacity}
      />
    </svg>
  );
};

export default LineDecoration;
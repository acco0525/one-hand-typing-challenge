
import React from 'react';
import { Hand, Finger } from '../types';
import { FINGER_SVG_COLORS } from '../constants';

interface HandVisualProps {
  hand: Hand;
  activeFinger: Finger | null;
}

const FingerPath: React.FC<{
    d: string;
    finger: Finger;
    activeFinger: Finger | null;
    transformOrigin: string;
    transform: string;
}> = ({ d, finger, activeFinger, transformOrigin, transform }) => {
    const baseFill = '#fde68a'; // amber-200
    const strokeColor = '#d97706'; // amber-600
    const isActive = activeFinger === finger;
    
    return (
         <path
            d={d}
            fill={isActive ? FINGER_SVG_COLORS[finger] : baseFill}
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
            className="transition-all duration-200"
            style={{
                transformOrigin: transformOrigin,
                transform: isActive ? transform : 'none',
            }}
        />
    );
};


const HandVisual: React.FC<HandVisualProps> = ({ hand, activeFinger }) => {
  const isLeft = hand === Hand.Left;
  
  return (
    <div className="w-full flex justify-center items-center p-4 min-h-[220px]">
      <svg
        width="250"
        height="280"
        viewBox="0 0 250 280"
        style={{
          transition: 'transform 0.3s ease-in-out',
          transform: isLeft ? 'scaleX(-1)' : 'none',
        }}
        aria-label={`${hand === Hand.Left ? '左手' : '右手'}のイラスト`}
        role="img"
      >
        <g>
            {/* Palm */}
            <path 
                d="M 60 270 C 10 270, 10 150, 40 120 C 80 80, 160 80, 200 120 C 230 150, 230 270, 180 270 Z"
                fill="#fef3c7" // amber-100
                stroke="#d97706" // amber-600
                strokeWidth="3"
            />
            {/* Fingers */}
            <FingerPath
                d="M45,150 C35,110 45,70 60,65 C75,60 85,80 80,150 Z"
                finger={Finger.Index}
                activeFinger={activeFinger}
                transformOrigin="62px 150px"
                transform="translateY(-10px) scale(1.05)"
            />
             <FingerPath
                d="M80,150 C75,80 85,45 100,40 C115,35 125,60 120,150 Z"
                finger={Finger.Middle}
                activeFinger={activeFinger}
                transformOrigin="100px 150px"
                transform="translateY(-10px) scale(1.05)"
            />
             <FingerPath
                d="M120,150 C115,90 125,65 140,65 C155,65 160,90 155,150 Z"
                finger={Finger.Ring}
                activeFinger={activeFinger}
                transformOrigin="137px 150px"
                transform="translateY(-10px) scale(1.05)"
            />
             <FingerPath
                d="M155,150 C155,100 160,85 170,85 C180,85 185,100 180,150 Z"
                finger={Finger.Pinky}
                activeFinger={activeFinger}
                transformOrigin="167px 150px"
                transform="translateY(-10px) scale(1.05)"
            />
             {/* Thumb */}
             <FingerPath
                d="M60,260 C40,260 25,230 35,200 C45,170 70,170 80,200 C90,230 80,260 60,260 Z"
                finger={Finger.Thumb}
                activeFinger={activeFinger}
                transformOrigin="60px 220px"
                transform="translateX(-15px) rotate(-15deg) scale(1.05)"
            />
        </g>
      </svg>
    </div>
  );
};

export default HandVisual;

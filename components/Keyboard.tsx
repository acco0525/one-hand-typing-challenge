
import React from 'react';
import { Hand, Finger } from '../types';
import { KEYBOARD_LAYOUT, FINGER_COLORS, FINGER_COLORS_LIGHT, ONE_HANDED_FINGER_MAP } from '../constants';

interface KeyboardProps {
  hand: Hand;
  activeKey: string | null;
}

const Key: React.FC<{
    char: string;
    isHighlighted: boolean;
    finger: Finger | undefined;
}> = ({ char, isHighlighted, finger }) => {
    
    const baseClasses = 'h-14 w-14 md:h-16 md:w-16 flex items-center justify-center font-mono text-xl font-bold rounded-lg shadow-md border-b-4 transition-all duration-100 transform';
    
    let stateClasses = 'bg-slate-200 border-slate-400 text-slate-700';

    if (finger) {
        stateClasses = isHighlighted 
            ? `${FINGER_COLORS[finger]} scale-110 -translate-y-1 shadow-xl`
            : FINGER_COLORS_LIGHT[finger];
    }

    return (
        <div className={`${baseClasses} ${stateClasses}`}>
            {char.toUpperCase()}
        </div>
    );
};


const Keyboard: React.FC<KeyboardProps> = ({ hand, activeKey }) => {
  const getFingerForKey = (char: string): Finger | undefined => {
    return ONE_HANDED_FINGER_MAP[hand][char.toLowerCase()];
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-slate-300 rounded-xl shadow-inner">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {row.map((char) => {
            return (
              <Key
                key={char}
                char={char}
                isHighlighted={activeKey === char}
                finger={getFingerForKey(char)}
              />
            );
          })}
        </div>
      ))}
       <div className="flex gap-2 mt-2">
            {(() => {
                const spaceFinger = Finger.Thumb;
                const isSpaceActive = activeKey === ' ';
                
                let spaceClasses = FINGER_COLORS_LIGHT[spaceFinger];
                if(isSpaceActive) {
                    spaceClasses = FINGER_COLORS[spaceFinger] + ' scale-110 -translate-y-1 shadow-xl';
                }

                return (
                    <div className={`h-14 w-72 flex items-center justify-center font-mono text-xl font-bold rounded-lg shadow-md border-b-4 transition-all duration-100 transform ${spaceClasses}`}>
                        SPACE
                    </div>
                );
            })()}
       </div>
    </div>
  );
};

export default Keyboard;

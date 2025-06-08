import React from 'react';
import { CodexDataItem } from '../types';

interface WitnessNodeProps {
  onClick: () => void;
  data: CodexDataItem;
}

const WitnessNode: React.FC<WitnessNodeProps> = ({ onClick, data }) => {
  // Placeholder for sound trigger
  const handleClick = () => {
    if (data.soundId) {
      console.log(`Placeholder: Play sound ${data.soundId}`);
    }
    onClick();
  };

  return (
    <div 
      className="absolute top-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center cursor-pointer group"
      onClick={handleClick}
      aria-label="Witness Node"
      role="button"
    >
      <div className="w-6 h-6 bg-electric-gold rounded-full witness-glow-animated transition-all duration-500 group-hover:scale-125"></div>
      <span className="mt-2 text-xs font-cormorant text-electric-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        The Witness
      </span>
    </div>
  );
};

export default WitnessNode;
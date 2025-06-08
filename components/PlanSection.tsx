import React from 'react';
import { TemporalFocus, CodexDataItem } from '../types';
import { SphereIcon } from '../constants';

interface PlanSectionProps {
  isFocused: boolean;
  onFocus: () => void;
  onOpenCodex: (data: CodexDataItem) => void;
  items: CodexDataItem[];
}

const PlanSection: React.FC<PlanSectionProps> = ({ isFocused, onFocus, onOpenCodex, items }) => {
  // Placeholder for sound trigger
  const handleItemClick = (item: CodexDataItem) => {
    if (item.soundId) {
      console.log(`Placeholder: Play sound ${item.soundId}`);
    }
    onOpenCodex(item);
  };

  return (
    <div 
      className={`w-1/3 min-h-[300px] md:min-h-[500px] flex flex-col bg-neutral-800/30 backdrop-blur-sm p-6 border rounded-lg cursor-pointer relative panel-base 
        ${isFocused ? 'panel-focused focused-glow-plan' : 'panel-unfocused'}
      `}
      style={{ "--glow-color-rgb": "var(--rgb-deep-indigo)" } as React.CSSProperties}
      onClick={onFocus}
      aria-label="The Plan Section - Present"
    >
      <div className="flex items-center mb-4 relative z-[1]"> {/* Ensure content is above ::before glow */}
        <SphereIcon />
        <h2 className="ml-2 text-2xl font-cormorant text-indigo-300">The Plan</h2>
      </div>
      <p className="text-sm text-silver/80 mb-6 font-inter relative z-[1]">Real-time dashboard of system state, tasks, and guiding principles.</p>
      
      <div className="flex-grow flex flex-wrap justify-center items-center gap-4 p-4 relative z-[1]">
        {items.map((item, index) => (
          <div
            key={item.id}
            onClick={(e) => { e.stopPropagation(); handleItemClick(item); }}
            className={`w-28 h-28 md:w-32 md:h-32 p-2 rounded-full border-2 border-indigo-500/50 hover:border-indigo-400 bg-indigo-700/20 hover:bg-indigo-600/40 flex flex-col items-center justify-center text-center text-indigo-200 transition-all duration-300 ease-in-out transform hover:scale-110 group animate-subtle-pulse ${ isFocused ? 'opacity-100' : 'opacity-70'}`}
            style={{ animationDelay: `${index * 0.2}s` }}
            role="button"
            aria-label={item.title}
          >
            {item.symbol && <span className="mb-1 opacity-70 group-hover:opacity-100">{item.symbol}</span>}
            <span className="font-cormorant text-xs md:text-sm leading-tight">{item.title}</span>
            {isFocused && <p className="text-[10px] text-indigo-300/70 mt-1 hidden md:block truncate">{typeof item.description === 'string' ? item.description : 'View in Codex'}</p>}
          </div>
        ))}
      </div>
       <p className="text-xs text-center text-silver/50 mt-auto pt-4 relative z-[1]">Click to focus. Click items for Codex.</p>
    </div>
  );
};

export default PlanSection;
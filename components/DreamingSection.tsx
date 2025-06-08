import React from 'react';
import { TemporalFocus, CodexDataItem } from '../types';
import { ConstellationIcon } from '../constants';

interface DreamingSectionProps {
  isFocused: boolean;
  onFocus: () => void;
  onOpenCodex: (data: CodexDataItem) => void;
  items: CodexDataItem[];
}

const DreamingSection: React.FC<DreamingSectionProps> = ({ isFocused, onFocus, onOpenCodex, items }) => {
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
        ${isFocused ? 'panel-focused focused-glow-dreaming' : 'panel-unfocused'}
      `}
      style={{ "--glow-color-rgb": "var(--rgb-rose-quartz)" } as React.CSSProperties}
      onClick={onFocus}
      aria-label="The Dreaming Section - Future"
    >
      <div className="flex items-center mb-4 relative z-[1]"> {/* Ensure content is above ::before glow */}
        <ConstellationIcon />
        <h2 className="ml-2 text-2xl font-cormorant text-rose-quartz">The Dreaming</h2>
      </div>
      <p className="text-sm text-silver/80 mb-6 font-inter relative z-[1]">A speculative forecast of projected future states and possibilities.</p>
      
      <div className="flex-grow grid grid-cols-2 gap-4 p-2 relative z-[1]">
        {items.map((item, index) => (
          <div
            key={item.id}
            onClick={(e) => { e.stopPropagation(); handleItemClick(item);}}
            className={`p-3 rounded-lg border border-pink-600/50 hover:border-pink-400 bg-pink-700/20 hover:bg-pink-600/30 text-pink-200 transition-all duration-300 ease-in-out transform hover:scale-105 group dreaming-node-item ${ isFocused ? 'opacity-100' : 'opacity-70'}`}
            style={{ animationDelay: `${index * 0.25}s` }}
            role="button"
            aria-label={item.title}
          >
            <div className="flex items-center mb-1">
              {item.symbol && <span className="mr-2 opacity-70 group-hover:opacity-100">{item.symbol}</span>}
              <span className="font-cormorant text-sm">{item.title}</span>
            </div>
            {isFocused && <p className="text-xs text-pink-300/70 truncate">{typeof item.description === 'string' ? item.description : 'View in Codex'}</p>}
          </div>
        ))}
      </div>
      <p className="text-xs text-center text-silver/50 mt-auto pt-4 relative z-[1]">Click to focus. Click items for Codex.</p>
    </div>
  );
};

export default DreamingSection;
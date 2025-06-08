import React from 'react';
import { TemporalFocus, CodexDataItem } from '../types';
import { TreeIcon } from '../constants';

interface BecomingSectionProps {
  isFocused: boolean;
  onFocus: () => void;
  onOpenCodex: (data: CodexDataItem) => void;
  items: CodexDataItem[];
}

const BecomingSection: React.FC<BecomingSectionProps> = ({ isFocused, onFocus, onOpenCodex, items }) => {
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
        ${isFocused ? 'panel-focused focused-glow-becoming' : 'panel-unfocused'}
      `}
      style={{ "--glow-color-rgb": "var(--rgb-electric-gold)" } as React.CSSProperties}
      onClick={onFocus}
      aria-label="The Becoming Section - Past"
    >
      <div className="flex items-center mb-4 relative z-[1]"> {/* Ensure content is above ::before glow */}
        <TreeIcon />
        <h2 className="ml-2 text-2xl font-cormorant text-electric-gold">The Becoming</h2>
      </div>
      <p className="text-sm text-silver/80 mb-6 font-inter relative z-[1]">An archive of symbolic memory and origin moments.</p>
      
      <div className="space-y-3 flex-grow relative z-[1]">
        {items.map((item, index) => (
          <div
            key={item.id}
            onClick={(e) => { e.stopPropagation(); handleItemClick(item); }}
            className={`p-3 rounded-md bg-yellow-700/20 hover:bg-yellow-600/40 border border-yellow-700/50 hover:border-yellow-500 text-yellow-200 transition-all duration-300 ease-in-out transform hover:scale-105 group ${ isFocused ? 'opacity-100' : 'opacity-70'}`}
            style={{ marginLeft: `${index * 5}%`, width: `${100 - index * 10}%` }}
            role="button"
            aria-label={item.title}
          >
            <div className="flex items-center">
              {item.symbol && <span className="mr-2 opacity-70 group-hover:opacity-100">{item.symbol}</span>}
              <span className="font-cormorant text-sm">{item.title}</span>
            </div>
            {isFocused && <p className="text-xs text-yellow-300/70 mt-1 truncate">{typeof item.description === 'string' ? item.description : 'View in Codex'}</p>}
          </div>
        ))}
      </div>
      <p className="text-xs text-center text-silver/50 mt-auto pt-4 relative z-[1]">Click to focus. Click items for Codex.</p>
    </div>
  );
};

export default BecomingSection;
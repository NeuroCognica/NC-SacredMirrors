import React from 'react';
import { CodexDataItem } from '../types';

interface CodexModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CodexDataItem | null;
}

const CodexModal: React.FC<CodexModalProps> = ({ isOpen, onClose, data }) => {
  // No early return for data to allow fade-out animation
  // if (!isOpen || !data) return null; 

  // Placeholder for sound trigger on close
  const handleClose = () => {
    console.log(`Placeholder: Play sound codex_close`);
    onClose();
  };

  return (
    <div 
      className={`fixed inset-0 bg-obsidian-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-8 transition-opacity duration-500 ease-in-out
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="codex-title"
      aria-hidden={!isOpen}
    >
      <div 
        className={`bg-neutral-900/95 border border-electric-gold/50 rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] p-6 sm:p-8 flex flex-col text-silver overflow-hidden codex-modal-glow
          transition-all duration-500 ease-in-out
          ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {data && ( // Render content only if data exists, to prevent issues during fade-out
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                {data.symbol && <span className="mr-3 text-electric-gold text-2xl">{data.symbol}</span>}
                <h2 id="codex-title" className="text-3xl font-cormorant text-electric-gold text-glow-gold">{data.title}</h2>
              </div>
              <button 
                onClick={handleClose} 
                className="text-silver hover:text-electric-gold transition-colors text-2xl"
                aria-label="Close Codex"
              >
                &times;
              </button>
            </div>
            
            <div className="overflow-y-auto codex-scroll pr-2 space-y-4 flex-grow">
              <p className="text-sm text-neutral-400 font-inter mb-2">Type: <span className="text-rose-quartz">{data.type}</span> {data.timestamp && `| Timestamp: ${data.timestamp}`}</p>
              
              {typeof data.description === 'string' ? (
                <p className="text-base font-inter text-glow-silver leading-relaxed">{data.description}</p>
              ) : (
                <div className="text-base font-inter text-glow-silver leading-relaxed">{data.description}</div>
              )}

              {data.details && (
                <div className="mt-4 pt-4 border-t border-neutral-700">
                  <h3 className="text-xl font-cormorant text-electric-gold/90 mb-2">Details:</h3>
                  {typeof data.details === 'string' ? (
                    <p className="text-sm font-inter text-neutral-300 leading-relaxed">{data.details}</p>
                  ) : (
                    <div className="text-sm font-inter text-neutral-300 leading-relaxed">{data.details}</div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-700 text-center">
              <p className="text-xs text-neutral-500 font-inter">AURA OS Codex Entry</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CodexModal;
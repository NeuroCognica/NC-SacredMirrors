import React, { useState, useCallback, useEffect } from 'react';
import { TemporalFocus, CodexDataItem } from './types';
import WitnessNode from './components/WitnessNode';
import BecomingSection from './components/BecomingSection';
import PlanSection from './components/PlanSection';
import DreamingSection from './components/DreamingSection';
import CodexModal from './components/CodexModal';
import { BECOMING_DATA, PLAN_DATA, DREAMING_DATA, WITNESS_NODE_DATA } from './constants';

const App: React.FC = () => {
  const [focusedSection, setFocusedSection] = useState<TemporalFocus | null>(TemporalFocus.PLAN);
  const [isCodexOpen, setIsCodexOpen] = useState<boolean>(false);
  const [codexData, setCodexData] = useState<CodexDataItem | null>(null);

  const handleOpenCodex = useCallback((data: CodexDataItem) => {
    setCodexData(data);
    setIsCodexOpen(true);
    // Placeholder for sound trigger
    if (data.soundId) console.log(`Placeholder: Play sound ${data.soundId}_open_codex`);
    else console.log(`Placeholder: Play sound codex_open_generic`);
  }, []);

  const handleCloseCodex = useCallback(() => {
    setIsCodexOpen(false);
    // Small delay to allow modal to fade out before clearing data, prevents flicker
    setTimeout(() => setCodexData(null), 500); // Increased delay to match new transition
  }, []);

  const handleFocusSection = useCallback((section: TemporalFocus) => {
    setFocusedSection(section);
    // Placeholder for sound trigger
    console.log(`Placeholder: Play sound focus_${section.toLowerCase()}`);
  }, []);
  
  const handleWitnessNodeClick = useCallback(() => {
    handleOpenCodex(WITNESS_NODE_DATA);
  }, [handleOpenCodex]);

  // Close Codex with Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isCodexOpen) {
        handleCloseCodex();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCodexOpen, handleCloseCodex]);

  return (
    <div className="min-h-screen bg-obsidian-black text-silver flex flex-col items-center justify-center p-4 sm:p-8 selection:bg-electric-gold selection:text-obsidian-black relative font-inter">
      <header className="w-full max-w-6xl text-center mb-4 sm:mb-8 relative z-10">
        <h1 className="text-4xl sm:text-5xl font-cormorant text-silver mb-1">AURA OS</h1>
        <p className="text-sm sm:text-base font-cormorant text-electric-gold/80">The Sacred Mirror</p>
      </header>

      <WitnessNode onClick={handleWitnessNodeClick} data={WITNESS_NODE_DATA} />

      <main className="flex flex-col md:flex-row justify-around items-stretch w-full max-w-6xl space-y-6 md:space-y-0 md:space-x-6 mt-16 relative z-10 main-content-drift">
        <BecomingSection 
          isFocused={focusedSection === TemporalFocus.BECOMING} 
          onFocus={() => handleFocusSection(TemporalFocus.BECOMING)}
          onOpenCodex={handleOpenCodex}
          items={BECOMING_DATA}
        />
        <PlanSection
          isFocused={focusedSection === TemporalFocus.PLAN}
          onFocus={() => handleFocusSection(TemporalFocus.PLAN)}
          onOpenCodex={handleOpenCodex}
          items={PLAN_DATA}
        />
        <DreamingSection
          isFocused={focusedSection === TemporalFocus.DREAMING}
          onFocus={() => handleFocusSection(TemporalFocus.DREAMING)}
          onOpenCodex={handleOpenCodex}
          items={DREAMING_DATA}
        />
      </main>

      <CodexModal isOpen={isCodexOpen} onClose={handleCloseCodex} data={codexData} />
      
      <footer className="w-full max-w-6xl text-center mt-8 sm:mt-12 text-xs text-neutral-600 relative z-10">
        <p>AURA OS Interface v0.1.1 - Enhanced Liveness</p>
        <p>Use Tab and Enter for keyboard navigation. Press Esc to close Codex.</p>
      </footer>
    </div>
  );
};

export default App;
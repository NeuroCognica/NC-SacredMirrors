
export enum TemporalFocus {
  BECOMING = 'BECOMING',
  PLAN = 'PLAN',
  DREAMING = 'DREAMING',
}

export interface CodexDataItem {
  id: string;
  title: string;
  description: string | React.ReactNode; 
  details?: string | React.ReactNode;
  symbol?: React.ReactNode;
  type: 'Past Event' | 'System Origin' | 'Current Task' | 'Guiding Law' | 'Future Projection' | 'Archetype State' | 'General Info';
  timestamp?: string;
  // Placeholder for sound trigger on interaction
  soundId?: string; 
}

// Example for future AI Agent integration
export interface SymbolicAIAgent {
  id: string;
  name: string;
  glyph: React.ReactNode;
  harmonicTone: string; // e.g., "E4"
  behaviorSignature: string; // Descriptive
}

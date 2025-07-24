import React, { createContext, useContext, useEffect, useState } from 'react';

type TabProgressContextType = {
  stepsUnlocked: number;
  unlockStep: (step: number) => void;
  isReady: boolean;
};

const STORAGE_KEY = 'stepsUnlocked';

const TabProgressContext = createContext<TabProgressContextType | undefined>(undefined);

export const TabProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stepsUnlocked, setStepsUnlocked] = useState(1);
  const [isReady, setIsReady] = useState(false);
  // Load on startup
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setStepsUnlocked(parseInt(stored));
    }
    setIsReady(true);
  }, []);

  // Unlock and persist the highest step only
  const unlockStep = (step: number) => {
    setStepsUnlocked(prev => {
      const maxStep = Math.max(prev, step);
      localStorage.setItem(STORAGE_KEY, maxStep.toString());
      return maxStep;
    });
  };

  return (
    <TabProgressContext.Provider value={{ stepsUnlocked, unlockStep, isReady }}>
      {children}
    </TabProgressContext.Provider>
  );
};

export const useTabProgress = () => {
  const ctx = useContext(TabProgressContext);
  if (!ctx) throw new Error('useTabProgress must be used inside TabProgressProvider');
  return ctx;
};

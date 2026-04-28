'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RobuxReward {
  amount: number;
  price: string;
  popular?: boolean;
}

interface RobuxContextType {
  selectedReward: RobuxReward | null;
  setSelectedReward: (reward: RobuxReward | null) => void;
  username: string;
  setUsername: (name: string) => void;
}

const RobuxContext = createContext<RobuxContextType | undefined>(undefined);

export function RobuxProvider({ children }: { children: ReactNode }) {
  const [selectedReward, setSelectedReward] = useState<RobuxReward | null>(null);
  const [username, setUsername] = useState('');

  return (
    <RobuxContext.Provider value={{ selectedReward, setSelectedReward, username, setUsername }}>
      {children}
    </RobuxContext.Provider>
  );
}

export function useRobux() {
  const context = useContext(RobuxContext);
  if (context === undefined) {
    throw new Error('useRobux must be used within a RobuxProvider');
  }
  return context;
}

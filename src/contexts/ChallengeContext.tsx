import { createContext, useState, ReactNode } from 'react';

import challenges from '../../challenges.json'

interface ChallengesProviderProps {
  children: ReactNode
}

interface ChallengeProps {
  type: 'body' | 'eye',
  description: string,
  amount: number
}

interface ChallengesContextData {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  startNewChallenge: () => void,
  resetChallenge: () => void,
  completeChallenge: () => void,
  activeChallenge: ChallengeProps,
  experienceToNextLevel: number,
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children} : ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
  
  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge)
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if(!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengeContext.Provider 
      value={{ level, currentExperience, challengesCompleted, startNewChallenge, activeChallenge, resetChallenge, experienceToNextLevel, completeChallenge }}>
      {children}
    </ChallengeContext.Provider>
  )
}
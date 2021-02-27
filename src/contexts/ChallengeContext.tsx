import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookie from 'js-cookie';

import challenges from '../../challenges.json'

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

interface ChallengesProviderProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  children: ReactNode
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children, ...rest} : ChallengesProviderProps) {
  
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 1);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 1);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookie.set('level', String(level));
    Cookie.set('currentExperience', String(currentExperience));
    Cookie.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted])
  
  function levelUp() {
    setLevel(level + 1)
  }

  function pushNotification(challenge: ChallengeProps) {
    new Audio('/notification.mp3').play()

    if(Notification.permission === 'granted') {
      new Notification("Novo desafio 👀", {
        body: `Valendo ${challenge.amount} xp`
      })
    }
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex] as ChallengeProps;

    setActiveChallenge(challenge);

    pushNotification(challenge);
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
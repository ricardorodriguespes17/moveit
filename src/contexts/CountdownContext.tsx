import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengeContext";

interface CountdownData{
  startCountdown: () => void,
  resetCountdown: () => void,
  minutes: number,
  seconds: number,
  hasFinished: boolean,
  isActive: boolean
}

interface CountdownProviderProps {
  children: ReactNode
}

export const CountdownContext = createContext({} as CountdownData);

let countdownTimeout:NodeJS.Timeout

export function CountdownProvider({ children } : CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengeContext)

  const [time, setTime] = useState(30 * 60);

  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    if(isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time])

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false);
    setTime(30 * 60);
    setHasFinished(false);
  }

  return (
    <CountdownContext.Provider value={{startCountdown, resetCountdown, minutes, seconds, hasFinished, isActive}}>
      {children}
    </CountdownContext.Provider>
  )
}
import React, { useContext, useState } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';

import styles from '../styles/components/ExperienceBar.module.css'

function ExperienceBar() {

  const { currentExperience, experienceToNextLevel } = useContext(ChallengeContext);

  const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{width: `${percentToNextLevel}%`}} />

        <span 
          className={styles.currentExperience} 
          style={{left: `${percentToNextLevel}%`, display: currentExperience === 0 || currentExperience === experienceToNextLevel ? "none": "block"}}>
          {currentExperience}xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}

export default ExperienceBar;
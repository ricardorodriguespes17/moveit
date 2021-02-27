import React, { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';

import styles from '../styles/components/CompletedChallenges.module.css'

function CompletedChallenges() {
  const { challengesCompleted } = useContext(ChallengeContext)

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}

export default CompletedChallenges;
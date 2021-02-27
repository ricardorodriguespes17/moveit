import React, { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';

import styles from '../styles/components/Profile.module.css';

function Profile() {

  const { level } = useContext(ChallengeContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/ricardorodriguespes17.png" alt="Ricardo Rodrigues" />
      <div>
        <strong>Ricardo Rodrigues</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  )
}

export default Profile
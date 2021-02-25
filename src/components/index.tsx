import React, { useState } from 'react';

import styles from '../styles/components/ExperienceBar.module.css'

function ExperienceBar() {

  const [experience, setExperience] = useState(200)

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{width: `${experience/600 * 100}%`}} />

        <span className={styles.currentExperience} style={{left: `${experience/600 * 100}%`}}>
          {experience}xp
        </span>
      </div>
      <span>600 xp</span>
    </header>
  )
}

export default ExperienceBar;
import { useState } from 'react'
import { ChallengeContext } from '../contexts/ChallengeContext'
import { ChallengesProvider } from '../contexts/ChallengeContext'

import '../styles/global.css'
import '../styles/colors.css'


function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  )
}

export default MyApp

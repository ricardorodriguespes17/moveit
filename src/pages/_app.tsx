import { ChallengesProvider } from '../contexts/ChallengeContext'

import '../styles/global.css'
import '../styles/colors.css'
import { CountdownProvider } from '../contexts/CountdownContext'


function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <CountdownProvider>
        <Component {...pageProps} />
      </CountdownProvider>
    </ChallengesProvider>
  )
}

export default MyApp

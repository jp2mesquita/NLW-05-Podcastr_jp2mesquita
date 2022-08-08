import '../styles/global.scss'

import { Header } from '../components/Header'
import { Player } from '../components/player'

import { PlayerContext } from '../contexts/PlayerContext'

import styles from '../styles/app.module.scss'
import { useState } from 'react'


function MyApp({ Component, pageProps }) {

  const [episodeList, setEpisodeList ] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeindex] = useState(0)
  const [isPlaying, setIsPlaying ] = useState(false)

  function play(episode){
    setEpisodeList([episode])
    setCurrentEpisodeindex(0)
    setIsPlaying(true)
  }

  function tooglePlay(){
    setIsPlaying(!isPlaying)
  }

  function setPlayingState(state: boolean){
    setIsPlaying(state)
  }

  return (
    <PlayerContext.Provider
      value={
        {
          episodeList,
          currentEpisodeIndex,
          play,
          isPlaying,
          tooglePlay,
          setPlayingState
        }
      }
    >

      <div className={styles.appWrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>

    </PlayerContext.Provider>

  )
}

export default MyApp

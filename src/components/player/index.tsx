
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Slider from 'rc-slider'

import 'rc-slider/assets/index.css'

import {  usePlayer } from '../../contexts/PlayerContext'

import styles from './styles.module.scss'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'

export function Player(){

  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)

  const { 
    episodeList, 
    currentEpisodeIndex, 
    isPlaying, 
    isLooping,
    isShuffling,
    tooglePlay,
    toogleLoop,
    toogleShuffle,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    clearPlayerState
  } = usePlayer()

  useEffect( () => {
    if(!audioRef.current){
      return;
    }
    if(isPlaying){
      audioRef.current.play()
    }else{
      audioRef.current.pause()
    }
  }, [isPlaying])

  function setupProgressListener(){
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  }

  function handleSeek(amount: number){
    audioRef.current.currentTime = amount;
    setProgress(amount)
  }

  function handleEpisodeEnded() {
    if (hasNext){
      playNext()
    }else{
      clearPlayerState()
    }
  }

  const episode = episodeList[currentEpisodeIndex]

  return(
    <div className={styles.playerContainer}>
      <header>
        <picture>
          <img src="/playing.svg"
          alt="Tocando Agora" />
        </picture>
        <strong>Tocando agora {episode?.title}</strong>
      </header>

      { episode ? ( 
        <div className={styles.currentEpisode}>
          <Image
            src={episode.thumbnail}
            alt={episode.title}
            width={592}
            height={592}
            objectFit='cover'
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : ( 
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}


      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}> 
          <span>{convertDurationToTimeString (progress)}</span>
          <div className={styles.slider}>
            { episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{ backgroundColor:'#04d361'}}
                railStyle={{backgroundColor:'#9f75ff'}}
                handleStyle={{borderColor:'#04d361', borderWidth: 4}}

              />
            ) : (
              <div className={styles.emptySlider}/>
            ) }
            
          </div>
          <span>{convertDurationToTimeString (episode?.duration ?? 0)}</span>

        </div>


        { episode && (
          <audio 
            src={episode.url}
            ref={audioRef}
            loop={isLooping}
            autoPlay
            onEnded={handleEpisodeEnded}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onLoadedMetadata={setupProgressListener}
          />

          
        )}

        <div className={styles.buttons}>
          <button 
            type='button' 
            disabled={!episode || episodeList.length == 1}
            onClick={toogleShuffle}
            className={isShuffling ? styles.isActive : ''}
          >
            <Image 
              src='/shuffle.svg'
              alt='Embaralhar'
              width={18}
              height={18}
            />
          </button>
          <button 
            type='button' 
            onClick={playPrevious}    
            disabled={!episode || !hasPrevious}
          >
            <Image 
              src='/play-previous.svg'
              alt='Tocar anterior'
              width={18}
              height={18}
            />
          </button>
          <button 
            type='button' 
            className={styles.playButton} 
            disabled={!episode}
            onClick={tooglePlay}
          >

            { isPlaying ? (
              <Image 
                src='/pause.svg'
                alt='Tocar'
                width={32}
                height={32}
              />
            ) : (
              <Image 
                src='/play.svg'
                alt='Tocar'
                width={32}
                height={32}
              />
            )}

          </button>

          <button 
            type='button' 
            onClick={playNext}    
            disabled={!episode || !hasNext}
          >
            <Image 
              src='/play-next.svg'
              alt='Tocar próxima'
              width={18}
              height={18}
            />
          </button>
          <button 
            type='button' 
            disabled={!episode}
            onClick={toogleLoop}
            className={isLooping ? styles.isActive : ''}
          >
            <Image 
              src='/repeat.svg'
              alt='Repetir'
              width={18}
              height={18}
            />
          </button>
          
        </div>
      </footer>
    </div>
  )
}
import { createContext, ReactNode, useContext, useState } from 'react'

type Episode = {
  title: string,
  members: string,
  thumbnail: string,
  duration: number,
  url: string
}

type PlayerContextData = {
  episodeList: Episode[],
  currentEpisodeIndex: number,
  isPlaying: boolean,
  hasNext: boolean,
  hasPrevious: boolean,
  isLooping: boolean,
  isShuffling: boolean,
  play: (episode: Episode) => void 
  tooglePlay: () => void
  toogleLoop: () => void
  toogleShuffle: () => void
  setPlayingState: (state: boolean) => void
  playList: (list: Episode[], index: number) => void
  playNext: () => void
  playPrevious: () => void
  clearPlayerState: () => void
}

export const PlayerContext = createContext( {} as PlayerContextData)

type PlayerContextProviderProps ={
  children: ReactNode,
}

export function PlayerContextProvider( { children }: PlayerContextProviderProps){
  const [episodeList, setEpisodeList ] = useState<Episode[]>([])
  const [currentEpisodeIndex, setCurrentEpisodeindex] = useState(0)
  const [isPlaying, setIsPlaying ] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling ] = useState(false)

  function play(episode: Episode){
    setEpisodeList([episode])
    setCurrentEpisodeindex(0)
    setIsPlaying(true)
  }

  function playList(list: Episode[], index: number){
    setEpisodeList(list)
    setCurrentEpisodeindex(index)
    setIsPlaying(true)
  }

  function tooglePlay(){
    setIsPlaying(!isPlaying)
  }

  
  function toogleLoop(){
    setIsLooping(!isLooping)
  }

  function toogleShuffle(){
    setIsShuffling(!isShuffling)
  }

  function setPlayingState(state: boolean){
    setIsPlaying(state)
  }

  function clearPlayerState(){
    setEpisodeList([])
    setCurrentEpisodeindex(0)
  }
  const hasPrevious = currentEpisodeIndex > 1
  const hasNext = isShuffling || (currentEpisodeIndex +1 ) < episodeList.length


  function playNext(){
    if(isShuffling){
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeindex(nextRandomEpisodeIndex)
    }else if(hasNext){
      setCurrentEpisodeindex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious(){

    if(hasPrevious){
      setCurrentEpisodeindex(currentEpisodeIndex - 1)
    }
  }


  return (
    <PlayerContext.Provider
      value={
        {
          episodeList,
          currentEpisodeIndex,
          play,
          isPlaying,
          isLooping,
          isShuffling,
          toogleShuffle,
          tooglePlay,
          toogleLoop,
          setPlayingState,
          playList,
          playNext,
          playPrevious,
          hasNext,
          hasPrevious,
          clearPlayerState
        }
      }
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = ()=> {
  return useContext(PlayerContext)
}
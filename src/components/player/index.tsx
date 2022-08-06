
import Image from 'next/image'
import styles from './styles.module.scss'

export function Player(){
 
  return(
    <div className={styles.playerContainer}>
      <header>
        <Image
          src="/playing.svg"
          alt="Tocando Agora"
          width={50}
          height={50}
        />
        <strong>Tocando agora</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer className={styles.empty}>
        <div className={styles.progress}> 
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider}/>
          </div>
          <span>00:00</span>

        </div>

        <div className={styles.buttons}>
          <button type='button'>
            <Image 
              src='/shuffle.svg'
              alt='Embaralhar'
              width={18}
              height={18}
            />
          </button>
          <button type='button'>
            <Image 
              src='/play-previous.svg'
              alt='Tocar anterior'
              width={18}
              height={18}
            />
          </button>
          <button type='button' className={styles.playButton}>
            <Image 
              src='/play.svg'
              alt='Tocar'
              width={32}
              height={32}
            />
          </button>
          <button type='button'>
            <Image 
              src='/play-next.svg'
              alt='Tocar próxima'
              width={18}
              height={18}
            />
          </button>
          <button type='button'>
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
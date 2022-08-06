
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import Image from "next/image";
import styles from './styles.module.scss'

export function Header(){
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  })

  return(
    <header className={styles.headerContainer}>
      <Image
        src="/logo.svg"
        alt="Podcastr"
        width={200}
        height={50}
      />

      <p>O melhor para voce ouvir, sempre</p>

      <span>{currentDate}</span>
    </header>
  )
}
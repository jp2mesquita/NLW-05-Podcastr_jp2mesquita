import { GetStaticProps} from "next"
import Links from "next/link"
import { api } from "../services/api"
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString"

import styles from './home.module.scss'
import Image from "next/image"
import Link from "next/link"

type Episode = {
  id: string,
  title: string,
  thumbnail: string,
  members: string,
  duration: number,
  durationAsString:string
  url: string,
  publishedAt: string,
}

type HomeProps = {

  latestEpisodes: Episode[],
  allEpisodes: Episode[]
}

export default function Home({latestEpisodes, allEpisodes}: HomeProps) {

  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>


        <ul>
          {latestEpisodes.map( episode => {
            
            return(
              <li key={episode.id}>
                
                <Image 
                  src={episode.thumbnail} 
                  alt={episode.title} 
                  width={88}
                  height={88}
                  objectFit="cover"
                />
                
                <div className={styles.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`}>
                    <a >{episode.title}</a>
                    </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button">
                  <picture>
                    <img src="/play-green.svg" alt="Tocar Episódio" />
                  </picture>

                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
          <h2>Todos epiódios</h2>

          <table cellSpacing={0}>
            <thead>
              <tr>
                <th></th>
                <th>Podcast</th>
                <th>Integrantes</th>
                <th>Data</th>
                <th>Duração</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allEpisodes.map(episode =>{
                return (
                  <tr key={episode.id}>
                    <td style={{ width: 72}}>
                      <Image 
                        src={episode.thumbnail}
                        alt={episode.title}
                        width={40}
                        height={40}
                        objectFit="cover"
                      />
                    </td>
                    <td>
                      <Link href={`/episodes/${episode.id}`}>
                        <a >{episode.title}</a>
                      </Link>
                    </td>
                    <td>{episode.members}</td>
                    <td style={{ width: 100}}>{episode.publishedAt}</td>
                    <td>{episode.durationAsString}</td>
                    <td>
                      <button type="button">
                      <Image 
                        src="/play-green.svg"
                        alt="Tocar episódio"
                        width={24}
                        height={24}
                        objectFit="cover"
                      />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
      </section>
      
    </div>
  )
}



export const  getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes",{
    params:{
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    }
  })

  const episodes = data.map(episode => {
    return{
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: 
        format(parseISO(episode.published_at), 'd MMM yy', {
            locale: ptBR
        })
      ,
      duration: Number(episode.file.durarion),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url,
        
    }
  })

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.lenght)

  return{
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8, //8 hours
  }
}

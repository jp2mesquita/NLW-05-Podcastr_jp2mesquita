import { GetStaticProps} from "next"


export default function Home(props) {
  return (
    <>
       <h1>Index</h1>
       <p>{JSON.stringify(props.episodes)}</p>
    </>
  )
}


export async function getStaticProps(){
  const response = await fetch("http://localhost:3333/episodes")
  const data = await response.json()
  // .then(response => response.json())
  // .then( data => console.log(data))

  return{
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, //8 hours
  }
}

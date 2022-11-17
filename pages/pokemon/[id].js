/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Details.module.css";

// Returns a list of different paths we should be generating!
export async function getStaticPaths() {
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  const pokemon = await resp.json();

  return {
    paths: pokemon.map((pokemon) => ({
      params: { id: pokemon.id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  );

  return {
    props: {
      pokemon: await resp.json(),
    },
    // revalidate: 30,
  };
}

// export async function getServerSideProps({ params }) {
//   // Context contains params
//   const response = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`);
  
//   return {
//     props: {
//       pokemon: await response.json()
//     }
//   }
// }

export default function Details({ pokemon }) {

  /***************************
   Client-Side Rendering Code
  ***************************/
  // const { query: { id } } = useRouter();

  // const [pokemon, setPokemon] = useState(null);

  // useEffect(() => {
  //   async function getPokemon() {
  //     const response = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`);
  //     setPokemon( await response.json() );
  //   }
  //   if( id ) {
  //     getPokemon();
  //   }
  // }, [id]);

  // if(!pokemon) {
  //   return null;
  // }
  /***************************
   END: Client-Side Rendering Code
  ***************************/

  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name.english}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(", ")}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

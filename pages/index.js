/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

// Server Side Rendering / Static Site Generation Code
export async function getStaticProps() {
  const response = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");

  return {
    props: {
      pokemon: await response.json()
    }
  }
}

export default function Home({pokemon}) {
  
  /***************************
   Client-Side Rendering Code
  ***************************/
  // const [pokemon, setPokemon] = useState([]);

  // useEffect(() => {
  //   async function getPokemon() {
  //     const response = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");
  //     setPokemon( await response.json() );
  //   }
  //   getPokemon();
  // }, []);
  /***************************
   END: Client-Side Rendering Code
  ***************************/

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h2>Pokemon List</h2>
      <div className={styles.grid}>
        {pokemon.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <a>
                <img
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                  alt={pokemon.name}
                />
                <h3>{pokemon.name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

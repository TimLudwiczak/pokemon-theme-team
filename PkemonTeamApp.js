import React, { useState } from 'react';
import axios from 'axios';

const PokemonTeamApp = () => {
  const [pokemonImage, setPokemonImage] = useState(null);

  const fetchPokemonImage = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon/1'); // Example: fetching Pokemon data
      const pokemonData = response.data;
      // Assuming 'sprites.front_default' exists in the API response
      if (pokemonData.sprites && pokemonData.sprites.front_default) {
        setPokemonImage(pokemonData.sprites.front_default);
      } else {
        console.log('Pokemon image not found.');
      }
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  };
  const fetchPokemonByTypes = async (types) => {
    try {
      const promises = types.map(type =>
        axios.get(`https://pokeapi.co/api/v2/type/${type}`)
      );
      const responses = await Promise.all(promises);
      const allPokemon = responses.flatMap(response => response.data.pokemon);
      const randomPokemon = [];
      const uniqueIds = new Set();

      while (randomPokemon.length < 5 && uniqueIds.size < allPokemon.length) {
        const randomIndex = Math.floor(Math.random() * allPokemon.length);
        const randomPoke = allPokemon[randomIndex].pokemon;
        const pokeId = parseInt(randomPoke.url.split('/').slice(-2, -1)[0], 10);

        if (!uniqueIds.has(pokeId)) {
          uniqueIds.add(pokeId);
          randomPokemon.push(randomPoke);
        }
      }
      const imagePromises = randomPokemon.map(poke =>
        axios.get(poke.url)
      );
      const imageResponses = await Promise.all(imagePromises);
      const images = imageResponses.map(response => response.data.sprites.front_default);
      setTeamImages(images);
    } catch (error) {
      console.error('Error fetching Pokemon by types:', error);
    }
  };

  return (
    <div className="pokemon-app">
      <h1>Pokemon Theme Team</h1>
      <button onClick={fetchPokemonImage}>Fetch Pokemon</button>
      {pokemonImage && (
        <div className="pokemon-image">
          <img src={pokemonImage} alt="Pokemon" />
        </div>
      )}
    </div>
  );
};

export default PokemonTeamApp;

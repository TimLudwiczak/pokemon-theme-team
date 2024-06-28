import React, { useState } from 'react';
import axios from 'axios';

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

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import type React from 'react';

import { getOptionsForVote } from '@/utils/getRandomPokemon';
import { trpc } from '@/utils/trpc';
import { inferQueryResponse } from './api/trpc/[trpc]';

const btn =
  'items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';

const Home = () => {
  const [ids, setIds] = useState(getOptionsForVote());
  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(['get-pokemon-by-id', { id: first }]);
  const secondPokemon = trpc.useQuery(['get-pokemon-by-id', { id: second }]);

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  const voteForRoundest = (selected: number) => {
    // todo: fire mutation to persist changes

    setIds(getOptionsForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokémon is Rounder</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        {!firstPokemon.isLoading &&
          firstPokemon.data &&
          !secondPokemon.isLoading &&
          secondPokemon.data && (
            <>
              <PokemonListing
                pokemon={firstPokemon.data}
                vote={() => voteForRoundest(first)}
              />
              <div className="p-8">vs</div>
              <PokemonListing
                pokemon={secondPokemon.data}
                vote={() => voteForRoundest(second)}
              />
            </>
          )}
        <div className="p-2" />
      </div>
    </div>
  );
};

export default Home;

type PokemonFromServer = inferQueryResponse<'get-pokemon-by-id'>;

const PokemonListing: React.FC<{
  pokemon: PokemonFromServer;
  vote: () => void;
}> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <img
        className="w-64 h-64"
        src={props.pokemon.sprites.front_default || 'https://placehold.it/320'}
        alt=""
      />
      <div className="text-xl text-center capitalize mt-[-1rem]">
        {props.pokemon.name}
      </div>
      <button className={btn} onClick={() => props.vote}>
        Rounder
      </button>
    </div>
  );
};

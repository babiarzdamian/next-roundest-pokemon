/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

import { getOptionsForVote } from '@/utils/getRandomPokemon';
import { trpc } from '@/utils/trpc';

const Home = () => {
  const [ids, setIds] = useState(getOptionsForVote());
  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(['get-pokemon-by-id', { id: first }]);
  const secondPokemon = trpc.useQuery(['get-pokemon-by-id', { id: second }]);

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokémon is Rounder</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        <div className="w-64 h-64 flex flex-col">
          <img
            className="w-full"
            src={
              firstPokemon.data?.sprites.front_default ||
              'https://placehold.it/320'
            }
            alt=""
          />
          <div className="text-xl text-center capitalize mt-[-1rem]">
            {firstPokemon.data?.name}
          </div>
          <div className="p-2" />
        </div>
        <div className="p-8">vs</div>
        <div className="w-64 h-64 flex flex-col">
          <img
            className="w-full"
            src={
              secondPokemon.data?.sprites.front_default ||
              'https://placehold.it/320'
            }
            alt=""
          />
          <div className="text-xl text-center capitalize mt-[-1rem]">
            {secondPokemon.data?.name}
          </div>
          <div className="p-2" />
        </div>
      </div>
    </div>
  );
};

export default Home;

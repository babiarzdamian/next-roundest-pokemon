/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

import { getOptionsForVote } from '@/utils/getRandomPokemon';
import { trpc } from '@/utils/trpc';

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
        <div className="w-64 h-64 flex flex-col items-center">
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
          <button className={btn} onClick={() => voteForRoundest(first)}>
            Rounder
          </button>
        </div>
        <div className="p-8">vs</div>
        <div className="w-64 h-64 flex flex-col items-center">
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
          <button className={btn} onClick={() => voteForRoundest(second)}>
            Rounder
          </button>
        </div>
        <div className="p-2" />
      </div>
    </div>
  );
};

export default Home;

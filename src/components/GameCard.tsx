import React from "react";
import { Link } from "react-router-dom";

interface GameCardProps {
  gameName: string;
  imgUrl: string;
  slug: string;
}

const GameCard: React.FC<GameCardProps> = ({ gameName, imgUrl, slug }) => {
  return (
    <Link
      to={`/games/${slug}`}
      className="relative group border p-2 mb-2 sm:w-1/4 w-1/3 md:w-1/6 h-64 flex items-center justify-center"
    >
      <img src={imgUrl} alt={gameName} className="w-full h-full object-cover" />
      <span className="p-2 group-hover:flex absolute hidden transition-all ease-in-out duration-700 items-center justify-center w-full h-full bg-[radial-gradient(circle,_rgba(25,35,59,1)_0%,_rgba(35,56,86,0)_100%)]">
        <p className="text-center text-2xl text-white font-teko">{gameName}</p>
      </span>
    </Link>
  );
};

export default GameCard;

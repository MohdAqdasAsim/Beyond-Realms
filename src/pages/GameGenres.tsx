import { useEffect, useState } from "react";
import { GameCard, Loading } from "../components";
import { fetchGamesByGenre } from "../api";
import { Link, useParams } from "react-router-dom";

interface Games {
  name: string;
  img: string;
  slug: string;
}

const GameGenres = () => {
  const { genreSlug } = useParams<{ genreSlug: any }>();

  const [games, setGames] = useState<Games[]>([]);
  const [pageNumber, setPageNumber] = useState(10);
  const [loading, setLoading] = useState(true);

  // Fetch games based on the current page number
  const fetchGames = async (page: number) => {
    console.log(page);
    setLoading(true);
    const gamesData = await fetchGamesByGenre(genreSlug, pageNumber);
    setGames(gamesData);
    setLoading(false);
  };

  // Fetch the first set of games on component mount or when the genre changes
  useEffect(() => {
    fetchGames(1); 
    console.log(genreSlug);
    
  }, [genreSlug]); 

  // Handle load more button click
  const loadMoreGames = () => {
    const newPageNumber = pageNumber + 10;
    setPageNumber(newPageNumber);
    fetchGames(newPageNumber);
  };

  // If the data is loading, show a loading component
  if (loading && pageNumber === 1) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full p-4 flex justify-center flex-col items-center">
      <span className="w-full h-full flex flex-row items-center justify-center gap-2 mb-4">
        <Link to="/" className="mr-4">
          <img
            src="/icons/arrow.svg"
            alt=""
            className="w-6 h-6 rotate-180"
          />
        </Link>
        <h2 className="text-4xl font-bold font-teko text-center uppercase">
          Explore the best {genreSlug} games!
        </h2>
      </span>
      {/* Display game cards */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2 w-[98%]">
        {games.map((game, index) => (
          <GameCard
            key={index}
            gameName={game.name}
            imgUrl={game.img} // Fixed image rendering
            slug={game.slug}
          />
        ))}
      </div>
      {/* Load More Button */}
      {!loading && (
        <button
          onClick={loadMoreGames}
          className="font-teko text-2xl mt-4 px-6 py-2 bg-[#fdfdfd] text-[#202749] rounded-2xl hover:bg-[#202749] hover:text-white border-2 border-[#202749] hover:border-[#fdfdfd]"
        >
          Load More
        </button>
      )}
      {/* Show loading spinner while more games are being fetched */}
      {loading && pageNumber > 1 && <Loading />}
    </div>
  );
};

export default GameGenres;

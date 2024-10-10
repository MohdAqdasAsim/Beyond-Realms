import { useEffect, useRef, useState } from "react";
import { getPopularGames } from "../api";
import { Link } from "react-router-dom";
import Loading from "./Loading";

interface Game {
  name: string;
  background_image: string;
  slug: string;
}

const FeaturedSection = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGames = async () => {
      const gamesData = await getPopularGames();
      setGames(gamesData);
      setLoading(false);
    };

    getGames();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      // Check if scrollRef.current is not null
      const scrollLeft = scrollRef.current.scrollLeft;
      const scrollWidth =
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

      // Show left arrow if not at the start
      setShowLeftArrow(scrollLeft > 0);
      // Show right arrow if not at the end
      setShowRightArrow(scrollLeft < scrollWidth);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
  return (
    <div className="p-2 w-full h-80">
      <p className="uppercase font-teko mb-2 text-center sm:text-start">Featured & Recommended</p>
      <div className="relative flex w-full h-full">
        {/* Left Arrow */}
        {showLeftArrow && (
          <span
            className="absolute bg-gradient-to-r from-[#19233b] to-[#19233b00] w-3/12 h-full flex items-center justify-start left-0 cursor-pointer z-50"
            onClick={scrollLeft}
          >
            <img
              src="/icons/arrow.svg"
              alt="arrow-left"
              className="w-12 h-12 ml-4 rotate-180"
            />
          </span>
        )}

        <div
          className="flex flex-wrap flex-col w-full overflow-x-hidden gap-2"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {games.map((game, index) => {
            return (
              <Link
                to={`/games/${game.slug}`}
                key={index}
                className="group relative flex items-center justify-center sm:w-1/5 w-2/3 h-full bg-black overflow-hidden rounded-2xl"
              >
                <img
                  src={game.background_image}
                  alt="game"
                  className="w-full h-full object-cover"
                />
                <span className="group-hover:flex absolute hidden transition-all ease-in-out duration-700 items-center justify-center w-full h-full bg-[radial-gradient(circle,_rgba(25,35,59,1)_0%,_rgba(35,56,86,0)_100%)]">
                  <p className="text-3xl text-white font-teko">{game.name}</p>
                </span>
                <span className="sm:hidden flex absolute items-end justify-center w-full h-full">
                  <span className="bg-[#1e2345] px-2 w-full">
                    <p className="text-3xl text-white font-teko">{game.name}</p>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <span
            className="absolute bg-gradient-to-l from-[#19233b] to-[#19233b00] w-3/12 h-full flex items-center justify-end right-0 cursor-pointer z-50"
            onClick={scrollRight}
          >
            <img
              src="/icons/arrow.svg"
              alt="arrow-right"
              className="w-12 h-12 mr-4"
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default FeaturedSection;

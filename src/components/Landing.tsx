import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchGames, fetchRandomGame } from "../api"; 
import { debounce, throttle } from "lodash";

const Landing = () => {
  const [showSearch, setShowSearch] = useState(false); // State for showing/hiding search bar
  const [searchQuery, setSearchQuery] = useState(""); // Search input value
  const [filteredGames, setFilteredGames] = useState<any[]>([]); // Filtered search results
  const searchRef = useRef<HTMLDivElement>(null); // Ref for search bar to detect outside clicks
  const cache = useRef<{ [key: string]: any[] }>({}); // Cache object to store results
  const navigate = useNavigate();

  // Toggle search bar
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  // Handle clicks outside the search bar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false); // Close search bar if clicked outside
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to handle the scroll event
  const handleScroll = () => {
    window.scrollBy({
      top: window.innerHeight * 1.5,
      behavior: "smooth",
    });
  };

  // Debounced search function to limit API calls
  const fetchGamesDebounced = useRef(
    debounce(async (query: string) => {
      if (query in cache.current) {
        setFilteredGames(cache.current[query]);
      } else {
        const results = await searchGames(query);
        cache.current[query] = results; 
        setFilteredGames(results);
      }
    }, 500)
  ).current;

  // Handle search query change with throttling
  const throttledSearch = useRef(
    throttle((query: string) => {
      if (query) {
        fetchGamesDebounced(query);
      } else {
        setFilteredGames([])
      }
    }, 1000)
  ).current;

  useEffect(() => {
    throttledSearch(searchQuery);
  }, [searchQuery]);

  // Handle navigation to selected game
  const handleGameClick = (gameName: string) => {
    navigate(`/games/${gameName}`);
  };

  // Function to fetch random game on button click
  const handleRandomGameBtn = async () => {
    const randomGame = await fetchRandomGame();
    if (randomGame) {
      navigate(`/games/${randomGame}`);
    }
  };

  return (
    <div className="w-full h-[100vh] p-3 px-14 pb-6 flex flex-col">
      <nav className="w-full h-24 flex flex-row items-center relative">
        <span className="flex justify-center items-center w-14 sm:w-16 md:w-24 h-full">
          <Link to="/">
            <img src="/logo.svg" alt="logo" />
          </Link>
        </span>

        <span className="flex justify-end items-center w-1/2 h-full flex-1 flex-row gap-2">
          {/* Search Button */}
          <span
            className="w-34 h-full flex flex-row items-center px-3 gap-2 cursor-pointer"
            onClick={toggleSearch}
          >
            <img
              src="/icons/search.svg"
              alt="search"
              className="w-8 h-8"
            />
            <h1 className="sm:text-[28px] text-[22px] md:text-[38px] sm:block hidden font-teko text-white">Search</h1>
          </span>

          {/* Random Game Link */}
          <span
            className="w-34 h-full flex flex-row items-center px-3 gap-2 cursor-pointer"
            onClick={() => {
              handleRandomGameBtn();
            }}
          >
            <img
              src="/icons/dice.svg"
              alt="random"
              className="w-8 h-8"
            />
            <span>
              <h1 className="sm:text-[28px] text-[22px] md:text-[38px] sm:block hidden font-teko text-white">Random Game</h1>
            </span>
          </span>
        </span>

        {/* Search Bar */}
        {showSearch && (
          <div
            ref={searchRef}
            className="absolute top-0 left-0 w-full h-full bg-gray-900 rounded-[42px] flex flex-col items-center px-8 transition-all duration-500 ease-in-out pointer-events-none"
          >
            <input
              type="text"
              value={searchQuery}
              autoFocus
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a game..."
              className="w-full h-14 p-4 font-teko text-2xl text-white bg-transparent border-b-2 border-spacing-0 mt-3 border-white focus:outline-none pointer-events-auto"
            />
            {/* Display search suggestions below the input */}
            {filteredGames.length > 0 && (
              <div className="bg-white w-full rounded-b-2xl py-4 text-xl flex flex-col pointer-events-auto">
                {filteredGames.map((game) => (
                  <Link
                    to={`/games/${game.slug}`}
                    key={game.id}
                    className="py-2 px-2 hover:bg-gray-400 hover:text-white cursor-pointer text-gray-900"
                    onClick={() => handleGameClick(game.slug)}
                  >
                    {game.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>

      <div className="flex flex-col items-center justify-center w-full h-1/2 flex-1">
        <p className="font-Teko text-white sm:text-2xl md:text-5xl text-xl tracking-widest w-4/5 sm:my-10 my-4 text-center">
          The Ultimate Game Collection—Browse the web's top games, all in one
          place!
        </p>
        <p className="font-RubikDoodle text-off-white w-2/3 sm:text-xl md:text-2xl text-lg mb-2 sm:mb-0 text-center">
          Discover the Ultimate Gaming Library! Explore and browse through a
          vast collection of games from across the web, carefully curated for
          every type of player. Your next favorite game is just a click away!
        </p>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:mb-0 mb-4 sm:gap-4 gap-2 items-center justify-center w-full h-24">
        <span onClick={handleScroll} className="shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] cursor-pointer w-32 h-16 px-10 border-white hover:bg-white hover:text-[#0F1035] border-2 text-1xl font-comfortaa rounded-[70px] flex justify-center text-center items-center">
          Browse
        </span>
        <Link
          to="/games"
          className="shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] cursor-pointer w-40 h-16 px-10 bg-white text-[#0F1035] hover:bg-[#0F1035] hover:text-white text-1xl font-comfortaa rounded-[70px] flex justify-center text-center items-center"
        >
          Jump In!
        </Link>
      </div>
    </div>
  );
};

export default Landing;

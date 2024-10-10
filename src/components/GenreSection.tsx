import { useEffect, useRef, useState } from "react";
import { fetchGenres } from "../api";
import Loading from "./Loading";
import { Link } from "react-router-dom";

interface Genres {
  name: string,
  image:string,
  slug:string,
}

const GenreSection = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const [genres, setGenres] = useState<Genres[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGenres = async () => {
      const genresData = await fetchGenres();
      setGenres(genresData);
      setLoading(false);
    };

    getGenres();
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
    <div className="p-2 w-full h-64 mt-12 mb-24">
      <p className="uppercase font-teko mb-2 text-center sm:text-start">Browse by genre</p>
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
          {genres.map((genre) => {
            return (
              <Link
                to={`/genres/${genre.slug}`}
                className="group relative flex items-center justify-center sm:w-1/5 w-2/3 h-full bg-black overflow-hidden rounded-2xl"
              >
                <img src={genre.image} alt="game" className="w-full h-full object-cover" />
                <span className="group-hover:hidden absolute flex transition-all ease-in-out duration-700 items-center justify-center w-full h-full bg-[radial-gradient(circle,_rgba(25,35,59,1)_0%,_rgba(35,56,86,0)_100%)]">
                  <p className="text-3xl text-white font-teko">{genre.name}</p>
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

export default GenreSection;

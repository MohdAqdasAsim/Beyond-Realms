import { useEffect, useState, useRef } from "react";

const sampleGames = [
  "Game 1",
  "Game 2",
  "Game 3",
  "Game 4",
  "Game 5",
  "Game 6",
  "Game 7",
  "Game 8",
  "Game 9",
  "Game 10",
];

const InfiniteGamesSection = () => {
  const [games, setGames] = useState<string[]>(sampleGames); // Initial games list
  const [isFetching, setIsFetching] = useState(false); // To track if fetching more games
  const bottomRef = useRef<HTMLDivElement | null>(null); // Ref to track the bottom element

  // Function to simulate fetching more games
  const fetchMoreGames = () => {
    if (isFetching) return; // If already fetching, don't fetch again
    setIsFetching(true);

    setTimeout(() => {
      const newGames = games.length + 1; // Create new game entries
      setGames((prevGames) => [
        ...prevGames,
        `Game ${newGames}`,
        `Game ${newGames + 1}`,
        `Game ${newGames + 2}`,
        `Game ${newGames + 3}`,
        `Game ${newGames + 4}`,
        `Game ${newGames + 5}`,
        `Game ${newGames + 6}`,
        `Game ${newGames + 7}`,
        `Game ${newGames + 8}`,
        `Game ${newGames + 9}`,
      ]);
      setIsFetching(false);
    }, 1000); // Simulate a delay in fetching
  };

  // IntersectionObserver to trigger fetching when bottom is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreGames(); // Fetch more games when bottom element is visible
        }
      },
      { threshold: 1.0 } // Trigger when 100% of the target is visible
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current); // Observe the bottom div
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current); // Clean up observer on unmount
      }
    };
  }, [games]); // Re-run observer when games list changes

  return (
    <div className="w-full h-full p-4">
      <h2 className="text-2xl font-bold  font-teko mb-4 text-center">Games List</h2>
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2 w-[98%]">
        {games.map((game, index) => (
          <span key={index} className="border p-2 mb-2 w-1/6 h-64 flex items-center justify-center">
            {game}
          </span>
        ))}
      </div>

      {/* This div is used as a target for the intersection observer */}
      <div ref={bottomRef} className="h-10 flex items-center justify-center">
        {isFetching ? (
          <span className="w-6 h-6 rounded-full border-off-white border-2 border-t-white animate-spin"></span>
        ) : (
          <h1 className="flex-1 text-xl text-center font-teko hover:underline">
            Scroll to load more games
          </h1>
        )}
      </div>
    </div>
  );
};

export default InfiniteGamesSection;

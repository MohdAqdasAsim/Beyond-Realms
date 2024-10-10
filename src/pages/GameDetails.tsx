import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "../components";
import { fetchGameBySlug } from "../api";

const GameDetails = () => {
  const { gameSlug } = useParams<{ gameSlug: string }>();
  const [game, setGame] = useState<any | null>(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch game data based on the slug
    const fetchGameDetails = async () => {
      try {
        if (gameSlug) {
          const fetchedGame = await fetchGameBySlug(gameSlug);
          setGame(fetchedGame);
          console.log(fetchedGame);
        }
      } catch (err) {
        setError("Failed to load game details."); 
      } finally {
        setIsLoading(false); 
      }
    };

    fetchGameDetails();
  }, [gameSlug]);

  // Handle error in fetching data
  if (error) {
    return (
      <div className="w-screen min-h-screen flex justify-center items-center">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  // Handle case when game data is not found or is undefined
  if (!gameSlug || !game) {
    return (
      <div className="w-screen min-h-screen flex justify-center items-center">
        <p className="text-red-500 text-xl">Game not found.</p>
      </div>
    );
  }

  // Show loading indicator while game data is being fetched
  if (isLoading) {
    return (
      <div className="w-screen min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <section
      className={`w-screen min-h-screen flex flex-col items-center justify-center`}
    >
      <div
        className={`w-full md:h-screen min-h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center`}
        style={{ backgroundImage: `url(${game.background_image})` }}
      >
        <div
          style={{
            backgroundColor: `${game.dominant_color}`,
            borderBlockColor: `${game.saturated_color}`,
          }}
          className="w-[95%] h-[95%] flex sm:flex-col-reverse md:flex-row flex-col-reverse shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[17.2px] border rounded-2xl border-solid p-4"
        >
          <div className="sm:w-full md:w-2/3 w-full h-full flex md:flex-col flex-col-reverse sm:flex-col-reverse p-2 rounded-2xl mr-3 overflow-hidden">
            <div className="w-full h-1/2 flex sm:flex-col flex-col md:flex-row items-center justify-between md:gap-0 gap-4 sm:gap-4">
              <span className="md:w-[48%] sm:w-full w-full h-full rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={game.background_image}
                  alt="image1"
                  className="w-full h-full"
                />
              </span>
              <span className="md:w-[48%] sm:w-full w-full h-full rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={game.background_image_additional}
                  alt="image1"
                  className="w-full h-full"
                />
              </span>
            </div>

            <div
              className="w-full h-1/2 my-4 px-2 flex items-center justify-start shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[17.2px] border rounded-2xl border-solid bg-[#ffffffab]"
              style={{
                borderBlockColor: `${game.saturated_color}`,
              }}
            >
              <p className="text-[#202649] font-teko line-clamp-[9]">
                {game.description_raw}
              </p>
            </div>
          </div>

          <div
            className="md:w-1/3 sm:w-full w-full h-full md:border-l-2 sm:border-0 border-0 flex items-center justify-center"
            style={{
              borderBlockColor: `${game.saturated_color}`,
            }}
          >
            <div
              className="w-[95%] md:h-full h-[320px] px-2 flex flex-col items-center justify-start shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[17.2px] border rounded-2xl border-solid bg-[#ffffffab]"
              style={{
                borderBlockColor: `${game.saturated_color}`,
              }}
            >
              <span className="flex flex-row justify-between items-center w-full">
                <Link to="/games" className="mr-4">
                  <img
                    src="/icons/arrow.svg"
                    alt=""
                    className="w-6 h-6 rotate-180"
                  />
                </Link>
                <p className="text-[#202649] text-5xl font-teko mt-3">
                  {game.name}
                </p>
              </span>
              <div className="flex-1 flex flex-row w-full rounded-2xl mb-3 border-2 border-[#352a54] overflow-hidden">
                <div className="flex-1 flex flex-col w-1/2">
                  <span className="w-full min-h-4 flex-1 bg-[#352a54c7] flex items-center justify-center border-r-2 border-off-white">
                    <p className="font-teko text-2xl">Release Date</p>
                  </span>
                  <span className="w-full min-h-4 flex-1 bg-white"></span>
                  <span className="w-full min-h-4 flex-1 bg-[#352a54c7] flex items-center justify-center border-r-2 border-off-white">
                    <p className="font-teko text-2xl">Developers</p>
                  </span>
                  <span className="w-full min-h-4 flex-1 bg-white"></span>
                  <span className="w-full min-h-4 flex-1 bg-[#352a54c7] flex items-center justify-center border-r-2 border-off-white">
                    <p className="font-teko text-2xl">Rating</p>
                  </span>
                  <span className="w-full min-h-4 flex-1 bg-white"></span>
                  <span className="w-full min-h-4 flex-1 bg-[#352a54c7] flex items-center justify-center border-r-2 border-off-white">
                    <p className="font-teko text-2xl">Platforms</p>
                  </span>
                </div>
                <div className="flex-1 flex flex-col w-1/2">
                  <span className="w-full min-h-4 flex-1 bg-[#352a54c7] flex items-center justify-center">
                    <p className="font-teko text-2xl">{game.released}</p>
                  </span>
                  <span className="w-full min-h-4 flex-1 bg-white"></span>
                  <span className="w-full min-h-4 flex-1 bg-[#352a54c7] flex items-center justify-center">
                    <p className="font-teko sm:text-lg text-[10px]">
                      {game.developers
                        .map((developer:any) => developer.name)
                        .join(", ")}
                    </p>
                  </span>
                  <span className="w-full min-h-4 flex-1 bg-white"></span>
                  <span className="w-full min-h-4 flex-1 bg-[#352a54c7] flex items-center justify-center">
                    <p className="font-teko text-2xl">{game.rating}</p>
                  </span>
                  <span className="w-full min-h-4 flex-1 bg-white"></span>
                  <span className="w-full min-h-4 flex-1 bg-[#352a54c7] flex items-center justify-center">
                    <p className="font-teko sm:text-lg text-[10px]">
                      {game.platforms
                        .map((platform:any) => platform.platform.name)
                        .join(", ")}
                    </p>
                  </span>
                </div>
              </div>
              <Link
                to={game.website}
                className="w-full h-12 mb-3 bg-[#352a54] hover:bg-white hover:text-[#352a54] text-white font-teko text-2xl flex items-center justify-center rounded-2xl"
              >
                Take Me to the Game!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameDetails;

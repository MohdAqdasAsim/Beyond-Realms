import GenreSection from "./GenreSection";
import FeaturedSection from "./FeaturedSection";
import GamesList from "./GamesList";
import Footer from "./Footer";

const GamesSection = () => {
  return (
    <div className="w-full flex flex-col">
      <span className="w-full h-24 rounded-t-[50%] bg-[#253156]"></span>
      <div className="w-full min-h-96 bg-[#253156] flex flex-col">
        <FeaturedSection />
        <GenreSection />
        <GamesList />
        <Footer />
      </div>
    </div>
  );
};

export default GamesSection;

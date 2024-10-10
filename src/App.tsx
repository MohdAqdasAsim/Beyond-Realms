import { Route, Routes } from "react-router-dom";
import { GameGenres, GameDetails, Home, NotFound } from "./pages";
import GamesList from "./components/GamesList";

function App() {
  return (
    <>
      <Routes>
        {/* Home route */}
        <Route index element={<Home />} />
        
        {/* Route for games list */}
        <Route path="/games" element={<div className="w-screen min-h-screen flex items-center justify-center"><GamesList /></div>} />
        
        {/* Dynamic route for game details */}
        <Route path="/games/:gameSlug" element={<GameDetails />} />

        {/* Dynamic route for game categories */}
        <Route path="/genres/:genreSlug" element={<GameGenres />} />
        
        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

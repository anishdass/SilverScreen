import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Watched from "./pages/Watched";
import Watchlist from "./pages/Watchlist";
import MovieDetails from "./pages/MovieDetails";
import Navbar from "./elements/Navbar";
import SearchByGenre from "./pages/SearchByGenre";
import SearchByQuery from "./pages/SearchByQuery";
import Cast from "./pages/Cast";

function App() {
  const [count, setCount] = useState(0);

  return (
    <MovieProvider>
      <Navbar />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/watched' element={<Watched />} />
          <Route path='/watchlist' element={<Watchlist />} />
          <Route path='/movies/:id' element={<MovieDetails />} />
          <Route
            path='/movies/search/genre/:genre'
            element={<SearchByGenre />}
          />
          <Route
            path='/movies/search/searchQuery/:id'
            element={<SearchByQuery />}
          />
          <Route path='/cast/:castid' element={<Cast />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;

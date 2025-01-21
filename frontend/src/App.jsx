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
import SearchByKeyword from "./pages/SearchByKeyword";
import Collection from "./pages/Collection";
import Cast from "./pages/Cast";
import Login from "./pages/Login";

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
          <Route path='/collection/:collectionId' element={<Collection />} />
          <Route path='/movies/:id' element={<MovieDetails />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/movies/search/genre/:genre'
            element={<SearchByGenre />}
          />
          <Route
            path='/movies/search/keyword/:genre'
            element={<SearchByKeyword />}
          />
          <Route
            path='/movies/search/searchQuery/:id'
            element={<SearchByQuery />}
          />
          <Route path='/cast/:castId' element={<Cast />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;

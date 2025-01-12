import "../css/Home.css";
import { useMovieContext } from "../contexts/MovieContext";
import MoviePage from "../components/MoviePage";
import { useEffect } from "react";

function Favorites() {
  const { favorites, setMovies, setTotalResults, setLoading, totalResults } =
    useMovieContext();

  useEffect(() => {
    const loadFavoriteMovies = async () => {
      setMovies(favorites);
      setTotalResults(favorites.length);
      setLoading(false);
    };
    loadFavoriteMovies();
  }, []);

  if (favorites.length > 0)
    return (
      <>
        <div className='movie-grid-heading'>
          <p>
            {totalResults} {totalResults === 1 ? "movie" : "movies"} in
            favorites
          </p>
        </div>
        <div className='movie-page'>
          <MoviePage />
        </div>
      </>
    );
}

export default Favorites;

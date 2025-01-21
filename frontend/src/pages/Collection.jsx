import "../css/Home.css";
import { useMovieContext } from "../contexts/MovieContext";
import MoviePage from "../components/MoviePage";
import { useEffect } from "react";

function Collection() {
  const { setMovies, setTotalResults, setLoading, totalResults, movies } =
    useMovieContext();

  useEffect(() => {
    const loadMoviesInCollection = async () => {
      setMovies(movies);
      setTotalResults(movies.length);
      setLoading(false);
    };
    loadMoviesInCollection();
  }, []);

  return (
    <>
      <div className='movie-grid-heading'>
        <p>
          {totalResults} {totalResults === 1 ? "movie" : "movies"} movies in
          collection
        </p>
      </div>
      <div className='movie-page'>
        <MoviePage />
      </div>
    </>
  );
}

export default Collection;

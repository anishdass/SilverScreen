import "../css/Home.css";
import MoviePage from "../components/MoviePage";
import { useEffect } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { searchMoviesByQuery } from "../utils/helpers";

function Search() {
  const {
    error,
    loading,
    currentPage,
    setLoading,
    setError,
    genreId,
    setTotalResults,
    setMovies,
    searchQuery,
  } = useMovieContext();

  useEffect(() => {
    const loadSearchedMovies = async () => {
      try {
        const searchedMovies = await searchMoviesByQuery(
          searchQuery,
          currentPage
        );
        setTotalResults(searchedMovies.total_results);
        setMovies(searchedMovies.data);
      } catch (e) {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };
    loadSearchedMovies();
  }, [genreId, currentPage, setTotalResults, setMovies, setError, setLoading]);

  return (
    <div className='search'>
      {error && <div className='error-message'>{error}</div>}
      <div className='movie-grid-heading'>
        {searchQuery ? (
          <p>
            Search Result for '<i>{searchQuery}</i>'
          </p>
        ) : null}
      </div>
      {loading ? <div className='loading'>Loading...</div> : <MoviePage />}
    </div>
  );
}

export default Search;

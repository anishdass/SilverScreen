import "../css/Home.css";
import MoviePage from "../components/MoviePage";
import { useEffect } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { searchMoviesByQuery } from "../utils/APIHelper";

function Search() {
  const {
    error,
    loading,
    currentPage,
    setLoading,
    setError,
    setTotalResults,
    setMovies,
    searchQuery,
  } = useMovieContext();

  useEffect(() => {
    const loadSearchedMovies = async () => {
      if (!searchQuery.trim()) {
        setError("Search query cannot be empty.");
        setMovies([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const searchedMovies = await searchMoviesByQuery(
          searchQuery,
          currentPage
        );
        console.log(searchedMovies);

        setTotalResults(searchedMovies.total_results || 0);
        setMovies(searchedMovies.data || []);
      } catch (e) {
        setError("Failed to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadSearchedMovies();
  }, [
    searchQuery,
    currentPage,
    setTotalResults,
    setMovies,
    setError,
    setLoading,
  ]);

  return (
    <div className='search'>
      {error && <div className='error-message'>{error}</div>}

      <div className='movie-grid-heading'>
        {searchQuery && !loading && !error && (
          <p>
            Search Results for '<i>{searchQuery}</i>'
          </p>
        )}
      </div>

      {loading ? <div className='loading'>Loading...</div> : <MoviePage />}
    </div>
  );
}

export default Search;

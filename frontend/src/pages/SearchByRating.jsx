import "../css/Home.css";
import MoviePage from "../components/MoviePage";
import { useEffect } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { getMoviesByRating } from "../utils/APIHelper";

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
    selectedRating,
  } = useMovieContext();

  useEffect(() => {
    const loadSearchedMovies = async () => {
      try {
        const searchedMovies = await getMoviesByRating(
          selectedRating,
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
        {selectedRating && <p>Search Results for {selectedRating}</p>}
      </div>

      {loading ? <div className='loading'>Loading...</div> : <MoviePage />}
    </div>
  );
}

export default Search;

import "../css/Home.css";
import MoviePage from "../components/MoviePage";
import { useEffect } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { getMoviesByLanguage } from "../utils/APIHelper";

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
    totalResults,
    selectedLanguage,
  } = useMovieContext();

  useEffect(() => {
    const loadSearchedMovies = async () => {
      try {
        const searchedMovies = await getMoviesByLanguage(
          selectedLanguage,
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
        {selectedLanguage ? (
          <p>
            {totalResults} Movies in {selectedLanguage}
          </p>
        ) : null}
      </div>
      {loading ? <div className='loading'>Loading...</div> : <MoviePage />}
    </div>
  );
}

export default Search;

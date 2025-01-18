import "../css/Home.css";
import MoviePage from "../components/MoviePage";
import { useEffect } from "react";
import { searchPopularMovies } from "../utils/APIHelper";
import { useMovieContext } from "../contexts/MovieContext";

function Home() {
  const {
    error,
    setTotalResults,
    setMovies,
    setLoading,
    setError,
    currentPage,
    setGenreClicked,
  } = useMovieContext();

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setGenreClicked("");
        const popularMovies = await searchPopularMovies(currentPage);
        setTotalResults(popularMovies.total_results);
        setMovies(popularMovies.data);
      } catch (e) {
        console.log(e);

        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, [currentPage]);

  return (
    <div className='movie-page'>
      {error && <div className='error-message'>{error}</div>}
      <MoviePage />
    </div>
  );
}

export default Home;

import "../css/Home.css";
import { useLocation } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "./MovieCard";
import Pages from "../elements/Pages";

function MoviePage() {
  const { movies, loading, totalResults } = useMovieContext();
  return (
    <>
      {loading ? (
        <div className='loading'>Loading...</div>
      ) : (
        <>
          {" "}
          {location.pathname === "/" && (
            <div className='movie-grid-heading'>
              <p>{totalResults} Movies found</p>
            </div>
          )}
          <div className='movies-grid'>
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
          {totalResults > 60 && <Pages />}
        </>
      )}
    </>
  );
}

export default MoviePage;

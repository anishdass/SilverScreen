import "../css/MovieCard.css";
import "../css/Card.css";
import { useNavigate } from "react-router-dom";
import { getKeywords, getMovieDetails } from "../utils/APIHelper";
import FavoriteButton from "../elements/common/FavoriteButton";
import WatchedButton from "../elements/common/WatchedButton";
import WatchlistButton from "../elements/common/WatchlistButton";
import Card from "../elements/common/Card";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { isWatched } = useMovieContext();
  const navigate = useNavigate();

  if (!movie || !movie.id || !movie.title) return null;

  const onMovieCardClicked = async () => {
    try {
      let selectedMovie = await getMovieDetails(movie.id);
      const keywords = await getKeywords(movie.id);
      const selectedMovieWithKeywords = { ...selectedMovie, ...keywords };

      navigate(`/movies/${movie.id}`, {
        state: { movie: selectedMovieWithKeywords },
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  return (
    <div
      className={`movie-card ${isWatched(movie.id) ? "watched" : ""}`}
      onClick={onMovieCardClicked}>
      <Card data={movie} cardType={"Poster"} />
      <div className='movie-overlay'>
        <div className='action-buttons'>
          <FavoriteButton movie={movie} />
          <WatchedButton movie={movie} />
          <WatchlistButton movie={movie} />
        </div>
      </div>
    </div>
  );
}

export default MovieCard;

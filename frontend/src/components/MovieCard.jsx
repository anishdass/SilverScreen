import "../css/MovieCard.css";
import "../css/Card.css";
import { useNavigate, useLocation } from "react-router-dom";
import FavoriteButton from "../elements/FavoriteButton";
import WatchedButton from "../elements/WatchedButton";
import WatchlistButton from "../elements/WatchlistButton";
import Card from "../elements/Card";

function MovieCard({ movie }) {
  console.log(movie.id);
  const navigate = useNavigate();
  const location = useLocation();

  if (!movie || !movie.id || !movie.title) return null;

  const onMovieCardClicked = () => {
    navigate(`/movies/${movie.id}`, { state: { movie } });
  };

  return (
    <div className='movie-card' onClick={onMovieCardClicked}>
      <Card data={movie} />
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

import { useMovieContext } from "../../contexts/MovieContext";
import "../../css/WatchedButton.css";
import EyeIcon from "../../icons/EyeIcon";

function Watched({ movie }) {
  const { isWatched, addToWatched, removeFromWatched, handleAction } =
    useMovieContext();

  const onWatchedClicked = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleAction(addToWatched, removeFromWatched, isWatched(movie.id), movie);
  };

  return (
    <button
      className={`watched-btn ${isWatched(movie.id) ? "active" : ""}`}
      onClick={onWatchedClicked}>
      <EyeIcon />
    </button>
  );
}

export default Watched;

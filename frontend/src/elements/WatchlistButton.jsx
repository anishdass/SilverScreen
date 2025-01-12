import { useMovieContext } from "../contexts/MovieContext";
import "../css/WatchlistButton.css";
import WatchIcon from "../icons/WatchIcon";

function WatchlistButton({ movie }) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist, handleAction } =
    useMovieContext();

  const onWatchlistClicked = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleAction(
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist(movie.id),
      movie
    );
  };
  return (
    <button
      className={`watchlist-btn ${isInWatchlist(movie.id) ? "active" : ""}`}
      onClick={onWatchlistClicked}>
      <WatchIcon />
    </button>
  );
}

export default WatchlistButton;

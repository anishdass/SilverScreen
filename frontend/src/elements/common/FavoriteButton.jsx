import { useMovieContext } from "../../contexts/MovieContext";
import HeartIcon from "../../icons/HeartIcon";
import "../../css/FavoriteButton.css";

function FavoriteButton({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites, handleAction } =
    useMovieContext();

  const onFavoriteClicked = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleAction(
      addToFavorites,
      removeFromFavorites,
      isFavorite(movie.id),
      movie
    );
  };

  return (
    <button
      className={`favorite-btn ${isFavorite(movie.id) ? "active" : ""}`}
      onClick={onFavoriteClicked}>
      <HeartIcon />
    </button>
  );
}

export default FavoriteButton;

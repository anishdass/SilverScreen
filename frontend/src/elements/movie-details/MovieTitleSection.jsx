import FavoriteButton from "../common/FavoriteButton";
import WatchedButton from "../common/WatchedButton";
import WatchlistButton from "../common/WatchlistButton";

function MovieTitleSection({ movie, extraInfo }) {
  return (
    <div className='movie-title-section'>
      <h2 className='display-5 heading text-start'>
        {movie.title} {extraInfo?.Year ? `(${extraInfo.Year})` : null}
      </h2>
      <FavoriteButton movie={movie} />
      <WatchedButton movie={movie} />
      <WatchlistButton movie={movie} />
    </div>
  );
}

export default MovieTitleSection;

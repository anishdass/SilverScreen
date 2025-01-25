import FavoriteButton from "../common/FavoriteButton";
import WatchedButton from "../common/WatchedButton";
import WatchlistButton from "../common/WatchlistButton";
import PlayIcon from "../../icons/PlayIcon";
import PillButton from "../common/PillButton";

function MovieTitleSection({ movie, extraInfo }) {
  const today = new Date();
  const released = today >= new Date(extraInfo.Released);

  return (
    <div className='movie-title-section'>
      <h2 className='display-5 heading text-start'>{movie.title} </h2>
      <PlayIcon released={released} extraInfo={extraInfo} movie={movie} />
      <div className='action-button'>
        {movie.status !== "Planned" && <FavoriteButton movie={movie} />}
        {movie.status !== "Planned" && <WatchedButton movie={movie} />}
        <WatchlistButton movie={movie} />
      </div>
    </div>
  );
}

export default MovieTitleSection;

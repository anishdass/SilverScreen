import { IMAGE_BASE_URL, POSTER_PATH_KEY } from "../../utils/constants";

function MoviePosterSection({ movie }) {
  return (
    <div className='col-md-4'>
      <div className='movie-poster-section'>
        <img
          className='movie-poster img'
          src={`${IMAGE_BASE_URL}w500${movie[POSTER_PATH_KEY] || ""}`}
          alt={`${movie.title || "Movie"} Poster`}
        />
      </div>
    </div>
  );
}

export default MoviePosterSection;

import {
  IMAGE_BASE_URL,
  BACKDROP_PATH_KEY,
  DEFAULT_BACKDROP_IMAGE,
} from "../../utils/constants";
import { useMovieContext } from "../../contexts/MovieContext";

function BackdropImage({ movie }) {
  return (
    <div className='backdrop-img'>
      <img
        src={
          movie[BACKDROP_PATH_KEY]
            ? `${IMAGE_BASE_URL}w1280${movie[BACKDROP_PATH_KEY]}`
            : DEFAULT_BACKDROP_IMAGE
        }
        alt={`${movie.title || "Movie"} Backdrop`}
      />
    </div>
  );
}

export default BackdropImage;

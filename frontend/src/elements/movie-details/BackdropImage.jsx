import { IMAGE_BASE_URL, BACKDROP_PATH_KEY } from "../../utils/constants";

function BackdropImage({ movie }) {
  return (
    <div className='backdrop-img'>
      <img
        src={`${IMAGE_BASE_URL}w1280${movie[BACKDROP_PATH_KEY] || ""}`}
        alt={`${movie.title || "Movie"} Backdrop`}
      />
    </div>
  );
}

export default BackdropImage;

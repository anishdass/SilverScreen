import PillButton from "../common/PillButton";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../../contexts/MovieContext";

function GenreButton({ genreObj, type }) {
  const { setGenreClicked, setGenreId } = useMovieContext();

  const navigate = useNavigate();

  const genres = genreObj.map((genre, index) => (
    <span key={genre.id || index}>
      {genre.name.charAt(0).toUpperCase() + genre.name.slice(1)}
    </span>
  ));

  const handleGenreSearch = (genre) => {
    setGenreClicked(genre.props.children);
    setGenreId(genre.key);
    if (type === "genre") {
      navigate(`/movies/search/genre/${genre.props.children}`);
    } else {
      navigate(`/movies/search/keyword/${genre.props.children}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {genres &&
        genres.map((genre) => (
          <PillButton
            key={genre.id}
            data={genre}
            handleClick={handleGenreSearch}
          />
        ))}
    </>
  );
}

export default GenreButton;

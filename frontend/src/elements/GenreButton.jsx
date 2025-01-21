import PillButton from "./PillButton";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";

function GenreButton({ genreObj, type }) {
  const { setGenreClicked, setGenreId } = useMovieContext();

  const navigate = useNavigate();

  const genres = genreObj.map(
    (genre) => genre.name.charAt(0).toUpperCase() + genre.name.slice(1)
  );

  const handleGenreSearch = (genre) => {
    const selectedGenre = genreObj.find(
      (g) => g.name.charAt(0).toLowerCase() === genre.charAt(0).toLowerCase()
    );
    setGenreClicked(genre);
    setGenreId(selectedGenre.id);
    if (type === "genre") {
      navigate(`/movies/search/genre/${genre}`);
    } else {
      navigate(`/movies/search/keyword/${genre}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {genres &&
        genres.map((genre) => (
          <PillButton data={genre} handleGenreSearch={handleGenreSearch} />
        ))}
    </>
  );
}

export default GenreButton;

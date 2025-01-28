import PillButton from "../common/PillButton";
import { useMovieContext } from "../../contexts/MovieContext";
import { useNavigate } from "react-router-dom";

function LanguageButton({ movie }) {
  const { setSelectedLanguage } = useMovieContext();
  const navigate = useNavigate();
  async function handleLanguageSearch(e) {
    const selectedLanguage = movie.spoken_languages.find(
      (spoken_language) => spoken_language.english_name === e
    ).iso_639_1;

    setSelectedLanguage(selectedLanguage);
    navigate(`/movies/search/language/${selectedLanguage}`);
  }

  return (
    <div className='language'>
      {movie.spoken_languages &&
        movie.spoken_languages.map((language, index) => (
          <PillButton
            key={index}
            data={language.english_name}
            handleClick={handleLanguageSearch}
          />
        ))}
    </div>
  );
}

export default LanguageButton;

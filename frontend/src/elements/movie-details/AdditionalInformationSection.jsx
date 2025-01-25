import PillButton from "../common/PillButton";
import "../../css/AdditionalInformationSection.css";
import { useMovieContext } from "../../contexts/MovieContext";
import { useNavigate } from "react-router-dom";
import YearButton from "./YearButton";

function AdditionalInformationSection({ movie, extraInfo }) {
  const { setSelectedLanguage, setSelectedRating, setSelectedYear } =
    useMovieContext();
  const navigate = useNavigate();

  async function handleLanguageSearch(e) {
    const selectedLanguage = movie.spoken_languages.find(
      (spoken_language) => spoken_language.english_name === e
    ).iso_639_1;

    setSelectedLanguage(selectedLanguage);

    navigate(`/movies/search/language/${selectedLanguage}`);
  }

  async function handleRatingSearch(e) {
    const selectedRating = e;
    setSelectedRating(selectedRating);
    navigate(`/movies/search/rating/${selectedRating}`);
  }



  return (
    <div className='aditional-information'>
      <YearButton extraInfo={extraInfo} movie={movie} />

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
      {extraInfo.Runtime && extraInfo.Runtime !== "N/A" && (
        <PillButton data={extraInfo.Runtime} />
      )}
      {extraInfo.Rated && extraInfo.Rated !== "N/A" && (
        <PillButton data={extraInfo.Rated} handleClick={handleRatingSearch} />
      )}
    </div>
  );
}

export default AdditionalInformationSection;

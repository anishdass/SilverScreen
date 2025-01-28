import "../../css/AdditionalInformationSection.css";
import PillButton from "../common/PillButton";
import { useMovieContext } from "../../contexts/MovieContext";
import { useNavigate } from "react-router-dom";
import YearButton from "./YearButton";
import LanguageButton from "./LanguageButton";

function AdditionalInformationSection({ movie, extraInfo }) {
  const { setSelectedLanguage, setSelectedRating, setSelectedYear } =
    useMovieContext();

  const navigate = useNavigate();

  async function handleRatingSearch(e) {
    const selectedRating = e;
    setSelectedRating(selectedRating);
    navigate(`/movies/search/rating/${selectedRating}`);
  }

  return (
    <div className='aditional-information'>
      <YearButton extraInfo={extraInfo} movie={movie} />

      <LanguageButton movie={movie} />

      {extraInfo.Runtime && extraInfo.Runtime !== "N/A" && (
        <PillButton data={extraInfo.Runtime} />
      )}

      {extraInfo.Rated && extraInfo.Rated !== "N/A" && (
        <PillButton
          data={extraInfo.Rated}
          handleClick={handleRatingSearch}
          background={extraInfo.Rated === "R" ? "danger" : ""}
        />
      )}
    </div>
  );
}

export default AdditionalInformationSection;

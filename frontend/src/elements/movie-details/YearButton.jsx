import PillButton from "../common/PillButton";
import { useMovieContext } from "../../contexts/MovieContext";
import { useNavigate } from "react-router-dom";

function YearButton({ extraInfo, movie }) {
  const { setSelectedYear } = useMovieContext();
  const navigate = useNavigate();

  const handleYearSearch = (selectedYear) => {
    setSelectedYear(selectedYear);
    navigate(`/movies/search/year/${selectedYear}`);
  };

  return (
    <>
      {extraInfo?.Year ? (
        <PillButton data={extraInfo.Year} handleClick={handleYearSearch} />
      ) : (
        <PillButton
          data={movie.release_date.split("-")[0]}
          handleClick={handleYearSearch}
        />
      )}
    </>
  );
}

export default YearButton;

import PillButton from "../common/PillButton";

async function handleYearSearch(e) {
  const selectedYear = e;
  setSelectedYear(selectedYear);
  navigate(`/movies/search/year/${selectedYear}`);
}

function YearButton({ extraInfo, movie }) {
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

import PillButton from "./PillButton";

function GenreButton({ handleGenreSearch, movieGenres }) {
  return (
    <div>
      {movieGenres &&
        movieGenres.map((genre) => (
          <PillButton data={genre} handleGenreSearch={handleGenreSearch} />
        ))}
    </div>
  );
}

export default GenreButton;

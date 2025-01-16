function GenreButton({ handleGenreSearch, movieGenres }) {
  return (
    <div>
      {movieGenres &&
        movieGenres.map((genre) => (
          <button
            key={genre}
            className='btn btn-dark rounded-pill genre-button'
            onClick={() => handleGenreSearch(genre)}>
            {genre}
          </button>
        ))}
    </div>
  );
}

export default GenreButton;

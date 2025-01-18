function PillButton({ data, handleGenreSearch }) {
  return (
    <button
      key={data}
      className='btn btn-dark rounded-pill pill-button'
      onClick={handleGenreSearch ? () => handleGenreSearch(data) : null}
      disabled={!handleGenreSearch}>
      {data}
    </button>
  );
}

export default PillButton;

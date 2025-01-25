function PillButton({ data, handleClick }) {
  return (
    <button
      key={data}
      className='btn btn-dark rounded-pill pill-button'
      onClick={handleClick ? () => handleClick(data) : null}
      disabled={!handleClick}>
      {data}
    </button>
  );
}

export default PillButton;

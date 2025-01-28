function PillButton({ data, handleClick, background }) {
  return (
    <button
      key={data}
      className={`btn btn-${
        background || "secondary"
      } rounded-pill pill-button`}
      onClick={handleClick ? () => handleClick(data) : null}
      disabled={!handleClick}>
      {data}
    </button>
  );
}

export default PillButton;

const getRatingColor = (rating) => {
  // Define colors for min and max ratings
  const lowColor = [244, 67, 54]; // Red (low ratings)
  const midColor = [255, 215, 0]; // Gold (moderate ratings)
  const highColor = [76, 175, 80]; // Green (high ratings)

  // Ensure rating is within bounds (0 to 10)
  const clampedRating = Math.max(0, Math.min(rating, 10));

  let color;
  if (clampedRating >= 8) {
    // Interpolate between midColor and highColor
    const t = (clampedRating - 8) / 2;
    color = midColor.map((c, i) => Math.round(c + t * (highColor[i] - c)));
  } else if (clampedRating >= 5) {
    // Interpolate between lowColor and midColor
    const t = (clampedRating - 5) / 3;
    color = lowColor.map((c, i) => Math.round(c + t * (midColor[i] - c)));
  } else {
    // Below 5, closer to lowColor
    color = lowColor;
  }

  // Convert RGB to hex
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
};

function Star({ rating }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill={getRatingColor(rating)}
      className='bi bi-star-fill'
      viewBox='0 0 16 16'>
      <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
    </svg>
  );
}

export default Star;

function RatingSection({ ratings }) {
  return (
    <div className='rating-section'>
      {ratings.map(
        (rating, index) =>
          rating.Value !== "N/A" &&
          rating.Value !== undefined && (
            <div className='rating-item' key={index}>
              <a href={rating.Link} target='_blank' rel='noopener noreferrer'>
                <img src={rating.img} alt={`${rating.Source} logo`} />
              </a>
              <span className='rating-value'>
                {rating.Value || "Unavailable"}
              </span>
              {rating.VoteCount && (
                <span className='rating-vote-count'>
                  ({rating.VoteCount || "Unavailable"})
                </span>
              )}
            </div>
          )
      )}
    </div>
  );
}

export default RatingSection;

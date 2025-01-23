import AdditionalInformationSection from "./AdditionalInformationSection";
import GenreButton from "./GenreButton";
import MovieTitleSection from "./MovieTitleSection";
import RatingSection from "./RatingSection";
import StreamingPlatformSection from "./StreamingPlatformSection";
import YourRating from "./YourRating";

function MovieDetailsSection({
  movie,
  extraInfo,
  ratingsArray,
  streamingData,
  currentCountry,
}) {
  return (
    <div className='movie-details-section col-md-8'>
      <MovieTitleSection movie={movie} extraInfo={extraInfo} />
      <div className='movie-tagline-section'>
        <b>
          <i>{movie.tagline}</i>
        </b>
      </div>

      <AdditionalInformationSection movie={movie} extraInfo={extraInfo} />

      <div className='movie-overview description'>{movie.overview}</div>

      <div className='genre-section'>
        <GenreButton genreObj={movie.genres} type={"genre"} />
      </div>

      {ratingsArray && <RatingSection ratingsArray={ratingsArray} />}

      <YourRating />

      <StreamingPlatformSection
        streamingData={streamingData}
        currentCountry={currentCountry}
      />
    </div>
  );
}

export default MovieDetailsSection;

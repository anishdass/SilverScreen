//Impporting CSS
import "../css/MovieDetails.css";
import "../css/Fonts.css";
import "../css/Logo.css";

//Imports
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMovieContext } from "../contexts/MovieContext";

//Importing helpers
import {
  getTrailerDetails,
  getCastAndCrewDetails,
  getStreamingDetails,
  getCurrentCountry,
  getExtraInfo,
  getSimilarMovies,
  getCollectionDetails,
  getReviewDetails,
  getWikiData,
} from "../utils/APIHelper";

import { getRatingsArray } from "../utils/helper";

//Importing Elements
import Divider from "../elements/common/Divider";
import CastNavbarSection from "../elements/movie-details/CastNavbar";
import CommentBox from "../elements/movie-details/CommentBox";
import CommentArea from "../elements/movie-details/CommentArea";
import BackdropImageSection from "../elements/movie-details/BackdropImage";
import MoviePosterSection from "../elements/movie-details/MoviePosterSection";
import MovieDetailsSection from "../elements/movie-details/MovieDetailsSection";

function MovieDetails() {
  const { setLoading, setError, streamingData, setStreamingData } =
    useMovieContext();
  const { state: { movie } = {} } = useLocation();

  const [casts, setCasts] = useState([]);
  const [crewMembers, setCrew] = useState([]);
  const [currentCountry, setCurrentCountry] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [ratingsArray, setRatingsArray] = useState("");
  const [similarMovies, setSimilarMovies] = useState([]);
  const [moviesInCollection, setMoviesInCollection] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [reviews, setReviews] = useState([]);
  //  const [plot, setPlot] = useState([]);
  const genres_string = movie.genres.map((genre) => genre.id).join("|");
  const keywords_string = movie.keywords.map((keyword) => keyword.id).join("|");
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [
          trailers,
          castCrew,
          streaming,
          country,
          extraInfo,
          similarMovies,
          moviesInCollectionDetails,
          // reviews,
          // plot,
        ] = await Promise.all([
          getTrailerDetails(movie.id),
          getCastAndCrewDetails(movie.id),
          getStreamingDetails(movie.id),
          getCurrentCountry(),
          getExtraInfo(movie.title, "movie", movie.release_date.split("-")[0]),

          getSimilarMovies(movie.id, genres_string, keywords_string),
          movie.belongs_to_collection
            ? getCollectionDetails(movie.belongs_to_collection.id)
            : Promise.resolve(null),
          // getReviewDetails(
          //   movie.title.replace(/ /g, "+"),
          //   movie.release_date.split("-")[0]
          // ),
          // getWikiData(movie.title.replace(/ /g, "+")),
        ]);

        setTrailers(trailers);
        setCasts(castCrew?.cast || []);
        setCrew(castCrew?.crew || []);
        setStreamingData(streaming || {});
        setCurrentCountry(country || "GB");
        setExtraInfo(extraInfo);

        const ratingsData = getRatingsArray({ extraInfo, movie });
        setRatingsArray(ratingsData);

        setSimilarMovies(similarMovies);
        setMoviesInCollection(moviesInCollectionDetails?.parts || []);
        // setReviews(reviews.items);
        // setPlot(plot);
      } catch (error) {
        setError("Failed to load data");
        console.error("Error loading movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [
    movie.id,
    setLoading,
    setError,
    setTrailers,
    setStreamingData,
    setCurrentCountry,
    setExtraInfo,
    setRatingsArray,
    setSimilarMovies,
    setMoviesInCollection,
    // setReviews,
  ]);

  return (
    <>
      {/* Movie Backdrop */}
      <BackdropImageSection movie={movie} />

      <div className='container'>
        <div className='row align-items-start'>
          {/* Movie Poster */}
          <MoviePosterSection movie={movie} />

          {/* Movie Details */}
          <MovieDetailsSection
            movie={movie}
            extraInfo={extraInfo}
            ratingsArray={ratingsArray}
            streamingData={streamingData}
            currentCountry={currentCountry}
          />

          <CastNavbarSection
            casts={casts}
            crewMembers={crewMembers}
            movie={movie}
            similarMovies={similarMovies}
            moviesInCollection={moviesInCollection}
            extraInfo={extraInfo}
            trailers={trailers}
            reviews={reviews}
          />
        </div>

        <Divider />

        <div className='user-comments'></div>

        <CommentArea movie={movie} />

        <CommentBox
          rows={5}
          label={"Comments"}
          placeholderText={"Your Comments Here"}
          movie={movie}
        />
      </div>
    </>
  );
}

export default MovieDetails;

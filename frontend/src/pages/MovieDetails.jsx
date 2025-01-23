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
  getVideoDetails,
  getCastAndCrewDetails,
  getStreamingDetails,
  getCurrentCountry,
  getExtraInfo,
  getSimilarMovies,
  getCollectionDetails,
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
  const { state: { movie } = {} } = useLocation();
  const [casts, setCasts] = useState([]);
  const [crewMembers, setCrew] = useState([]);
  const [currentCountry, setCurrentCountry] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [ratingsArray, setRatingsArray] = useState("");
  const [similarMovies, setSimilarMovies] = useState([]);
  const [moviesInCollection, setMoviesInCollection] = useState([]);
  const { setLoading, setError, setVideos, streamingData, setStreamingData } =
    useMovieContext();

  useEffect(() => {
    const loadData = async () => {
      const genres_string = movie.genres.map((genre) => genre.id).join("|");
      const keywords_string = movie.keywords
        .map((keyword) => keyword.id)
        .join("|");

      setLoading(true);
      try {
        // Fetch data in parallel where possible
        const [
          videos,
          castCrew,
          streaming,
          country,
          extraInfo,
          similarMovies,
          moviesInCollectionDetails,
        ] = await Promise.all([
          getVideoDetails(movie.id),
          getCastAndCrewDetails(movie.id),
          getStreamingDetails(movie.id),
          getCurrentCountry(),
          getExtraInfo(movie.title, "movie", movie.release_date.split("-")[0]),

          getSimilarMovies(genres_string, keywords_string),
          movie.belongs_to_collection
            ? getCollectionDetails(movie.belongs_to_collection.id)
            : Promise.resolve(null),
        ]);

        setVideos(videos);
        setCasts(castCrew?.cast || []);
        setCrew(castCrew?.crew || []);
        setStreamingData(streaming || {});
        setCurrentCountry(country || "GB");
        setExtraInfo(extraInfo);

        const ratingsData = getRatingsArray({ extraInfo, movie });
        setRatingsArray(ratingsData);

        setSimilarMovies(similarMovies);
        setMoviesInCollection(moviesInCollectionDetails?.parts || []);
      } catch (error) {
        setError("Failed to load data");
        console.error("Error loading movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [movie.id, setLoading, setError, setVideos, setStreamingData]);

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
          />
        </div>

        <Divider />

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

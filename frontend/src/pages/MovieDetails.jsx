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
  //getCurrentCountry,
  getRatingArray,
  getSimilarMovies,
  getCollectionDetails,
} from "../utils/APIHelper";

import { getGenres } from "../utils/DBHelper";

//Importing constants
import {
  IMAGE_BASE_URL,
  POSTER_PATH_KEY,
  BACKDROP_PATH_KEY,
} from "../utils/constants";

//Importing Logos
import InternetMovieDatabaseLogo from "../images/Internet_Movie_Database_logo.png";
import MetacriticLogo from "../images/Metacritic_logo.png";
import RottenTomatoesLogo from "../images/Rotten_Tomatoes_logo.png";
import TMDBLogo from "../images/TMDB_logo.png";

//Importing components

//Importing Elements
import FavoriteButton from "../elements/FavoriteButton";
import WatchedButton from "../elements/WatchedButton";
import WatchlistButton from "../elements/WatchlistButton";
import CommentBox from "../elements/CommentBox";
import CommentArea from "../elements/CommentArea";
import GenreButton from "../elements/GenreButton";
import Divider from "../elements/Divider";
import YourRating from "../elements/YourRating";

import CastNavbar from "../elements/CastNavbar";
import StreamingPlatformSection from "../elements/StreamingPlatformSection";
import RatingSection from "../elements/RatingSection";
import AdditionalInformationSection from "../elements/AdditionalInformationSection";

function MovieDetails() {
  const { state: { movie } = {} } = useLocation();
  const [casts, setCasts] = useState([]);
  const [crewMembers, setCrew] = useState([]);
  const [currentCountry, setCurrentCountry] = useState([]);
  const [ratingsData, setRatingsData] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [moviesInCollection, setMoviesInCollection] = useState([]);
  const { setLoading, setError, setVideos, streamingData, setStreamingData } =
    useMovieContext();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const videos = await getVideoDetails(movie.id);
        setVideos(videos);

        const castCrew = await getCastAndCrewDetails(movie.id);
        setCasts(castCrew.cast || []);
        setCrew(castCrew.crew || []);

        const streaming = await getStreamingDetails(movie.id);
        setStreamingData(streaming || {});

        // const Country = await getCurrentCountry();
        //setCurrentCountry(Country ? Country : "UK");
        setCurrentCountry("GB");

        const currentRatings = await getRatingArray(
          movie.title,
          "movie",
          movie.release_date.split("-")[0]
        );
        setRatingsData(currentRatings);

        const similarMovies = await getSimilarMovies(movie.id);
        setSimilarMovies(similarMovies);

        if (movie.belongs_to_collection) {
          const moviesInCollection = await getCollectionDetails(
            movie.belongs_to_collection.id
          );
          console.log(movie.belongs_to_collection.id);
          setMoviesInCollection(moviesInCollection.parts);
        }
      } catch (error) {
        setError("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [movie.id, setLoading, setError, setVideos, setStreamingData]);

  console.log(ratingsData);

  const ratings = [
    {
      Source: "IMDb",
      Value: ratingsData.imdbRating,
      VoteCount: ratingsData.imdbVotes,
      Link: `https://www.imdb.com/title/${ratingsData.imdbID}/`,
      img: InternetMovieDatabaseLogo,
    },
    {
      Source: "Rotten Tomatoes",
      Value: ratingsData.Ratings?.[1]?.Value,
      Link: `https://www.rottentomatoes.com/m/${movie.title
        .toLowerCase()
        .replace(/ /g, "_")}`,
      img: RottenTomatoesLogo,
    },
    {
      Source: "Metacritic",
      Value: ratingsData.Metascore,
      Link: `https://www.metacritic.com/movie/${movie.title
        .toLowerCase()
        .replace(/ /g, "-")}`,
      img: MetacriticLogo,
    },
    {
      Source: "TMDB",
      Value: movie.vote_average?.toFixed(1),
      VoteCount: movie.vote_count,
      Link: `https://www.themoviedb.org/movie/${movie.id}`,
      img: TMDBLogo,
    },
  ];

  return (
    <div className='container'>
      <div className='backdrop-img'>
        <img
          src={`${IMAGE_BASE_URL}w1280${movie[BACKDROP_PATH_KEY] || ""}`}
          alt={`${movie.title || "Movie"} Backdrop`}
        />
      </div>
      <div className='row align-items-start'>
        {/* Movie Poster */}
        <div className='col-md-4'>
          <div className='movie-poster-section'>
            <img
              className='movie-poster img'
              src={`${IMAGE_BASE_URL}w500${movie[POSTER_PATH_KEY] || ""}`}
              alt={`${movie.title || "Movie"} Poster`}
            />
          </div>
        </div>

        {/* Movie Details */}

        <div className='movie-details-section col-md-8'>
          {/* Movie title with action buttons */}
          <div className='movie-title-section'>
            <h2 className='display-5 heading text-start'>
              {movie.title} {ratingsData.Year ? `(${ratingsData.Year})` : null}
            </h2>
            <FavoriteButton movie={movie} />
            <WatchedButton movie={movie} />
            <WatchlistButton movie={movie} />
          </div>
          <div className='movie-tagline-section'>
            <b>
              <i>{movie.tagline}</i>
            </b>
          </div>

          <AdditionalInformationSection
            movie={movie}
            ratingsData={ratingsData}
          />

          <div className='movie-overview description'>{movie.overview}</div>

          <div className='genre-section'>
            <GenreButton genreObj={movie.genres} type={"genre"} />
          </div>

          <RatingSection ratings={ratings} />

          <YourRating />

          <StreamingPlatformSection
            streamingData={streamingData}
            currentCountry={currentCountry}
          />
        </div>

        <CastNavbar
          casts={casts}
          crewMembers={crewMembers}
          movie={movie}
          similarMovies={similarMovies}
          moviesInCollection={moviesInCollection}
          ratingsData={ratingsData}
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
  );
}

export default MovieDetails;

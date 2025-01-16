import "../css/MovieDetails.css";
import "../css/Fonts.css";

import CastAndCrewSection from "../components/CastAndCrewSection";
import PromoSection from "../components/PromoSection";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { Tab, Nav } from "react-bootstrap";
import {
  getVideoDetails,
  getCastAndCrewDetails,
  getStreamingDetails,
  getGenres,
  getCurrentCountry,
} from "../utils/helpers";

import {
  DEFAULT_PROFILE_IMAGE,
  IMAGE_BASE_URL,
  LOGO_PATH_KEY,
  STREAMING_KEY,
  POSTER_PATH_KEY,
  BACKDROP_PATH_KEY,
} from "../utils/constants";

import FavoriteButton from "../elements/FavoriteButton";
import WatchedButton from "../elements/WatchedButton";
import WatchlistButton from "../elements/WatchlistButton";
import CommentBox from "../elements/CommentBox";
import CommentArea from "../elements/CommentArea";
import GenreButton from "../elements/GenreButton";
import Divider from "../elements/Divider";
import YourRating from "../elements/YourRating";
import Star from "../icons/Star";

function MovieDetails() {
  const { state: { movie } = {} } = useLocation();
  const [casts, setCasts] = useState([]);
  const [crewMembers, setCrew] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentCountry, setCurrentCountry] = useState([]);
  const {
    setLoading,
    setGenreClicked,
    setGenreId,
    setError,
    setVideos,
    streamingData,
    setStreamingData,
  } = useMovieContext();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [videos, castCrew, streaming, allGenres, curCountry] =
          await Promise.all([
            getVideoDetails(movie.id),
            getCastAndCrewDetails(movie.id),
            getStreamingDetails(movie.id),
            getGenres(),
            //getCurrentCountry(),
          ]);
        setVideos(videos);
        setCasts(castCrew.cast || []);
        setCrew(castCrew.crew || []);
        setStreamingData(streaming || {});
        setGenres(allGenres.genres || {});
        setCurrentCountry(curCountry ? curCountry : "UK");
      } catch (error) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [movie.id, setLoading, setError, setVideos, setStreamingData]);

  console.log(movie);

  const movieGenres = useMemo(
    () =>
      genres
        .filter((genre) => movie.genre_ids.includes(genre.id))
        .map((genre) => genre.name),
    [movie.genre_ids, genres]
  );

  const handleGenreSearch = (genre) => {
    const selectedGenre = genres.find((g) => g.name === genre);
    if (selectedGenre) {
      setGenreClicked(genre);
      setGenreId(selectedGenre.id);
      navigate(`/movies/search/genre/${genre}`);
    }
  };

  const renderStreamingPlatforms = () =>
    streamingData[currentCountry]?.[STREAMING_KEY]?.length > 0 ? (
      streamingData[currentCountry][STREAMING_KEY].map((platform) => (
        <img
          key={platform.display_priority}
          className='streaming-platform img'
          src={
            platform[LOGO_PATH_KEY]
              ? `${IMAGE_BASE_URL}w500${platform[LOGO_PATH_KEY]}`
              : DEFAULT_PROFILE_IMAGE
          }
          alt={platform.name || "Streaming Platform"}
        />
      ))
    ) : (
      <p>Not Streaming in your country</p>
    );

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
              {movie.title}{" "}
              {movie.release_date
                ? `(${movie.release_date.substring(0, 4)})`
                : null}
            </h2>
            <FavoriteButton movie={movie} />
            <WatchedButton movie={movie} />
            <WatchlistButton movie={movie} />
          </div>

          {/* Movie overview */}
          <div className='movie-overview description'>{movie.overview}</div>

          <div className='genre-and-rating-section d-flex align-items-center'>
            <GenreButton
              handleGenreSearch={handleGenreSearch}
              movieGenres={movieGenres}
            />
            {movie.vote_count > 500 && (
              <div className='rating-section'>
                <div className='star'>
                  <Star
                    rating={(Math.round(movie.vote_average * 10) / 10).toFixed(
                      1
                    )}
                  />
                </div>
                <span className='rating-value'>
                  {(Math.round(movie.vote_average * 10) / 10).toFixed(1)}
                </span>
              </div>
            )}
          </div>
          <YourRating />

          {/* Streaming information */}
          <div className='streaming-platforms'>
            {renderStreamingPlatforms()}
          </div>

          {/* Tabs for Cast, Crew, and Promos */}
          <Tab.Container defaultActiveKey='cast'>
            <div className='movie-details-tabs'>
              <Nav variant='tabs' className='justify-content-center mb-4'>
                {casts.length > 0 && (
                  <Nav.Item>
                    <Nav.Link eventKey='cast'>Cast</Nav.Link>
                  </Nav.Item>
                )}
                {crewMembers.length > 0 && (
                  <Nav.Item>
                    <Nav.Link eventKey='crew'>Crew</Nav.Link>
                  </Nav.Item>
                )}
                <Nav.Item>
                  <Nav.Link eventKey='promo'>Teaser/Trailer</Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                {casts.length > 0 && (
                  <Tab.Pane eventKey='cast'>
                    <CastAndCrewSection data={casts} />
                  </Tab.Pane>
                )}
                {crewMembers.length > 0 && (
                  <Tab.Pane eventKey='crew'>
                    <CastAndCrewSection data={crewMembers} />
                  </Tab.Pane>
                )}
                <Tab.Pane eventKey='promo'>
                  <PromoSection />
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
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
    </div>
  );
}

export default MovieDetails;

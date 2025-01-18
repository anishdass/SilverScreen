import "../css/Cast.css";
import "../css/Fonts.css";

import Card from "../elements/Card";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, Nav } from "react-bootstrap";
import { useMovieContext } from "../contexts/MovieContext";

import {
  IMAGE_BASE_URL,
  IMAGE_PATH_KEY,
  DEFAULT_PROFILE_IMAGE,
} from "../utils/constants";

import { getArtistFilmography } from "../utils/APIHelper";
import { getJobList } from "../utils/helper";

function Cast() {
  const { setLoading, setError } = useMovieContext();
  const [artistAsCast, setArtistAsCast] = useState([]);
  const [artistAsCrew, setArtistAsCrew] = useState([]);
  const [activeJob, setActiveJob] = useState("");
  const [defaultKey, setDefaultKey] = useState(null); // Track the default active key
  const castInfo = JSON.parse(sessionStorage.getItem("castInfo")) || {};
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const temp = await getArtistFilmography(castInfo.id);
        setArtistAsCast(temp.cast || []);
        setArtistAsCrew(temp.crew || []);

        // Determine the default active key
        const uniqueJobs = [...new Set(temp.crew.map((data) => data.job))];
        if (temp.cast.length > 0) {
          setDefaultKey("cast");
        } else if (uniqueJobs.length > 0) {
          setDefaultKey(uniqueJobs[0]);
          setActiveJob(uniqueJobs[0]); // Set active job explicitly
        } else {
          setDefaultKey(null); // Fallback for no data
        }
      } catch (error) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    if (castInfo.id) loadData();
  }, [castInfo.id, setLoading, setError]);

  const onMovieCardClicked = (movie) =>
    navigate(`/movies/${movie.id}`, { state: { movie } });

  const getYears = (movies, filterJob = null) =>
    [
      ...new Set(
        movies
          .filter((movie) => (filterJob ? movie.job === filterJob : true))
          .map((movie) => {
            const year = new Date(movie.release_date).getFullYear();
            return isNaN(year) ? null : year;
          })
          .filter((year) => year !== null)
      ),
    ].sort((a, b) => a - b);

  // Rendering movie Cards
  const renderMovieCards = (movies) => (
    <div className='d-flex flex-row overflow-auto'>
      {movies.map((movie) => (
        <Card
          data={movie}
          onCardClicked={onMovieCardClicked}
          cardType='poster'
          key={movie.id}
        />
      ))}
    </div>
  );

  // Rendering year tabs
  const renderYearTabs = (movies, filterJob = null) => {
    const years = getYears(movies, filterJob);

    return (
      <Tab.Container defaultActiveKey='All'>
        <Nav
          variant='pills'
          className='justify-content-center mb-3 flex-nowrap overflow-auto px-2'>
          {years && years.length > 1 && (
            <Nav.Item>
              <Nav.Link eventKey='All'>All</Nav.Link>
            </Nav.Item>
          )}

          {years && years.length > 1 && (
            <Nav.Item>
              <Nav.Link eventKey='Oldest'>Oldest</Nav.Link>
            </Nav.Item>
          )}

          {years.map((year) => (
            <Nav.Item key={year}>
              <Nav.Link eventKey={year}>{year}</Nav.Link>
            </Nav.Item>
          ))}

          {years && years.length > 1 && (
            <Nav.Item>
              <Nav.Link eventKey='Newest'>Newest</Nav.Link>
            </Nav.Item>
          )}
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey='All'>
            {renderMovieCards(
              movies.filter((movie) =>
                filterJob ? movie.job === filterJob : true
              )
            )}
          </Tab.Pane>
          {years.map((year) => (
            <Tab.Pane eventKey={year} key={year}>
              {renderMovieCards(
                movies.filter(
                  (movie) =>
                    (filterJob ? movie.job === filterJob : true) &&
                    new Date(movie.release_date).getFullYear() === year
                )
              )}
            </Tab.Pane>
          ))}
          <Tab.Pane eventKey='Oldest'>
            {renderMovieCards(
              movies
                .filter((movie) => (filterJob ? movie.job === filterJob : true))
                .sort(
                  (a, b) => new Date(a.release_date) - new Date(b.release_date)
                )
            )}
          </Tab.Pane>
          <Tab.Pane eventKey='Newest'>
            {renderMovieCards(
              movies
                .filter((movie) => (filterJob ? movie.job === filterJob : true))
                .sort(
                  (a, b) => new Date(b.release_date) - new Date(a.release_date)
                )
            )}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    );
  };

  if (!defaultKey) {
    return <div>Loading...</div>; // Show a loader until the defaultKey is determined
  }

  return (
    <div className='container mt-4'>
      {/* Cast Info Section */}
      <div className='cast-info-profile cast-info-card p-3 shadow-sm'>
        <div className='row g-4'>
          <div className='col-md-4 text-center'>
            <div className='cast-info-image'>
              <img
                src={
                  castInfo.profile_path
                    ? `${IMAGE_BASE_URL}w500${castInfo[IMAGE_PATH_KEY]}`
                    : DEFAULT_PROFILE_IMAGE
                }
                alt={castInfo.name || "Unknown actor"}
                className='img-fluid rounded'
              />
            </div>
          </div>
          <div className='col-md-8'>
            <h2 className='cast-info-name heading'>
              {castInfo.name || "Unknown Actor"}
            </h2>
            <p className='text-muted'>
              Known For: {castInfo.known_for_department || "N/A"}
            </p>
            <p className='cast-info-bio description'>
              {castInfo.biography || "Biography not available."}
            </p>
          </div>
        </div>
      </div>

      {/* Cast and Crew Section */}
      <Tab.Container defaultActiveKey={defaultKey}>
        <div className='cast-and-crew-tabs'>
          {/* Navs for Cast and Crew */}
          <Nav variant='tabs' className='justify-content-center mb-4'>
            {artistAsCast.length > 0 && (
              <Nav.Item>
                <Nav.Link eventKey='cast'>Cast</Nav.Link>
              </Nav.Item>
            )}
            {artistAsCrew.length > 0 &&
              getJobList(artistAsCrew).map((jobTitle) => (
                <Nav.Item key={jobTitle}>
                  <Nav.Link eventKey={jobTitle}>{jobTitle}</Nav.Link>
                </Nav.Item>
              ))}
          </Nav>

          {/* Tab Content */}
          <Tab.Content>
            {artistAsCast.length > 0 && (
              <Tab.Pane eventKey='cast'>
                {renderYearTabs(artistAsCast)}
              </Tab.Pane>
            )}
            {artistAsCrew.length > 0 &&
              getJobList(artistAsCrew).map((jobTitle) => (
                <Tab.Pane eventKey={jobTitle} key={jobTitle}>
                  {renderYearTabs(artistAsCrew, jobTitle)}
                </Tab.Pane>
              ))}
          </Tab.Content>
        </div>
      </Tab.Container>
    </div>
  );
}

export default Cast;

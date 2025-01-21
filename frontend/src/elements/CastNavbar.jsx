import { Tab, Nav } from "react-bootstrap";
import PromoSection from "../components/PromoSection";
import MoreInformationSection from "../components/MoreInformationSection";
import CastAndCrewSection from "../components/CastAndCrewSection";
import Card from "../elements/Card";
import { getKeywords, getMovieDetails } from "../utils/APIHelper";
import { useNavigate } from "react-router-dom";

function CastNavbar({
  casts,
  crewMembers,
  movie,
  similarMovies,
  moviesInCollection,
  ratingsData,
}) {
  const navigate = useNavigate();
  const onMovieCardClicked = async (movie) => {
    try {
      let selectedMovie = await getMovieDetails(movie.id);
      const keywords = await getKeywords(movie.id);
      const selectedMovieWithKeywords = { ...selectedMovie, ...keywords };
      navigate(`/movies/${movie.id}`, {
        state: { movie: selectedMovieWithKeywords },
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };
  return (
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
            <Nav.Link eventKey='promo'>Promotions</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='similar-movies'>Similar Movies</Nav.Link>
          </Nav.Item>
          {movie.belongs_to_collection && (
            <Nav.Item>
              <Nav.Link eventKey='collection'>Collection</Nav.Link>
            </Nav.Item>
          )}
          <Nav.Item>
            <Nav.Link eventKey='more'>Other</Nav.Link>
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
          <Tab.Pane eventKey='similar-movies'>
            <div className='d-flex flex-row overflow-auto'>
              {similarMovies &&
                similarMovies.map((movie) => (
                  <Card
                    data={movie}
                    onCardClicked={onMovieCardClicked}
                    cardType='poster'
                    key={movie.id}
                  />
                ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey='collection'>
            <div className='d-flex flex-row overflow-auto'>
              {moviesInCollection &&
                moviesInCollection.map((movie) => (
                  <Card
                    data={movie}
                    onCardClicked={onMovieCardClicked}
                    cardType='poster'
                    key={movie.id}
                  />
                ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey='more'>
            <MoreInformationSection movie={movie} ratingsData={ratingsData} />
          </Tab.Pane>
        </Tab.Content>
      </div>
    </Tab.Container>
  );
}

export default CastNavbar;

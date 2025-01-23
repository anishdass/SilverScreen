import { useNavigate } from "react-router-dom";

function NoMovie({ page }) {
  const navigate = useNavigate();

  function handleExploreClick() {
    navigate("/");
  }
  return (
    <div className='no-movies-found'>
      <div className='no-movies-found-content'>
        <h2>No movies in {page}</h2>
        <p>Start exploring and add your favorite movies to this list!</p>
        <button className='explore-button' onClick={handleExploreClick}>
          Explore Movies
        </button>
      </div>
    </div>
  );
}

export default NoMovie;

import React from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { useNavigate } from "react-router-dom";

function SearchComponent() {
  const { setSearchQuery, searchQuery, loading } = useMovieContext();

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    navigate(`movies/search/searchQuery/${searchQuery}`);
  };

  return (
    <form className='d-flex' role='search' onSubmit={handleSearch}>
      <input
        className='form-control me-2'
        type='search'
        placeholder='Search for movies'
        aria-label='Search'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className='btn btn-outline-success' type='submit'>
        Search
      </button>
    </form>
  );
}

export default SearchComponent;

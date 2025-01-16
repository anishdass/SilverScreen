import React from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { useNavigate } from "react-router-dom";

function SearchComponent() {
  const { setSearchQuery, searchQuery, loading } = useMovieContext();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    // Ensure the search query is not empty or whitespace
    if (!searchQuery.trim()) {
      alert("Please enter a valid search query.");
      return;
    }

    // Prevent navigation if loading
    if (loading) {
      return;
    }

    // Navigate to the search results page
    navigate(`/movies/search/searchQuery/${searchQuery}`);
  };

  return (
    <form className='d-flex' role='search' onSubmit={handleSearch}>
      <input
        className='form-control me-2'
        type='search'
        placeholder='Search for movies'
        aria-label='Search'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.trimStart())} // Prevent leading spaces
      />
      <button
        className='btn btn-outline-success'
        type='submit'
        disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchComponent;

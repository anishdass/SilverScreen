import axios from "axios";

// Fetch multiple pages of movies
export const fetchMovies = async (url, startPage, endPage) => {
  try {
    let data = [];
    for (let i = startPage; i <= endPage; i++) {
      const response = await axios.get(`${url}&page=${i}`);
      data = [...data, ...response.data.results];
    }
    return data;
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    return [];
  }
};

// Fetch paginated movies
export const fetchPaginatedMovies = async (
  baseUrl,
  pageNumber,
  extraParams = ""
) => {
  try {
    const startPage = (pageNumber - 1) * 3 + 1;
    const endPage = startPage + 2;

    // Fetch the first page of results
    const firstPageResponse = await axios.get(
      `${baseUrl}&page=${pageNumber}${extraParams}`
    );
    const firstPage = firstPageResponse.data;

    // Fetch additional pages
    const additionalData = await fetchMovies(
      baseUrl + extraParams,
      startPage + 1,
      endPage
    );

    return {
      data: [...firstPage.results, ...additionalData],
      total_pages: firstPage.total_pages,
      total_results: firstPage.total_results,
    };
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    return { data: [], total_pages: 0, total_results: 0 };
  }
};

// Generic API to fetch data
export const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from API:", error.message);
    throw error;
  }
};

// Fetch results from the API (expects `results` key in response)
export const fetchDataResults = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching data results from API:", error.message);
    throw error;
  }
};

export const fetchSimilarMoviesSortedByPopularity = async (url) => {
  try {
    const response = await axios.get(url);
    const movies = response.data.results;

    return movies;
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    return [];
  }
};

// API to fetch Current Country
export const fetchCurrentCountry = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data.country_code;
  } catch (error) {
    console.error("Error fetching current country:", error.message);
    throw error;
  }
};

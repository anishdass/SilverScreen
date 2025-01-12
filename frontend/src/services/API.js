export const fetchMovies = async (url, startPage, endPage) => {
  try {
    let data = [];
    for (let i = startPage; i <= endPage; i++) {
      const response = await fetch(`${url}&page=${i}`);
      if (!response.ok) {
        console.warn(
          `Failed to fetch page ${i}: ${response.status} - ${response.statusText}`
        );
        continue;
      }
      const pageData = await response.json();
      data = [...data, ...pageData.results];
    }
    return data;
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
};

export const fetchPaginatedMovies = async (
  baseUrl,
  pageNumber,
  extraParams = ""
) => {
  try {
    const startPage = (pageNumber - 1) * 3 + 1;
    const endPage = startPage + 2;

    const response = await fetch(`${baseUrl}&page=${pageNumber}${extraParams}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch movies: ${response.status} - ${response.statusText}`
      );
    }
    const firstPage = await response.json();

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
    console.error("Error fetching movies:", error);
    return { data: [], total_pages: 0, total_results: 0 };
  }
};

// API to get data
export const fetchData = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      throw new Error("Failed to fetch genres");
    }
  } catch (error) {
    console.error("Error fetching genres from API:", error);
    throw error;
  }
};

// API to fetch Streaming details
export const fetchStreamingDetails = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return data.results;
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      throw new Error("Failed to fetch genres");
    }
  } catch (error) {
    console.error("Error fetching genres from API:", error);
    throw error;
  }
};

// API to get video details
export const fetchVideoDetails = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return data.results;
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      throw new Error("Failed to fetch genres");
    }
  } catch (error) {
    console.error("Error fetching genres from API:", error);
    throw error;
  }
};

// API to fetch Current Country
export const fetchCurrentCountry = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return data.country_code;
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      throw new Error("Failed to fetch genres");
    }
  } catch (error) {
    console.error("Error fetching genres from API:", error);
    throw error;
  }
};

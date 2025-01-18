import { STORAGE } from "../utils/constants";

export function getCommentData() {
  const comments = JSON.parse(STORAGE.getItem("comments")) || [];
  return comments;
}

export async function getGenres() {
  const allGenres = { genres: JSON.parse(STORAGE.getItem("genres")) };

  if (allGenres.genres && Object.keys(allGenres.genres).length > 0) {
    return allGenres;
  } else {
    const fetchedGenres = await fetchData(
      `${BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=${LANG}`
    );

    STORAGE.setItem("genres", JSON.stringify(fetchedGenres.genres));

    return { genres: fetchedGenres.genres };
  }
}

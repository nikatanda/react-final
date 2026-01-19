import axios from "axios";

const API_KEY = "80adfd9c20287d0b69e2bbb3004d3fbb";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  genres?: Genre[];
  runtime?: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  tagline?: string;
  credits?: {
    cast: Cast[];
  };
}

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getPopularMovies = async (
  page: number = 1,
): Promise<{ results: Movie[]; total_pages: number }> => {
  const response = await api.get("/movie/popular", { params: { page } });
  return response.data;
};

export const getTopRatedMovies = async (
  page: number = 1,
): Promise<{ results: Movie[]; total_pages: number }> => {
  const response = await api.get("/movie/top_rated", { params: { page } });
  return response.data;
};

export const getNowPlayingMovies = async (
  page: number = 1,
): Promise<{ results: Movie[]; total_pages: number }> => {
  const response = await api.get("/movie/now_playing", { params: { page } });
  return response.data;
};

export const getUpcomingMovies = async (
  page: number = 1,
): Promise<{ results: Movie[]; total_pages: number }> => {
  const response = await api.get("/movie/upcoming", { params: { page } });
  return response.data;
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  const response = await api.get(`/movie/${id}`, {
    params: {
      append_to_response: "credits,similar",
    },
  });
  return response.data;
};

export const searchMovies = async (
  query: string,
  page: number = 1,
): Promise<{ results: Movie[]; total_pages: number }> => {
  const response = await api.get("/search/movie", {
    params: { query, page },
  });
  return response.data;
};

export const getImageUrl = (
  path: string | null,
  size: "w200" | "w300" | "w500" | "w780" | "original" = "w500",
): string => {
  if (!path) {
    // Return a placeholder SVG data URL
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9Ijc1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9Ijc1MCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=";
  }
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export default api;

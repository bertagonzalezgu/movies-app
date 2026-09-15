import axios from 'axios'
import type { DiscoverParams } from '../types/discover.types'
import type { MovieDetails, MovieVideo } from '../types/movies.types'
import type { Credits } from '../types/credits.types'
import type { PersonDetails, PersonMovieCredits } from '../types/person.types'

const API_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const tmdb = axios.create({
  baseURL: API_URL,
  params:{
    api_key: API_KEY,
    language: 'es-ES',
  },
})

export const MOVIE_GENRES = [
  { id: "", name: "Todos los géneros" },
  { id: "28", name: "Acción" },
  { id: "35", name: "Comedia" },
  { id: "18", name: "Drama" },
  { id: "27", name: "Terror" },
  { id: "878", name: "Ciencia Ficción" },
  { id: "10749", name: "Romance" },
  { id: "53", name: "Thriller" },
  { id: "16", name: "Animación" },
];

export const SORT_OPTIONS = [
  { id: "popularity.desc", name: "Tendencia (Trending)" },
  { id: "vote_average.desc", name: "Mejor puntuadas" },
  { id: "primary_release_date.desc", name: "Más recientes" },
];

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

export type ImageSize = "w185" | "w342" | "w500" | "original"

export function getImageUrl(path: string | null, size: ImageSize): string | null {
  if (!path) return null
  return `${IMAGE_BASE_URL}/${size}${path}`
}

export async function getPopularMovies(){
  const response = await tmdb.get('/movie/popular')
  return response.data.results
}

export async function searchMovies(query: string){
  const response = await tmdb.get('/search/movie',{
    params: { query },
  })
  return response.data.results
}

export async function getDiscoverMovies({
  page = 1,
  genreId,
  sortBy,
  }: DiscoverParams = {}){
  const response = await tmdb.get('/discover/movie', {
    params: {
      page,
      ...(genreId && { with_genres: genreId }),
      ...(sortBy && { sort_by: sortBy }),
    },
  });
  return response.data.results;
}

export async function getMovieDetails(id: string): Promise<MovieDetails>{
  const response = await tmdb.get(`/movie/${id}`)
  return response.data
}

export async function getMovieCredits(id: string): Promise<Credits>{
  const response = await tmdb.get(`/movie/${id}/credits`)
  return response.data
}

export async function getPersonDetails(id: string): Promise<PersonDetails> {
  const response = await tmdb.get(`/person/${id}`)
  return response.data
}

export async function getPersonMovieCredits(id: string): Promise<PersonMovieCredits> {
  const response = await tmdb.get(`/person/${id}/movie_credits`)
  return response.data
}

export async function getMovieVideos(id: string): Promise<MovieVideo[]>{
  const response = await tmdb.get(`/movie/${id}/videos`)
  return response.data.results
}
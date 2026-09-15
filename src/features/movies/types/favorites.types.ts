export interface FavoriteData{
  userId: string
  movieId: number
  movieTitle: string
  moviePoster: string | null
}

export interface FavoriteMovie{
  movieId: number
  movieTitle: string
  moviePoster: string | null
  rating: number | null
}
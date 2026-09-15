import { useState, useEffect } from 'react'
import type { Movie } from '../features/movies/types/movies.types'
import { getImageUrl } from "../features/movies/services/tmdbAPI"
import placeholderPoster from '/src/assets/img/placeholder-hero-movies.png'

interface HeroProps {
  movies: Movie[]
}

export default function Hero({ movies }: HeroProps) {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null)

  useEffect(() => {
    if (movies.length > 0) {
      const moviesWithBackdrop = movies.filter(m => m.poster_path)
      const random = moviesWithBackdrop[Math.floor(Math.random() * moviesWithBackdrop.length)]
      setRandomMovie(random || movies[0])
    }
  }, [movies])

  if (!randomMovie) return null

  const backdropUrl = getImageUrl(randomMovie.poster_path, "original")

  return (
    <section className="relative w-full h-[60vh] min-h-100 rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
      <img
        src={backdropUrl ?? placeholderPoster}
        alt={randomMovie.title}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-linear-to-t from-[#171B36] via-[#171B36]/50 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-[#171B36] via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-2xl z-10">
        <span className="inline-block px-3 py-1 bg-[#E50914] text-white text-xs font-bold uppercase tracking-wider rounded-full mb-3">
          Destacada
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-3 drop-shadow-md">
          {randomMovie.title}
        </h2>
        <p className="text-gray-300 text-sm md:text-base line-clamp-3 mb-6 font-light">
          {randomMovie.overview}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-amber-400 font-bold text-lg flex items-center gap-1">
            ⭐ {randomMovie.vote_average.toFixed(1)}
          </span>
          <span className="text-gray-400 text-sm">
            {randomMovie.release_date?.slice(0, 4)}
          </span>
        </div>
      </div>
    </section>
  )
}
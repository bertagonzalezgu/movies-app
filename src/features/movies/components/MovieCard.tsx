import type { Movie } from '../types/movies.types'
import placeholderPoster from '/src/assets/img/placeholder-poster-movies.png'
import { Link } from 'react-router-dom'
import { getImageUrl } from '../services/tmdbAPI'

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({movie}: MovieCardProps){
  const posterUrl = getImageUrl(movie.poster_path, "w342")

  return (
    <article className="group relative bg-[#000000]/40 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#E50914]/20 flex flex-col w-full h-full border border-white/5">
      <Link to={`/movie/${movie.id}`}>
        <div className="relative aspect-2/3 w-full bg-gray-900 overflow-hidden">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`Cartel de ${movie.title}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm bg-gray-800">
              <img src={placeholderPoster} alt="Placeholder poster" />
            </div>
          )}

          <div className="absolute top-2 right-2 bg-[#000000]/80 backdrop-blur-md text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
            <span>⭐</span>
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>

        <div className="p-4 flex flex-col justify-between grow">
          <h3 className="font-semibold text-white text-base leading-snug line-clamp-2 group-hover:text-[#E50914] transition-colors">
            {movie.title}
          </h3>
          <p className="text-xs text-gray-400 mt-2">
            {movie.release_date?.slice(0, 4) || 'N/A'}
          </p>
        </div>
      </Link>
      

    </article>
  )
}
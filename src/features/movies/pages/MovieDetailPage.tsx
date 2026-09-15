import { Link, useParams, useNavigate } from "react-router-dom"
import placeholderPoster from '/src/assets/img/placeholder-poster-movies.png'
import CastList from '../components/CastList'
import { useAuth } from "../../auth/context/useAuth"
import heartFilled from '/src/assets/icons/heart-filled.svg'
import heartOutlined from '/src/assets/icons/heart-outlined.svg'
import RatingStars from "../../favorites/components/RatingStars"
import { useMovieDetail } from "../hooks/useMovieDetail"
import { useFavorite } from "../hooks/useFavorite"
import { getImageUrl } from "../services/tmdbAPI"

export default function MovieDetailPage(){
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const { movieDetails, movieCredits, loading, error, notFound, trailer } = useMovieDetail(id)
  const { isFav, rating, actionLoading, actionError, handleToggleFavorite, handleRate } = useFavorite(user, movieDetails)

  if(loading){
    return (
      <div className="min-h-screen bg-[#171B36] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm font-medium">Cargando detalles...</p>
        </div>
      </div>
    )
  }

  if(error || notFound){
    return (
      <main className="min-h-screen bg-[#171B36] flex flex-col items-center justify-center text-white p-4">
        <div role="alert" className="p-4 bg-[#B20710]/20 border border-[#B20710] text-red-200 rounded-lg text-center max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-2 text-white">
            {notFound ? "Película no encontrada" : "¡Vaya! Ha ocurrido un error"}
          </h2>
          <p>{error || "La película que buscas no existe o ha sido movida."}</p>
        </div>
        <Link to="/explore" className="mt-6 inline-block px-5 py-2.5 bg-[#000000]/40 hover:bg-[#000000]/60 text-white font-medium rounded-xl transition-colors border border-white/5 cursor-pointer">
          Volver al catálogo
        </Link>
      </main>
    )
  }

  if(!movieDetails || !movieCredits){
    return null
  }

  const director = movieCredits.crew.find((person) => person.job === "Director")

  const posterUrl = getImageUrl(movieDetails.poster_path, "w500") ?? placeholderPoster

  return (
    <main className="min-h-screen bg-[#171B36] text-white px-4 py-8 md:py-10 md:pr-12 md:pl-32 transition-all pb-16">
      <div className="max-w-6xl mx-auto">

        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors group">
          <span className="transition-transform group-hover:-translate-x-1">←</span> Volver atrás
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12 items-start">

          <div className="flex flex-col items-center md:items-start gap-3 w-64 md:w-full">

            <div className="relative rounded-xl overflow-hidden border border-white/5 w-full">
              <img
                src={posterUrl}
                alt={`Póster de ${movieDetails.title}`}
                className="w-full h-auto object-cover"
              />
            </div>

            {user && (
              <button
                onClick={handleToggleFavorite}
                disabled={actionLoading}
                aria-pressed={isFav}
                aria-busy={actionLoading}
                className={`group relative w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-95 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#E50914]/40 overflow-hidden backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed ${
                  isFav
                    ? "bg-[#E50914]/15 hover:bg-[#E50914]/25 border border-[#E50914]/40 text-white hover:shadow-lg hover:shadow-[#E50914]/20"
                    : "bg-[#000000]/40 hover:bg-[#000000]/60 border border-white/10 text-gray-300 hover:text-white hover:border-white/20"
                }`}
              >
                <img
                  src={isFav ? heartFilled : heartOutlined}
                  alt=""
                  className="w-5 h-5 object-contain transition-transform duration-300 group-hover:scale-110 group-active:scale-125"
                />
                <span className="tracking-wide">
                  {actionLoading ? "Guardando..." : isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
                </span>
              </button>
            )}

            {actionError && (
              <p role="alert" className="text-xs text-red-300 text-center">{actionError}</p>
            )}

            {user && isFav && (
              <RatingStars rating={rating} onRate={handleRate} disabled={actionLoading} />
            )}

          </div>

          <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-6">

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">
                {movieDetails.title}
              </h1>
              {director && (
                <p className="text-base text-gray-400">
                  Dirigida por{" "}
                  <Link to={`/director/${director.id}`} className="text-gray-200 font-semibold hover:text-[#E50914] transition-colors">
                    {director.name}
                  </Link>
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
              <div className="flex items-center gap-1.5 bg-[#000000]/80 backdrop-blur-md text-amber-400 px-2.5 py-1 rounded-full border border-white/10">
                <span>⭐</span>
                <span>{movieDetails.vote_average.toFixed(1)}</span>
              </div>

              {movieDetails.release_date && (
                <span className="bg-[#000000]/40 text-gray-300 px-3 py-1.5 rounded-full border border-white/5">
                  {new Date(movieDetails.release_date).getFullYear()}
                </span>
              )}

              {movieDetails.runtime > 0 && (
                <span className="bg-[#000000]/40 text-gray-300 px-3 py-1.5 rounded-full border border-white/5">
                  {movieDetails.runtime} min
                </span>
              )}
            </div>

            {movieDetails.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movieDetails.genres.map((g) => (
                  <span key={g.id} className="text-xs font-semibold uppercase tracking-wider bg-[#000000]/40 text-gray-300 px-3 py-1 rounded-md border border-white/5">
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <div className="bg-[#000000]/40 p-6 rounded-xl border border-white/5 space-y-3">
              <h2 className="text-lg font-bold text-white">Sinopsis</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                {movieDetails.overview || "No hay sinopsis disponible para esta película."}
              </p>
            </div>

            {trailer && (
              <div className="bg-[#000000]/40 p-6 rounded-xl border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">Tráiler</h2>
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-400 hover:text-[#E50914] transition-colors"
                  >
                    Ver en YouTube ↗
                  </a>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={`Tráiler de ${movieDetails.title}`}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            <CastList cast={movieCredits.cast} />

          </div>

        </div>
      </div>
    </main>
  )
}
import { Link, useParams, useNavigate } from "react-router-dom"
import placeholderPoster from '/src/assets/img/placeholder-poster-movies.png'
import { usePersonDetail } from "../hooks/usePersonDetail"
import { getImageUrl } from "../services/tmdbAPI"

export default function DirectorDetailPage(){
  const { id } = useParams()
  const navigate = useNavigate()

  const { person, movies, loading, error, notFound } = usePersonDetail(id, "director")

  if(loading){
    return (
      <div className="min-h-screen bg-[#171B36] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-300 text-sm font-medium">Cargando perfil...</p>
        </div>
      </div>
    )
  }

  if(error || notFound){
    return (
      <main className="min-h-screen bg-[#171B36] flex flex-col items-center justify-center text-white p-4">
        <div role="alert" className="p-4 bg-[#B20710]/20 border border-[#B20710] text-red-200 rounded-lg text-center max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-2 text-white">
            {notFound ? "Director no encontrado" : "¡Vaya! Ha ocurrido un error"}
          </h2>
          <p>{error || "El perfil que buscas no existe."}</p>
        </div>
        <Link to="/explore" className="mt-6 inline-block px-5 py-2.5 bg-[#000000]/40 hover:bg-[#000000]/60 text-white font-medium rounded-xl transition-colors border border-white/5">
          Volver al catálogo
        </Link>
      </main>
    )
  }

  if(!person){
    return null
  }

  const photoUrl = getImageUrl(person.profile_path, "w342") ?? placeholderPoster

  return (
    <main className="min-h-screen bg-[#171B36] text-white pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 md:pt-12 md:pl-32">

        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white mb-8 transition-colors group cursor-pointer">
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          Volver atrás
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12 items-start mb-12">

          <div className="flex justify-center md:block">
            <div className="relative rounded-xl overflow-hidden border border-white/5 w-64 md:w-full aspect-2/3">
              <img src={photoUrl} alt={person.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                  {person.name}
                </h1>
                <span className="text-xs font-semibold uppercase tracking-wider bg-[#E50914]/10 text-red-300 px-3 py-1 rounded-md border border-[#E50914]/30">
                  Director
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm font-medium mt-4">
                {person.birthday && (
                  <span className="bg-[#000000]/40 text-gray-300 px-3.5 py-1.5 rounded-full border border-white/5">
                    🎂 {person.birthday}
                  </span>
                )}
                {person.place_of_birth && (
                  <span className="bg-[#000000]/40 text-gray-300 px-3.5 py-1.5 rounded-full border border-white/5">
                    📍 {person.place_of_birth}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-[#000000]/40 p-6 rounded-xl border border-white/5 space-y-3">
              <h2 className="text-lg font-bold text-white">Biografía</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base whitespace-pre-line max-h-96 overflow-y-auto pr-2 scrollbar-thin">
                {person.biography || "No hay biografía disponible para este perfil."}
              </p>
            </div>
          </div>

        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-3">
            Filmografía como director ({movies.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`} className="bg-[#000000]/40 hover:bg-[#000000]/60 p-4 rounded-xl border border-white/5 hover:border-[#E50914]/40 transition-all group flex flex-col justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-white group-hover:text-[#E50914] transition-colors line-clamp-1">
                    {movie.title}
                  </h3>
                </div>

                {movie.release_date && (
                  <span className="text-xs text-gray-300 self-end font-mono">
                    {movie.release_date.slice(0, 4)}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
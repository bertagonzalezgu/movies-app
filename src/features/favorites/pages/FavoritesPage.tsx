import { useState, useEffect } from "react"
import { useAuth } from "../../auth/context/useAuth"
import { getUserFavorites, removeFavorite } from "../services/favoritesService"
import type { FavoriteMovie } from "../../movies/types/favorites.types"
import { Link } from "react-router-dom"
import placeholderPoster from '/src/assets/img/placeholder-poster-movies.png'
import { getImageUrl } from "../../movies/services/tmdbAPI"

export default function FavoritesPage(){
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([])
  const [loading, setLoading] = useState(true)

  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
  async function loadFavorites(){
    if (!user) {
      setLoading(false)
      return
    }

    const data = await getUserFavorites(user.uid)
    setFavorites(data as FavoriteMovie[])
    setLoading(false)
  }

  loadFavorites()}, [user])

  async function handleRemove(movieId: number){
    if (!user) return
    await removeFavorite(user.uid, movieId)
    setFavorites((prev) => prev.filter((fav) => fav.movieId !== movieId))
  }

  function handleRemoveClick(movieId: number){
    setDeleteId(movieId)
  }

  function handleCancelRemove(){
    setDeleteId(null)
  }

  async function handleConfirmRemove(movieId: number){
    await handleRemove(movieId)
    setDeleteId(null)
  }

  if(loading){
    return (
      <main className="min-h-screen bg-[#171B36] flex items-center justify-center">
        <p className="text-lg font-medium animate-pulse text-gray-300">
          Cargando favoritos...
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#171B36] text-white px-4 py-18 md:py-10 md:pr-12 md:pl-32 transition-all">
      <header className="mb-6 border-b border-white/10 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Mis <span className="text-[#E50914]">Favoritos</span>
        </h1>
      </header>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh] text-center">
          <p className="text-gray-400 text-lg">
            Todavía no tienes películas favoritas
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {favorites.map((fav) => {
            const posterUrl = getImageUrl(fav.moviePoster, "w500") ?? placeholderPoster

            return (
              <article
                key={fav.movieId}
                className="group relative bg-[#000000]/40 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#E50914]/20 flex flex-col w-full h-full border border-white/5"
              >
                <Link to={`/movie/${fav.movieId}`}>
                  <div className="relative aspect-2/3 w-full bg-gray-900 overflow-hidden">
                    <img
                      src={posterUrl}
                      alt={`Cartel de ${fav.movieTitle}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {fav.rating && (
                      <div className="absolute top-2 right-2 bg-[#000000]/80 backdrop-blur-md text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
                        <span aria-hidden="true">⭐</span>
                        <span>{fav.rating}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col justify-between grow">
                    <h3 className="font-semibold text-white text-base leading-snug line-clamp-2 group-hover:text-[#E50914] transition-colors">
                      {fav.movieTitle}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2">
                      {fav.rating ? `Puntuación: ${fav.rating}/10` : "Sin puntuar"}
                    </p>
                  </div>
                </Link>

                {deleteId === fav.movieId ? (
                    <div className="mx-4 mb-4 flex flex-col gap-2">
                      <span className="text-xs text-gray-300 text-center">¿Quitar de favoritos?</span>
                      <div className="flex gap-2">
                        <button onClick={() => handleConfirmRemove(fav.movieId)} className="flex-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#E50914] hover:bg-[#B20710] rounded-lg transition-colors">
                          Sí, quitar
                        </button>
                        <button onClick={handleCancelRemove} className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white bg-[#000000]/40 hover:bg-[#000000]/60 border border-white/10 rounded-lg transition-colors">
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => handleRemoveClick(fav.movieId)} className="mx-4 mb-4 px-3 py-1.5 text-xs font-medium text-red-300 hover:text-white hover:bg-[#B20710]/30 border border-[#B20710]/40 rounded-lg transition-colors">
                      Quitar de favoritos
                    </button>
                )}

              </article>
            )
          })}
        </div>
      )}
    </main>
  )
}
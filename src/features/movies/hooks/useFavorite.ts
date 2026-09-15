import { useState, useEffect } from "react"
import type { User } from "firebase/auth"
import { addFavorite, removeFavorite, getFavoriteData, rateMovie } from "../../favorites/services/favoritesService"

interface MovieInfo{
  id: number
  title: string
  poster_path: string | null
}

export function useFavorite(user: User | null, movie: MovieInfo | null){
  const [isFav, setIsFav] = useState(false)
  const [rating, setRating] = useState<number | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  useEffect(() => {
    async function loadFavoriteStatus(){
      if (!user || !movie) return

      const favData = await getFavoriteData(user.uid, movie.id)
      setIsFav(favData !== null)
      setRating(favData?.rating ?? null)
    }

    loadFavoriteStatus()
  }, [user, movie])

  async function handleToggleFavorite(){
    if(!user || !movie) return

    setActionLoading(true)
    setActionError(null)

    try {
      if(isFav){
        await removeFavorite(user.uid, movie.id)
        setIsFav(false)
      } else{
        await addFavorite({
          favData: {
            userId: user.uid,
            movieId: movie.id,
            movieTitle: movie.title,
            moviePoster: movie.poster_path,
          },
        })
        setIsFav(true)
      }
    } catch {
      setActionError("No se ha podido actualizar tus favoritos. Inténtalo de nuevo.")
    } finally {
      setActionLoading(false)
    }
  }

  async function handleRate(newRating: number){
    if(!user || !movie) return

    setActionLoading(true)
    setActionError(null)

    try {
      await rateMovie(user.uid, movie.id, newRating)
      setRating(newRating)
    } catch {
      setActionError("No se ha podido guardar tu puntuación. Inténtalo de nuevo.")
    } finally {
      setActionLoading(false)
    }
  }

  return { isFav, rating, actionLoading, actionError, handleToggleFavorite, handleRate }
}
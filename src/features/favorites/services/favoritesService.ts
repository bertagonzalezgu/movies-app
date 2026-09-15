import type { FavoriteData } from "../../movies/types/favorites.types";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore"
import { db } from "../../auth/services/firebaseConfig"
import { collection, query, where, getDocs } from "firebase/firestore"

interface FavoriteDataProps{
  favData: FavoriteData
}

function getFavoriteId(userId: string, movieId: number){
  return `${userId}_${movieId}`
}

export async function addFavorite({ favData }: FavoriteDataProps){
  const favoriteRef = doc(db, "favorites", getFavoriteId(favData.userId, favData.movieId))

  await setDoc(favoriteRef, {
    ...favData,
    rating: null,
  })
}

export async function removeFavorite(userId: string, movieId: number){
  const favoriteRef = doc(db, "favorites", getFavoriteId(userId, movieId))
  await deleteDoc(favoriteRef)
}

export async function isFavorite(userId: string, movieId: number): Promise<boolean>{
  const favoriteRef = doc(db, "favorites", getFavoriteId(userId, movieId))
  const actualFav = await getDoc(favoriteRef)
  return actualFav.exists()
}

export async function rateMovie(userId: string, movieId: number, rating: number){
  const favoriteRef = doc(db, "favorites", getFavoriteId(userId, movieId))
  await setDoc(favoriteRef, { rating }, { merge: true })
}

export async function getFavoriteData(userId: string, movieId: number) {
  const favoriteRef = doc(db, "favorites", getFavoriteId(userId, movieId))
  const snapshot = await getDoc(favoriteRef)

  if (!snapshot.exists()) {
    return null
  }

  return snapshot.data() as { rating: number | null }
}

export async function getUserFavorites(userId: string) {
  const favoritesRef = collection(db, "favorites")
  const favoritesQuery = query(favoritesRef, where("userId", "==", userId))
  const snapshot = await getDocs(favoritesQuery)

  return snapshot.docs.map((doc) => doc.data())
}
export const FAVORITES_KEY = 'movie_favorites'

export interface FavoriteMovie {
  id: number
  title: string
  poster_path: string | null
  release_date: string
  vote_average: number
}

export const getFavorites = (): FavoriteMovie[] => {
  if (typeof window === 'undefined') return []
  const favorites = localStorage.getItem(FAVORITES_KEY)
  return favorites ? JSON.parse(favorites) : []
}

export const addToFavorites = (movie: FavoriteMovie): void => {
  const favorites = getFavorites()
  if (!favorites.find(fav => fav.id === movie.id)) {
    favorites.push(movie)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }
}

export const removeFromFavorites = (movieId: number): void => {
  const favorites = getFavorites()
  const updated = favorites.filter(fav => fav.id !== movieId)
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
}

export const isFavorite = (movieId: number): boolean => {
  const favorites = getFavorites()
  return favorites.some(fav => fav.id === movieId)
}

export const getSessionData = (key: string): any => {
  if (typeof window === 'undefined') return null
  const data = sessionStorage.getItem(key)
  return data ? JSON.parse(data) : null
}

export const setSessionData = (key: string, data: any): void => {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(key, JSON.stringify(data))
}

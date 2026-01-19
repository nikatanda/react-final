import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFavorites } from '../../utils/storage'
import { getMovieDetails, Movie } from '../../services/api'
import MovieCard from '../../components/MovieCard/MovieCard'
import { useLanguage } from '../../contexts/LanguageContext'
import './Favorites.scss'

const Favorites = () => {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFavorites = async () => {
      const favorites = getFavorites()
      
      if (favorites.length === 0) {
        setLoading(false)
        return
      }

      try {
        const moviePromises = favorites.map(fav => getMovieDetails(fav.id))
        const movies = await Promise.all(moviePromises)
        setFavoriteMovies(movies)
      } catch (error) {
        console.error('Error loading favorites:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFavorites()

    // Listen for storage changes
    const handleStorageChange = () => {
      loadFavorites()
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Also check periodically for changes (for same-tab updates)
    const interval = setInterval(loadFavorites, 1000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  if (loading) {
    return (
      <div className="favorites-page">
        <h1 className="page-title">{t('favorites.title')}</h1>
        <div className="loading-container">Loading...</div>
      </div>
    )
  }

  return (
    <div className="favorites-page">
      <h1 className="page-title">{t('favorites.title')}</h1>
      
      {favoriteMovies.length === 0 ? (
        <div className="empty-favorites">
          <div className="empty-icon">🎬</div>
          <p className="empty-message">{t('favorites.empty')}</p>
          <button className="browse-button" onClick={() => navigate('/')}>
            Browse Movies
          </button>
        </div>
      ) : (
        <div className="favorites-grid">
          {favoriteMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites

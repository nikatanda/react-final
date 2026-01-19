import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovieDetails, MovieDetails as MovieDetailsType, getImageUrl } from '../../services/api'
import { isFavorite, addToFavorites, removeFromFavorites } from '../../utils/storage'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import Modal from '../../components/Modal/Modal'
import { useLanguage } from '../../contexts/LanguageContext'
import './MovieDetails.scss'

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [movie, setMovie] = useState<MovieDetailsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFav, setIsFav] = useState(false)
  const [trailerModalOpen, setTrailerModalOpen] = useState(false)

  useEffect(() => {
    if (!id) {
      navigate('/')
      return
    }

    const loadMovie = async () => {
      try {
        setLoading(true)
        const data = await getMovieDetails(parseInt(id))
        setMovie(data)
        setIsFav(isFavorite(data.id))
      } catch (err) {
        setError(t('common.error'))
        console.error('Error loading movie:', err)
      } finally {
        setLoading(false)
      }
    }

    loadMovie()
  }, [id, navigate, t])

  const handleFavoriteToggle = () => {
    if (!movie) return

    if (isFav) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
      })
    }
    setIsFav(!isFav)
  }

  if (loading) {
    return (
      <div className="movie-details-page">
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="movie-details-page">
        <div className="error-message">{error || t('common.error')}</div>
      </div>
    )
  }

  const cast = movie.credits?.cast.slice(0, 10) || []

  return (
    <div className="movie-details-page">
      <div
        className="movie-details-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${getImageUrl(movie.backdrop_path, 'original')})`,
        }}
      >
        <div className="movie-details-container">
          <div className="movie-details-poster">
            <img
              src={getImageUrl(movie.poster_path, 'w500')}
              alt={movie.title}
            />
          </div>
          <div className="movie-details-info">
            <h1 className="movie-details-title">{movie.title}</h1>
            {movie.tagline && <p className="movie-details-tagline">{movie.tagline}</p>}
            
            <div className="movie-details-meta">
              <div className="meta-item">
                <span className="meta-label">{t('movie.rating')}:</span>
                <span className="meta-value">⭐ {movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">{t('movie.releaseDate')}:</span>
                <span className="meta-value">{new Date(movie.release_date).toLocaleDateString()}</span>
              </div>
              {movie.runtime && (
                <div className="meta-item">
                  <span className="meta-label">{t('movie.runtime')}:</span>
                  <span className="meta-value">{movie.runtime} {t('movie.minutes')}</span>
                </div>
              )}
            </div>

            <div className="movie-details-genres">
              <span className="genres-label">{t('movie.genres')}:</span>
              <div className="genres-list">
                {movie.genres.map(genre => (
                  <span key={genre.id} className="genre-tag">{genre.name}</span>
                ))}
              </div>
            </div>

            <div className="movie-details-actions">
              <button
                className={`favorite-button-large ${isFav ? 'active' : ''}`}
                onClick={handleFavoriteToggle}
              >
                {isFav ? '❤️' : '🤍'} {isFav ? t('movie.removeFromFavorites') : t('movie.addToFavorites')}
              </button>
              <button
                className="trailer-button"
                onClick={() => setTrailerModalOpen(true)}
              >
                🎬 {t('movie.watchTrailer')}
              </button>
            </div>

            <div className="movie-details-overview">
              <h2>{t('movie.overview')}</h2>
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>

      {cast.length > 0 && (
        <section className="cast-section">
          <h2 className="section-title">{t('movie.cast')}</h2>
          <div className="cast-grid">
            {cast.map(actor => (
              <div key={actor.id} className="cast-card">
                <img
                  src={getImageUrl(actor.profile_path, 'w300')}
                  alt={actor.name}
                  className="cast-image"
                />
                <div className="cast-info">
                  <h3 className="cast-name">{actor.name}</h3>
                  <p className="cast-character">{actor.character}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Modal
        isOpen={trailerModalOpen}
        onClose={() => setTrailerModalOpen(false)}
        title={movie.title}
      >
        <div className="trailer-placeholder">
          <p>Trailer functionality would be integrated with YouTube API or similar service.</p>
          <p>For now, you can search for "{movie.title} trailer" on YouTube.</p>
        </div>
      </Modal>
    </div>
  )
}

export default MovieDetails

import { useNavigate } from 'react-router-dom'
import { Movie, getImageUrl } from '../../services/api'
import { isFavorite, addToFavorites, removeFromFavorites } from '../../utils/storage'
import { useState } from 'react'
import './MovieCard.scss'

interface MovieCardProps {
  movie: Movie
  showFavoriteButton?: boolean
}

const MovieCard = ({ movie, showFavoriteButton = true }: MovieCardProps) => {
  const navigate = useNavigate()
  const [isFav, setIsFav] = useState(isFavorite(movie.id))

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
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

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`)
  }

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <div className="movie-card-image-wrapper">
        <img
          src={getImageUrl(movie.poster_path, 'w500')}
          alt={movie.title}
          className="movie-card-image"
          loading="lazy"
        />
        <div className="movie-card-overlay">
          <div className="movie-card-rating">
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
          {showFavoriteButton && (
            <button
              className={`favorite-button ${isFav ? 'active' : ''}`}
              onClick={handleFavoriteClick}
              aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFav ? '❤️' : '🤍'}
            </button>
          )}
        </div>
      </div>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <p className="movie-card-date">{new Date(movie.release_date).getFullYear()}</p>
      </div>
    </div>
  )
}

export default MovieCard

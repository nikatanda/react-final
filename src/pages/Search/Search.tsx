import { useState, useEffect, useRef } from 'react'
import { Movie, searchMovies } from '../../services/api'
import MovieCard from '../../components/MovieCard/MovieCard'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { useLanguage } from '../../contexts/LanguageContext'
import './Search.scss'

const Search = () => {
  const { t } = useLanguage()
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  // ✅ Use ReturnType<typeof setTimeout> instead of NodeJS.Timeout
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  const performSearch = async (searchQuery: string, pageNum: number = 1) => {
    if (!searchQuery.trim()) {
      setMovies([])
      setHasSearched(false)
      return
    }

    setLoading(true)
    setHasSearched(true)

    try {
      const data = await searchMovies(searchQuery, pageNum)
      if (pageNum === 1) {
        setMovies(data.results)
      } else {
        setMovies(prev => [...prev, ...data.results])
      }
      setPage(pageNum)
      setTotalPages(data.total_pages)
    } catch (error) {
      console.error('Error searching movies:', error)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setPage(1)

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      performSearch(value, 1)
    }, 500)
  }

  const handleLoadMore = () => {
    if (page < totalPages && !loading) {
      performSearch(query, page + 1)
    }
  }

  return (
    <div className="search-page">
      <h1 className="page-title">{t('search.title')}</h1>
      
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder={t('search.placeholder')}
          value={query}
          onChange={handleInputChange}
        />
      </div>

      {loading && movies.length === 0 ? (
        <LoadingSpinner />
      ) : hasSearched && movies.length === 0 ? (
        <div className="no-results">
          <p>{t('search.noResults')}</p>
        </div>
      ) : movies.length > 0 ? (
        <>
          <h2 className="results-title">{t('search.results')}</h2>
          <div className="search-results-grid">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          {page < totalPages && (
            <button
              className="load-more-button"
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? t('common.loading') : t('home.loadMore')}
            </button>
          )}
        </>
      ) : null}
    </div>
  )
}

export default Search

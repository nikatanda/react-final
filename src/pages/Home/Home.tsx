import { useState, useEffect } from 'react'
import { Movie, getPopularMovies, getTopRatedMovies, getNowPlayingMovies, getUpcomingMovies } from '../../services/api'
import MovieCard from '../../components/MovieCard/MovieCard'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { useLanguage } from '../../contexts/LanguageContext'
import './Home.scss'

type Section = 'popular' | 'topRated' | 'nowPlaying' | 'upcoming'

const Home = () => {
  const { t } = useLanguage()
  const [sections, setSections] = useState<Record<Section, { movies: Movie[], loading: boolean, page: number, totalPages: number }>>({
    popular: { movies: [], loading: true, page: 1, totalPages: 1 },
    topRated: { movies: [], loading: true, page: 1, totalPages: 1 },
    nowPlaying: { movies: [], loading: true, page: 1, totalPages: 1 },
    upcoming: { movies: [], loading: true, page: 1, totalPages: 1 },
  })

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [popular, topRated, nowPlaying, upcoming] = await Promise.all([
          getPopularMovies(1),
          getTopRatedMovies(1),
          getNowPlayingMovies(1),
          getUpcomingMovies(1),
        ])

        setSections({
          popular: { movies: popular.results, loading: false, page: 1, totalPages: popular.total_pages },
          topRated: { movies: topRated.results, loading: false, page: 1, totalPages: topRated.total_pages },
          nowPlaying: { movies: nowPlaying.results, loading: false, page: 1, totalPages: nowPlaying.total_pages },
          upcoming: { movies: upcoming.results, loading: false, page: 1, totalPages: upcoming.total_pages },
        })
      } catch (error) {
        console.error('Error loading movies:', error)
      }
    }

    loadMovies()
  }, [])

  const loadMore = async (section: Section) => {
    const currentSection = sections[section]
    if (currentSection.page >= currentSection.totalPages) return

    const nextPage = currentSection.page + 1
    setSections(prev => ({
      ...prev,
      [section]: { ...prev[section], loading: true },
    }))

    try {
      let data
      switch (section) {
        case 'popular':
          data = await getPopularMovies(nextPage)
          break
        case 'topRated':
          data = await getTopRatedMovies(nextPage)
          break
        case 'nowPlaying':
          data = await getNowPlayingMovies(nextPage)
          break
        case 'upcoming':
          data = await getUpcomingMovies(nextPage)
          break
      }

      setSections(prev => ({
        ...prev,
        [section]: {
          movies: [...prev[section].movies, ...data.results],
          loading: false,
          page: nextPage,
          totalPages: data.total_pages,
        },
      }))
    } catch (error) {
      console.error(`Error loading more ${section}:`, error)
      setSections(prev => ({
        ...prev,
        [section]: { ...prev[section], loading: false },
      }))
    }
  }

  const renderSection = (section: Section, titleKey: string) => {
    const sectionData = sections[section]
    
    return (
      <section className="movies-section" key={section}>
        <h2 className="section-title">{t(titleKey)}</h2>
        {sectionData.loading && sectionData.movies.length === 0 ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="movies-grid">
              {sectionData.movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            {sectionData.page < sectionData.totalPages && (
              <button
                className="load-more-button"
                onClick={() => loadMore(section)}
                disabled={sectionData.loading}
              >
                {sectionData.loading ? t('common.loading') : t('home.loadMore')}
              </button>
            )}
          </>
        )}
      </section>
    )
  }

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1 className="hero-title">{t('home.title')}</h1>
        <p className="hero-subtitle">Explore thousands of movies and discover your next favorite film</p>
      </div>

      {renderSection('popular', 'home.popular')}
      {renderSection('topRated', 'home.topRated')}
      {renderSection('nowPlaying', 'home.nowPlaying')}
      {renderSection('upcoming', 'home.upcoming')}
    </div>
  )
}

export default Home

import { isEmpty } from 'lodash'
import MovieListItem from './MovieListItem'
import useMovieList from './useMovieList'

const MovieList = ({ title }) => {
  const { movies } = useMovieList()

  if (isEmpty(movies)) {
    return null
  }

  return (
    <main className='px-4 pb-24 md:px-12 mt-4 space-y-8'>
      <h2 className='text-4xl text-white font-bold'>{title}</h2>

      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 cursor-pointer'>
        {movies.map(({ id, thumbnailUrl, title, duration, genre }) => (
          <MovieListItem
            key={id}
            id={id}
            thumbnailUrl={thumbnailUrl}
            title={title}
            duration={duration}
            genre={genre}
          />
        ))}
      </section>
    </main>
  )
}

export default MovieList

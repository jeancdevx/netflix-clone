import useFavorites from '@/components/Favorite/useFavorites.hook'
import { isEmpty } from 'lodash'
import FavoriteMovieListItem from './FavoriteMovieListItem'

const FavoriteMovieList = ({ title }) => {
  const { favorites } = useFavorites()

  if (isEmpty(favorites)) {
    return null
  }

  return (
    <main className='px-4 py-24 md:px-12 space-y-8'>
      <h2 className='text-4xl text-white font-bold'>{title}</h2>

      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 cursor-pointer'>
        {favorites.length > 0 &&
          favorites.map(({ id, thumbnailUrl, title, duration, genre }) => (
            <FavoriteMovieListItem
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

export default FavoriteMovieList

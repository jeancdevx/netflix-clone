import fetcher from '@/libs/fetcher'
import useSWR from 'swr'

const useFavorites = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/favorites', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })

  return {
    favorites: data?.favoriteMovies,
    isLoading,
    isError: error,
    mutate
  }
}

export default useFavorites

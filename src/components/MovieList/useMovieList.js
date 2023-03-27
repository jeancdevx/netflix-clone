import fetcher from '@/libs/fetcher'
import useSWR from 'swr'

const useMovieList = () => {
  const { data, error, isLoading } = useSWR('/api/movies', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false
  })

  return {
    movies: data,
    isLoading,
    isError: error
  }
}

export default useMovieList

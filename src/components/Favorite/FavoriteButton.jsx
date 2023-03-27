import useFavorites from '@/components/Favorite/useFavorites.hook'
import useCurrentUser from '@/hooks/useCurrentUser.hook'
import axios from 'axios'
import { useCallback, useMemo } from 'react'
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai'

const FavoriteButton = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites()
  const { data: currentUser, mutate } = useCurrentUser()

  const isFavorite = useMemo(() => {
    return currentUser?.favoriteIds?.includes(movieId)
  }, [currentUser, movieId])

  const toggleFavorite = useCallback(async () => {
    let response

    if (isFavorite) {
      response = axios.delete('/api/favorite', {
        data: { movieId }
      })
    } else {
      response = axios.post('/api/favorite', { movieId })
    }

    const updatedFavorites = await response.then(({ data }) => data)

    mutate({
      ...currentUser,
      favoriteIds: updatedFavorites
    })

    mutateFavorites()
  }, [currentUser, isFavorite, movieId, mutate, mutateFavorites])

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus

  return (
    <button
      className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition duration-200 hover:border-neutral-300'
      onClick={toggleFavorite}
    >
      <Icon
        className='text-white'
        size={30}
      />
    </button>
  )
}

export default FavoriteButton

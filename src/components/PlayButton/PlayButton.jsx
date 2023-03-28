import { useRouter } from 'next/router'
import { BsFillPlayFill } from 'react-icons/bs'

const PlayButton = ({ movieId }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/watch/${movieId}`)
  }

  return (
    <button
      className='bg-white rounded-md py-1 md:py-2 px-2 md:px-4 font-bold flex items-center hover:bg-opacity-70 transition-all duration-200 ease-in-out cursor-pointer'
      onClick={handleClick}
    >
      <BsFillPlayFill className='h-5 mr-1' />
      <span className='cursor-pointer'>Play</span>
    </button>
  )
}

export default PlayButton

import Loader from '@/components/Loader'
import Movie from '@/components/Movie/Movie'
import useMovie from '@/components/PlayButton/useMovie'
import useMouseMove from '@/hooks/useMouseMove.hook'
import { useRouter } from 'next/router'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const Watch = () => {
  const router = useRouter()
  const { movieId } = router.query

  const { isActive, handleMouseMove } = useMouseMove()

  const { data: movie, isLoading } = useMovie({ id: movieId })

  return (
    <main className='h-screen w-screen bg-black'>
      <nav
        className={`fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70 backdrop-filter backdrop-blur-sm transition-all duration-500 ${
          isActive ? 'top-0' : '-top-20'
        }`}
      >
        <AiOutlineArrowLeft
          className='text-white text-2xl font-bold cursor-pointer'
          onClick={() => router.push('/')}
        />

        <p className='flex gap-2 text-white text-1xl md:text-3xl font-bold'>
          <span className='font-light'>Watching:</span>
          <span className=''>{movie?.title}</span>
        </p>
      </nav>

      {isLoading ? (
        <Loader />
      ) : (
        <Movie
          videoUrl={movie?.videoUrl}
          handleMouseMove={handleMouseMove}
        />
      )}
    </main>
  )
}

export default Watch

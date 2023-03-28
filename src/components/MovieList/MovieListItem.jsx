import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { BsFillPlayFill } from 'react-icons/bs'
import FavoriteButton from '../Favorite/FavoriteButton'
import useInfoModal from '../Modal/useInfoModal.hook'

const MovieListItem = ({ id, thumbnailUrl, title, duration, genre }) => {
  const router = useRouter()
  const { openModal } = useInfoModal()

  const redirectToWatch = useCallback(() => {
    router.push(`/watch/${id}`)
  }, [id, router])

  return (
    <article className='group bg-zinc-900 col-span relative md:h-[12vw] h-[50vw]'>
      <img
        onClick={redirectToWatch}
        src={thumbnailUrl}
        alt='Movie'
        draggable={false}
        className='cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-100 w-full h-full
      '
      />

      <aside
        className='opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-100 w-full scale-0 group-hover:scale-95 group-hover:-translate-y-[6vw] group-hover:translate-x-[1vw] group-hover:opacity-100
      '
      >
        <img
          onClick={redirectToWatch}
          src={thumbnailUrl}
          alt='Movie'
          draggable={false}
          className='cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]
        '
        />

        <section className='z-10 bg-neutral-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md'>
          <article className='flex flex-row items-center gap-3'>
            <button
              className='cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition duration-200 hover:bg-neutral-300'
              onClick={redirectToWatch}
            >
              <BsFillPlayFill
                className='text-black'
                size={30}
              />
            </button>

            <FavoriteButton movieId={id} />

            <button
              className='cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 bg-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'
              onClick={() => openModal(id)}
            >
              <AiOutlineInfoCircle
                className='text-black'
                size={30}
              />
            </button>
          </article>

          <p className='text-green-400 font-bold text-lg lg:text-2xl mt-2'>
            New <span className='text-white'>2023</span>
          </p>

          <article className='flex flex-row items-center gap-2 mt-2'>
            <p className='text-white text-sm lg:text-base'>{duration}</p>
            <p className='text-white text-sm lg:text-base'>{genre}</p>
          </article>
        </section>
      </aside>
    </article>
  )
}

export default MovieListItem

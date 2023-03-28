import { useCallback, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import FavoriteButton from '../Favorite/FavoriteButton'
import Loader from '../Loader'
import PlayButton from '../PlayButton'
import useMovie from '../PlayButton/useMovie'
import useInfoModal from './useInfoModal.hook'

const InfoModal = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible)

  const { movieId } = useInfoModal()
  const { data, isLoading } = useMovie({ id: movieId })

  useEffect(() => {
    setIsVisible(!!visible)
  }, [visible])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [onClose])

  if (!isVisible) {
    return null
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <aside className='z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 h-full w-full'>
          <section className='relative w-auto mx-4 max-w-3xl rounded-md overflow-hidden'>
            <article
              className={`${
                isVisible ? 'scale-100' : 'scale-0'
              } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
            >
              <header className='relative h-64 md:h-96'>
                <video
                  className='w-full brightness-[60%] object-cover h-full'
                  autoPlay
                  loop
                  muted
                  src={data?.video}
                  poster={data?.thumbnailUrl}
                />

                <button
                  className='cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center'
                  onClick={handleClose}
                >
                  <AiOutlineClose
                    className='text-white'
                    size={20}
                  />
                </button>

                <div className='absolute bottom-[10%] left-10'>
                  <p className='text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8'>
                    {data?.title}
                  </p>

                  <div className='flex flex-row gap-4 items-center'>
                    <PlayButton movieId={data?.id} />
                    <FavoriteButton movieId={data?.id} />
                  </div>
                </div>
              </header>

              <footer className='px-12 py-8'>
                <div className='flex flex-row items-center gap-2 mb-8'>
                  <p className='text-green-400 font-bold text-lg'>New</p>
                  <p className='text-white font-bold text-lg'>
                    {data?.duration}
                  </p>
                  <p className='text-white font-bold text-lg'>{data?.genre}</p>
                </div>
                <p className='text-white text-lg'>{data?.description}</p>
              </footer>
            </article>
          </section>
        </aside>
      )}
    </>
  )
}

export default InfoModal

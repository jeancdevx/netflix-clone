import { useCallback } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import Loader from '../Loader'
import useInfoModal from '../Modal/useInfoModal.hook'
import PlayButton from '../PlayButton'
import useBillboard from './useBillboard.hook'

const Billboard = () => {
  const { data, error, isLoading } = useBillboard()
  const { openModal } = useInfoModal()

  const handleOpenModal = useCallback(() => {
    openModal(data?.id)
  }, [data?.id, openModal])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <section className='relative md:h-[56.25vw] h-[70vw] pb-40'>
          <video
            poster={data?.thumbnailUrl}
            src={data?.videoUrl}
            autoPlay
            loop
            muted
            className='absolute object-cover w-full md:h-[56.25vw] h-[70vw] brightness-[60%] '
          />

          <article className='absolute top-[30%] md:top-[40%] ml-4 md:ml-16'>
            <h1 className='text-2xl md:text-5xl text-white h-full w-[60%] lg:text-6xl font-bold drop-shadow-xl'>
              {data?.title}
            </h1>

            <p className='text-white text-sm md:text-lg lg:text-xl font-semibold drop-shadow-xl mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%]'>
              {data?.description}
            </p>

            <div className='flex mt-3 md:mt-8 gap-4'>
              <PlayButton movieId={data?.id} />

              <button
                className='bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 flex items-center hover:bg-opacity-20 transition-all duration-200 ease-in-out'
                onClick={handleOpenModal}
              >
                <AiOutlineInfoCircle className='h-5 mr-1' />
                More Info
              </button>
            </div>
          </article>
        </section>
      )}
    </>
  )
}

export default Billboard

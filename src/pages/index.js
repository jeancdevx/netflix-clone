import Billboard from '@/components/Billboard'
import FavoriteMovieList from '@/components/Favorite/FavoriteMovieList'
import InfoModal from '@/components/Modal/InfoModal'
import useInfoModal from '@/components/Modal/useInfoModal.hook'
import MovieList from '@/components/MovieList'
import Navbar from '@/components/Navbar'
import { getSession } from 'next-auth/react'

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

const Home = () => {
  const { isOpen, closeModal } = useInfoModal()

  return (
    <>
      <InfoModal
        visible={isOpen}
        onClose={closeModal}
      />

      <Navbar />

      <Billboard />

      <div className='pb-40'>
        <MovieList title='Trending Now' />
        <FavoriteMovieList title='My List' />
      </div>
    </>
  )
}

export default Home

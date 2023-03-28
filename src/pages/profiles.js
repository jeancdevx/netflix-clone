import UserCard from '@/components/UserCard'
import useCurrentUser from '@/hooks/useCurrentUser.hook'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

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

const App = () => {
  const router = useRouter()
  const { data: currentUser } = useCurrentUser()

  const selectProfile = useCallback(() => {
    router.push('/')
  }, [router])

  return (
    <main className='flex items-center h-full justify-center'>
      <aside className='flex flex-col'>
        <h1 className='lg:text-8xl md:text-6xl text-5xl text-white font-bold text-center'>
          Who&#39;s watching?
        </h1>
        <section className='flex items-center justify-center font-semibold gap-8 mt-10'>
          <div onClick={() => selectProfile()}>
            <UserCard name={currentUser?.name} />
          </div>
        </section>
      </aside>
    </main>
  )
}

export default App

import Login from '@/components/Login'
import { getSession } from 'next-auth/react'

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

const Auth = () => {
  return (
    <main className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <aside className='bg-black w-full h-full lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <img
            src='/images/logo.png'
            className='h-12'
            alt='Logo'
          />
        </nav>
        <section className='flex justify-center'>
          <Login />
        </section>
      </aside>
    </main>
  )
}

export default Auth

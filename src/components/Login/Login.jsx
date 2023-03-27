import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import Input from '../Input'
import Loader from '../Loader'

const Login = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [variant, setVariant] = useState('login')
  const [loading, setLoading] = useState(false)

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === 'login' ? 'register' : 'login'))
  }, [])

  const login = useCallback(async () => {
    setLoading(true)

    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles'
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [email, password])

  const register = useCallback(async () => {
    setLoading(true)

    try {
      await axios.post('/api/register', {
        name,
        email,
        password
      })

      login()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [name, email, password, login])

  return (
    <article className='flex justify-center'>
      <div className='bg-black bg-opacity-70 px-12 py-16 self-center mt-2 md:w-full md:max-w-xl rounded-md w-full'>
        <h2 className='text-white text-4xl mb-8 font-bold'>
          {variant === 'login' ? 'Sign in' : 'Sign up'}
        </h2>

        <form
          className='flex flex-col gap-4'
          onSubmit={(e) => e.preventDefault()}
        >
          {variant === 'register' && (
            <Input
              label='Username'
              onChange={(e) => setName(e.target.value)}
              id='name'
              type='text'
              value={name}
            />
          )}
          <Input
            label='Email'
            onChange={(e) => setEmail(e.target.value)}
            id='email'
            type='email'
            value={email}
          />
          <Input
            label='Password'
            onChange={(e) => setPassword(e.target.value)}
            id='password'
            type='password'
            value={password}
          />
        </form>

        <button
          onClick={variant === 'login' ? login : register}
          className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition font-semibold'
        >
          {variant === 'login' ? 'Sign in' : 'Sign up'}
        </button>

        <footer className='flex flex-row items-center justify-center gap-4 mt-6 mb-6'>
          <button
            onClick={() => signIn('google', { callbackUrl: '/profiles' })}
            className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
          >
            <FcGoogle size={30} />
          </button>
          <button
            onClick={() => signIn('github', { callbackUrl: '/profiles' })}
            className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
          >
            <FaGithub size={30} />
          </button>
        </footer>

        <p className='text-neutral-500 font-semibold text-center mt-4'>
          {variant === 'login'
            ? "Don't have an account? "
            : 'Already have an account? '}
          <span
            className='text-white hover:text-red-600 transition cursor-pointer'
            onClick={toggleVariant}
          >
            {variant === 'login' ? 'Sign up' : 'Sign in'}
          </span>
        </p>

        {loading && <Loader />}
      </div>
    </article>
  )
}

export default Login

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
    <article className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
      <h2 className='text-white text-4xl mb-8 font-semibold'>
        {variant === 'login' ? 'Sign in' : 'Register'}
      </h2>

      <form className='flex flex-col gap-4'>
        {variant === 'register' && (
          <Input
            id='name'
            type='text'
            label='Username'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <Input
          id='email'
          type='email'
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type='password'
          id='password'
          label='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>

      <button
        onClick={() => {
          setLoading(true)
          variant === 'login' ? login() : register()
        }}
        className='bg-red-600 py-3 font-bold text-lg text-white rounded-md w-full mt-10 hover:bg-red-700 transition'
      >
        {variant === 'login' ? 'Login' : 'Sign up'}
      </button>

      <section className='flex flex-row items-center gap-4 mt-8 justify-center'>
        <article
          onClick={() => signIn('google', { callbackUrl: '/profiles' })}
          className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
        >
          <FcGoogle size={32} />
        </article>
        <article
          onClick={() => signIn('github', { callbackUrl: '/profiles' })}
          className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
        >
          <FaGithub size={32} />
        </article>
      </section>

      <p className='text-white text-center mt-8 font-bold'>
        {variant === 'login' ? 'New to Netflix?' : 'Already have an account?'}
        <span
          onClick={toggleVariant}
          className='text-red-600 cursor-pointer hover:opacity-80 transition'
        >
          {variant === 'login' ? ' Sign up now.' : ' Sign in now.'}
        </span>
      </p>

      {loading && <Loader />}
    </article>
  )
}

export default Login

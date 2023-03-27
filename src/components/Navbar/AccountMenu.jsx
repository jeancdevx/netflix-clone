import useCurrentUser from '@/hooks/useCurrentUser.hook'
import { signOut } from 'next-auth/react'

const AccountMenu = ({ visible }) => {
  const { data: currentUser } = useCurrentUser()

  if (!visible) return null

  return (
    <div className='bg-black w-56 absolute top-14 right-0 flex-col border-2 border-gray-800 flex'>
      <div className='flex gap-3 px-3 py-3 group/item flex-row  items-center w-full cursor-pointer hover:bg-gradient-to-r from-black to-gray-900 transition duration-100'>
        <img
          className='w-8 rounded-md'
          src='/images/default-blue.png'
          alt=''
        />
        <p className='text-white text-sm font-semibold'>{currentUser?.name}</p>
      </div>

      <div
        onClick={() => signOut()}
        className='bg-red-700 py-3 h-full px-3 text-center text-white text-sm font-semibold cursor-pointer hover:bg-gradient-to-r from-red-700 to-red-600 transition duration-50'
      >
        Sign out of Netflix
      </div>
    </div>
  )
}

export default AccountMenu

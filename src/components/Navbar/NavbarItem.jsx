import Link from 'next/link'

const NavbarItem = ({ label = 'Home' }) => {
  return (
    <li className='text-white font-semibold cursor-pointer hover:text-gray-300 transition'>
      <Link href={`/${label.toLowerCase()}`}>{label}</Link>
    </li>
  )
}

export default NavbarItem

import Link from 'next/link'

const MobileNavbarItem = ({ label = 'Home' }) => {
  return (
    <li className='px-3 text-center text-white hover:underline'>
      <Link href={`/${label.toLowerCase()}`}>{label}</Link>
    </li>
  )
}

export default MobileNavbarItem

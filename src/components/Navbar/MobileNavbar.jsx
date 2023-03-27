import MobileNavbarItem from './MobileNavbarItem'
import { links } from './Navbar.constants'

const MobileNavbar = ({ visible }) => {
  if (!visible) return null

  return (
    <nav className='bg-black w-auto px-8 absolute top-8 -left-4 md:left-0 py-5 flex-col border-2 border-gray-800 flex'>
      <ul className='flex flex-col gap-4'>
        {links.map((link) => (
          <MobileNavbarItem
            key={link}
            label={link}
          />
        ))}
      </ul>
    </nav>
  )
}

export default MobileNavbar

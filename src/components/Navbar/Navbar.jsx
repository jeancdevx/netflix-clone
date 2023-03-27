import { useCallback, useState } from 'react'
import { BsBell, BsChevronDown, BsSearch } from 'react-icons/bs'
import AccountMenu from './AccountMenu'
import MobileNavbar from './MobileNavbar'
import { links } from './Navbar.constants'
import NavbarItem from './NavbarItem'
import useScroll from './useScroll.hook'

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const { showBackground } = useScroll()

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((prev) => !prev)
    setShowAccountMenu(false)
  }, [])

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((prev) => !prev)
    setShowMobileMenu(false)
  }, [])

  return (
    <header className='w-full fixed top-0 z-50'>
      <nav
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ease-in-out ${
          showBackground ? 'bg-zinc-900 bg-opacity-90' : ''
        }
      `}
      >
        <img
          src='/images/logo.png'
          alt='logo'
          className='h-7 lg:h-7'
        />

        <ul className='flex-row ml-8 gap-7 hidden lg:flex'>
          {links.map((link) => (
            <NavbarItem
              key={link}
              label={link}
            />
          ))}
        </ul>

        <aside
          onClick={toggleMobileMenu}
          className='lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative'
        >
          <p className='text-white font-semibold'>Browse</p>

          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? 'transform rotate-180' : ''
            }`}
          />

          <MobileNavbar visible={showMobileMenu} />
        </aside>

        <section className='flex flex-row items-center gap-7 ml-auto'>
          <article className='text-gray-200 hover:text-gray300 cursor-pointer transition'>
            <BsSearch />
          </article>

          <article className='text-gray-200 hover:text-gray300 cursor-pointer transition'>
            <BsBell />
          </article>

          <article className='flex flex-row items-center gap-2 cursor-pointer relative'>
            <figure
              className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'
              onClick={toggleAccountMenu}
            >
              <img
                src='/images/default-blue.png'
                alt='profile'
                className='w-full h-full object-cover'
              />
            </figure>

            <BsChevronDown
              onClick={toggleAccountMenu}
              className={`text-white transition ${
                showAccountMenu ? 'transform rotate-180' : ''
              }`}
            />

            <AccountMenu visible={showAccountMenu} />
          </article>
        </section>
      </nav>
    </header>
  )
}

export default Navbar

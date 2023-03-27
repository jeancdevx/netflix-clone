import { useEffect, useState } from 'react'
import { TOP_OFFSET } from './Navbar.constants'

const useScroll = () => {
  const [showBackground, setShowBackground] = useState(false)

  const handleScroll = () => {
    if (window.scrollY >= TOP_OFFSET) {
      setShowBackground(true)
    } else {
      setShowBackground(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { showBackground }
}

export default useScroll

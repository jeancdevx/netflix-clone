import { useState } from 'react'

const useMouseMove = () => {
  const [isActive, setIsActive] = useState(false)

  const handleMouseMove = () => {
    setIsActive(true)

    const timeout = setTimeout(() => {
      setIsActive(false)
    }, 3000)

    if (isActive) {
      clearTimeout(timeout)
    } else {
      setIsActive(true)
    }
  }

  return {
    isActive,
    handleMouseMove
  }
}

export default useMouseMove

import { useState, useEffect } from 'react'

// Hook to detect if device is mobile based on screen width
export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Check on mount
    checkIsMobile()

    // Listen for resize events
    window.addEventListener('resize', checkIsMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [breakpoint])

  return isMobile
}

// Utility function for one-time mobile check
export const isMobileDevice = (breakpoint = 768) => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < breakpoint
}
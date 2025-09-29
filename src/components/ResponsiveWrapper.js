import React from 'react'
import { useIsMobile } from '../utils/mobile'

const ResponsiveWrapper = ({
  children,
  visibleOnMobile = true,
  visibleOnDesktop = true,
  mobileBreakpoint = 768
}) => {
  const isMobile = useIsMobile(mobileBreakpoint)

  // Determine if component should be visible
  const shouldShow = isMobile ? visibleOnMobile : visibleOnDesktop

  if (!shouldShow) {
    return null
  }

  return children
}

export { ResponsiveWrapper }
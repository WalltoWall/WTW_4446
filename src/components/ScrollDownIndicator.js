import React from 'react'
import { a, useSpring } from 'react-spring'

import { Box } from 'system'

export const ScrollDownIndicator = ({ color = 'white', ...props }) => {
  const animStyles = useSpring({
    from: { top: '0%', bottom: '100%' },
    // to: async next => {
    //   while (true) {
    //     await next({ top: '0%', bottom: '0%' })
    //     await next({ top: '100%', bottom: '0%' })
    //   }
    // },
  })

  return (
    <Box width="2px" height="40px" position="relative" {...props}>
      <Box
        as={a(Box)}
        bg={color}
        position="absolute"
        left={0}
        right={0}
        style={animStyles}
      />
    </Box>
  )
}

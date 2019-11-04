import React from 'react'
import { a, config, useSpring } from 'react-spring'
import delay from 'delay'

import { Box, Button } from 'system'

const Bar = props => (
  <Box
    as={a(Box)}
    bg="currentColor"
    height="2px"
    width="100%"
    position="absolute"
    {...props}
  />
)

export const HamburgerButton = ({ active, ...props }) => {
  const topSpring = useSpring({
    from: {
      y: `translateY(${active ? 45 : 0}%)`,
      rot: `rotate(${active ? 45 : 0}deg)`,
    },
    to: async next => {
      if (active) {
        next({ y: `translateY(${active ? 45 : 0}%)` })
        await delay(200)
        next({ rot: `rotate(${active ? 45 : 0}deg)` })
      } else {
        next({ rot: `rotate(${active ? 45 : 0}deg)` })
        await delay(200)
        next({ y: `translateY(${active ? 45 : 0}%)` })
      }
    },
    config: config.stiff,
  })

  const middleSpring = useSpring({
    from: {
      scale: 'scaleY(1)',
    },
    to: async next => {
      if (active) {
        next({ scale: 'scaleY(0)' })
      } else {
        await delay(200)
        next({ scale: 'scaleY(1)' })
      }
    },
    config: config.stiff,
  })

  const bottomSpring = useSpring({
    from: {
      y: `translateY(${active ? -45 : 0}%)`,
      rot: `rotate(${active ? -45 : 0}deg)`,
    },
    to: async next => {
      if (active) {
        next({ y: `translateY(${active ? -45 : 0}%)` })
        await delay(200)
        next({ rot: `rotate(${active ? -45 : 0}deg)` })
      } else {
        next({ rot: `rotate(${active ? -45 : 0}deg)` })
        await delay(200)
        next({ y: `translateY(${active ? -45 : 0}%)` })
      }
    },
    config: config.stiff,
  })

  return (
    <Button
      width="28px"
      height="22px"
      position="relative"
      outline="none"
      {...props}
    >
      <Box
        as={a(Box)}
        position="absolute"
        top={0}
        left={0}
        height="100%"
        width="100%"
        style={{ transform: topSpring.y }}
      >
        <Bar left={0} top={0} style={{ transform: topSpring.rot }} />
      </Box>
      <Box
        as={a(Box)}
        position="absolute"
        top={0}
        left={0}
        height="100%"
        width="100%"
        style={{ transform: middleSpring.scale }}
      >
        <Bar left={0} top="50%" transform="translateY(-50%)" />
      </Box>
      <Box
        as={a(Box)}
        position="absolute"
        top={0}
        left={0}
        height="100%"
        width="100%"
        style={{ transform: bottomSpring.y }}
      >
        <Bar bottom={0} left={0} style={{ transform: bottomSpring.rot }} />
      </Box>
    </Button>
  )
}

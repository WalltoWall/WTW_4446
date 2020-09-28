import React from 'react'
import { SkipNavLink as SkipNavLinkBase } from '@reach/skip-nav'
import { Text } from 'system'

export const SkipNavLink = () => (
  <Text
    as={SkipNavLinkBase}
    bg="white"
    color="black"
    fontWeight="bold"
    left={0}
    opacity={0}
    p="1rem"
    position="absolute"
    top={0}
    transitionProperty="opacity"
    zIndex={9999}
    outline="none"
    css={{
      pointerEvents: 'none',

      '&:focus': {
        opacity: '1',
        pointerEvents: 'auto',
      },
    }}
  />
)

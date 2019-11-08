import React, { useState } from 'react'
import { useGesture } from 'react-use-gesture'

import { Flex, Button as ButtonBase } from 'system'

export const ButtonCircle = ({ children, ...props }) => {
  const [isFocused, setIsFocused] = useState(false)
  const handleFocus = isFocused => setIsFocused(() => Boolean(isFocused))

  const bind = useGesture({
    onHover: ({ hovering }) => handleFocus(hovering),
    onDrag: ({ down }) => handleFocus(down),
  })

  return (
    <ButtonBase
      bg={isFocused ? 'button' : 'buttonBackground'}
      color={isFocused ? 'buttonBackground' : 'button'}
      transitionProperty="background-color, color"
      borderRadius="50%"
      outline="0"
      onFocus={() => handleFocus(true)}
      onBlur={() => handleFocus(false)}
      {...bind()}
      {...props}
    >
      <Flex height="100%" alignItems="center" justifyContent="center">
        {children}
      </Flex>
    </ButtonBase>
  )
}

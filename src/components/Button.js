import React, { useState } from 'react'
import { useGesture } from 'react-use-gesture'

import { Button as ButtonBase } from 'system'

export const Button = props => {
  const [isFocused, setIsFocused] = useState(false)
  const handleFocus = isFocused => setIsFocused(() => Boolean(isFocused))

  const bind = useGesture({
    onHover: ({ hovering }) => handleFocus(hovering),
    onDrag: ({ down }) => handleFocus(down),
  })

  return (
    <ButtonBase
      pxScale={['m', null, null, 'l']}
      pyScale="s"
      fontSizeScale={['l', 'm']}
      lineHeight="subheadline"
      fontWeight="subheadline"
      fontFamily="subheadline"
      bg={isFocused ? 'button' : 'buttonBackground'}
      color={isFocused ? 'buttonBackground' : 'button'}
      transitionProperty="background-color, color"
      outline="0"
      onFocus={() => handleFocus(true)}
      onBlur={() => handleFocus(false)}
      {...bind()}
      {...props}
      css={{ whiteSpace: 'nowrap' }}
    />
  )
}

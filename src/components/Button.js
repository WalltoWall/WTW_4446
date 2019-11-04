import React from 'react'

import { Button as ButtonBase } from 'system'

export const Button = props => (
  <ButtonBase
    pxScale="s"
    pyScale="s-"
    fontSizeScale="m"
    lineHeight="solid"
    fontWeight="heavy"
    textStyle="caps"
    {...props}
  />
)

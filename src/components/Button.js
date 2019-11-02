import React from 'react'

import { Button as ButtonBase } from 'system'

export const Button = props => (
  <ButtonBase
    pxScale="s"
    pyScale="s-"
    lineHeight="solid"
    fontWeight="bold"
    textStyle="trackedCaps"
    {...props}
  />
)

import React from 'react'

import { Heading as HeadingBase } from 'system'

export const Heading = props => (
  <HeadingBase
    fontWeight="black"
    fontSizeScale="l"
    lineHeight="title"
    {...props}
  />
)

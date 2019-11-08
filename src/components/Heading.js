import React from 'react'

import { Heading as HeadingBase } from 'system'

export const Heading = props => (
  <HeadingBase
    as="h2"
    color="headline"
    fontFamily="headline"
    fontWeight="headline"
    lineHeight="headline"
    fontSizeScale="xxl"
    {...props}
  />
)

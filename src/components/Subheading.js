import React from 'react'

import { Heading } from 'system'

export const Subheading = props => (
  <Heading
    as="h3"
    color="subheadline"
    fontFamily="subheadline"
    fontWeight="subheadline"
    lineHeight="subheadline"
    fontSizeScale={['s', null, 'm']}
    {...props}
  />
)

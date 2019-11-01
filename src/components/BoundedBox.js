import React from 'react'

import { BoundedBox as BoundedBoxBase } from 'system'

export const BoundedBox = ({ nextSharesBg = [false], ...props }) => (
  <BoundedBoxBase
    pxScale="m"
    ptScale="xl"
    pbScale={nextSharesBg?.map?.(cond => (cond ? 0 : 'xl'))}
    maxWidth="l"
    {...props}
  />
)

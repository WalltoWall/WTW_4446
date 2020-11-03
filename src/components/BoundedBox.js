import React from 'react'

import { BoundedBox as BoundedBoxBase } from 'system'

export const BoundedBox = ({ nextSharesBg = [false], ...props }) => (
  <BoundedBoxBase
    pxScale={['l', null, 'xl', null, 'xxl']}
    ptScale="xxl"
    pbScale={nextSharesBg?.map?.(cond => (cond ? 0 : 'xxl'))}
    maxWidth="l"
    {...props}
  />
)

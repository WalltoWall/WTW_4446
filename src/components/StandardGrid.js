import React from 'react'

import { Grid } from 'system'

export const StandardGrid = props => (
  <Grid
    gridRowGapScale="m"
    gridColumnGapScale={['m', 'xl']}
    gridTemplateColumns={['repeat(4, 1fr)', 'repeat(12, 1fr)']}
    {...props}
  />
)

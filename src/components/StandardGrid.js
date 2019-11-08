import React from 'react'

import { Grid } from 'system'

export const StandardGrid = props => (
  <Grid
    gridRowGapScale="m"
    gridColumnGapScale={['m', 'xl']}
    gridTemplateColumns="repeat(12, 1fr)"
    {...props}
  />
)

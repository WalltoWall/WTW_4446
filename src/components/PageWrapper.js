import React from 'react'
import { ThemeProvider, Text } from 'system'

import { theme } from 'src/theme'

export const PageWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Text fontFamily="sans" fontSizeScale="b" lineHeight="copy">
      {children}
    </Text>
  </ThemeProvider>
)

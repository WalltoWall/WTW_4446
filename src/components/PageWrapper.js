import React from 'react'
import { ThemeProvider, Text } from 'system'
import { PreviewStoreProvider } from 'gatsby-source-prismic'

import { theme } from 'src/theme'

export const PageWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <PreviewStoreProvider>
      <Text fontFamily="sans" fontSizeScale="b" lineHeight="copy">
        {children}
      </Text>
    </PreviewStoreProvider>
  </ThemeProvider>
)

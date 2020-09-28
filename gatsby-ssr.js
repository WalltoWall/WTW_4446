import React from 'react'
import { PreviewStoreProvider } from 'gatsby-source-prismic'

export { wrapPageElement } from './src/wrapPageElement'

export const wrapRootElement = ({
  element,
}) => (
  <PreviewStoreProvider>
    {element}
  </PreviewStoreProvider>
)

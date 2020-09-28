import * as React from 'react'
import { withPreviewResolver } from 'gatsby-source-prismic'

import { linkResolver } from '../linkResolver'

export const PreviewPage = ({ isPreview }) => {
  if (isPreview === false)
    return (
      <p>
        You're on the preview page, but it looks like we don't have any data to
        preview!
      </p>
    )

  return <p>Loading&hellip;</p>
}

export default withPreviewResolver(PreviewPage, {
  repositoryName: process.env.GATSBY_PRISMIC_REPOSITORY_NAME,
  linkResolver,
})

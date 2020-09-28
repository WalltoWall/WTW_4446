import * as React from 'react'
import { Helmet } from 'react-helmet'
import MapSlicesToComponents from '@walltowall/react-map-slices-to-components'

import { useSettingsData } from 'src/hooks/useSettingsData'

import { PageTemplate } from '../templates/page'
import { withUnpublishedPreview } from 'gatsby-source-prismic'

/**
 * Mapping of Prismic custom type API IDs to their templates. Add mappings here
 * as custom types and templates are created.
 *
 * @see https://github.com/angeloashmore/gatsby-source-prismic/blob/master/docs/previews.md#withUnpublishedPreview
 */
const customTypeToTemplate = {
  page: PageTemplate,
}

export const NotFoundPage = () => {
  const siteSettings = useSettingsData()

  return (
    <>
      <p>Not found</p>
    </>
  )
}

export default withUnpublishedPreview(NotFoundPage, {
  templateMap: customTypeToTemplate,
})

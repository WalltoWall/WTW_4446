import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import { PageTemplate as PageTemplateBase } from 'gatsby-theme-ww-prismic/src/templates/page'

import { PageWrapper } from 'src/components'

export const injectSlices = (list = []) => list

export const PageTemplate = ({
  mapOverrides,
  listMiddleware,
  data,
  ...props
}) => (
  <>
    <Helmet>
      {data.prismicPage.data.webfonts.map(webfont => (
        <link key={webfont?.css_url} rel="stylesheet" href={webfont?.css_url} />
      ))}
    </Helmet>
    <PageWrapper>
      <PageTemplateBase data={data} {...props}>
        <PageTemplateBase.MapSlicesToComponents
          listMiddleware={listMiddleware || injectSlices}
          mapOverrides={mapOverrides}
        />
      </PageTemplateBase>
    </PageWrapper>
  </>
)

export default PageTemplate

export const query = graphql`
  query($uid: String!) {
    prismicPage(uid: { eq: $uid }) {
      ...PageTemplate
      data {
        webfonts {
          css_url
        }
      }
    }
    ...SlicesPageBody
  }
`

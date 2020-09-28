import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { graphql } from 'gatsby'
import MapSlicesToComponents from '@walltowall/react-map-slices-to-components'
import { withPreview } from 'gatsby-source-prismic'

import { ThemeProvider, Box, Text } from 'system'

import { useSettingsData } from 'src/hooks/useSettingsData'
import { slicesMap } from 'src/slices/PageBody'
import { SkipNavLink } from '../components/SkipNavLink'
import { linkResolver } from '../linkResolver'

export const PageTemplate = ({ data, location, ...props }) => {
  const page = data.prismicPage
  const fontsTheme = useMemo(
    () => ({
      fonts: {
        headline: page?.data?.headline_font_family?.text ?? 'sans-serif',
        subheadline: page?.data?.subheadline_font_family?.text ?? 'sans-serif',
        body: page?.data?.body_font_family?.text ?? 'sans-serif',
      },
      fontWeights: {
        headline: page?.data?.headline_font_weight ?? 400,
        subheadline: page?.data?.subheadline_font_weight ?? 400,
        body: page?.data?.body_font_weight ?? 400,
      },
      lineHeights: {
        headline: page?.data?.headline_line_height ?? 1,
        subheadline: page?.data?.subheadline_line_height ?? 1,
        body: page?.data?.body_line_height ?? 1,
      },
    }),
    [page],
  )

  const settings = useSettingsData()
  const siteName = settings?.site_name?.text
  const siteDescription = settings?.site_description?.text

  const meta = useMemo(
    () => ({
      rootData: data,
      page: data?.prismicPage,
      location: location,
    }),
    [data, location],
  )

  return (
    <>
      <Helmet titleTemplate={`%s – ${siteName}`} defaultTitle={siteName}>
        <meta name="description" content={siteDescription} />
        {data.prismicPage.data.webfont_css.map(
          webfont =>
            webfont.url && (
              <link key={webfont.url} rel="stylesheet" href={webfont.url} />
            ),
        )}
      </Helmet>
      <ThemeProvider theme={fontsTheme}>
        <Text fontFamily="body" lineHeight="body" fontWeight="body">
          <SkipNavLink />
          {/* process.env.NODE_ENV === 'development' && <DevRefreshButton /> */}
          <Box as="main" position="relative" {...props}>
            <MapSlicesToComponents
              list={page?.data?.body}
              map={slicesMap}
              meta={meta}
            />
          </Box>
        </Text>
      </ThemeProvider>
    </>
  )
}

export default withPreview(PageTemplate, { linkResolver })

export const query = graphql`
  query($uid: String!) {
    prismicPage(uid: { eq: $uid }) {
      ...PrismicPageParentRecursive
      _previewable
      uid
      data {
        title {
          text
        }
        meta_title
        meta_description
        webfont_css {
          url
        }
        headline_font_family {
          text
        }
        headline_font_weight
        headline_line_height
        subheadline_font_family {
          text
        }
        subheadline_font_weight
        subheadline_line_height
        body_font_family {
          text
        }
        body_font_weight
        body_line_height
        body {
          __typename
        }
      }
    }
    ...SlicesPageBody
  }
`

import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import { GenericTemplate } from 'gatsby-theme-ww-prismic'

import { ThemeProvider, Text } from 'system'

import { slicesMap } from 'src/slices/PageBody'

export const PageTemplate = ({ data, ...props }) => {
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

  return (
    <>
      <Helmet>
        {data.prismicPage.data.webfont_css.map(
          webfont =>
            webfont.url && (
              <link key={webfont.url} rel="stylesheet" href={webfont.url} />
            ),
        )}
      </Helmet>
      <ThemeProvider theme={fontsTheme}>
        <Text fontFamily="body" lineHeight="body" fontWeight="body">
          <GenericTemplate
            customType="page"
            sliceZoneId="body"
            slicesMap={slicesMap}
            data={data}
            {...props}
          />
        </Text>
      </ThemeProvider>
    </>
  )
}

export default PageTemplate

export const query = graphql`
  query($uid: String!) {
    prismicPage(uid: { eq: $uid }) {
      ...PageParentRecursive
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

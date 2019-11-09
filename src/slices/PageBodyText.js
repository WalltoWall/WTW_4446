import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { getRichText, propPairsEq } from 'helpers'

import { safeHexToP3 } from 'src/helpers'

import { ThemeProvider } from 'system'
import { BoundedBox, HTMLContent, StandardGrid } from 'src/components'

export const PageBodyText = ({
  backgroundColor = 'white',
  linkColor = 'inherit',
  headlineColor = 'inherit',
  textColor = 'inherit',
  textHTML,
  ...props
}) => {
  const theme = useMemo(
    () => ({
      colors: {
        background: safeHexToP3(backgroundColor),
        headline: safeHexToP3(headlineColor),
        body: safeHexToP3(textColor),
        link: safeHexToP3(linkColor),
      },
    }),
    [backgroundColor, headlineColor, linkColor, textColor],
  )

  return (
    <ThemeProvider theme={theme}>
      <BoundedBox as="section" bg="background" {...props}>
        <StandardGrid>
          <HTMLContent
            gridColumn={['1 / -1', null, '1 / span 9']}
            html={textHTML}
          />
        </StandardGrid>
      </BoundedBox>
    </ThemeProvider>
  )
}

PageBodyText.mapDataToProps = ({ data, context, nextContext }) => ({
  nextSharesBg: propPairsEq('bg', context, nextContext),
  backgroundColor: data?.primary?.background_color,
  headlineColor: data?.primary?.headline_color,
  textColor: data?.primary?.text_color,
  linkColor: data?.primary?.link_color,
  textHTML: getRichText(data?.primary?.text),
})

PageBodyText.mapDataToContext = ({ data }) => ({
  bg: data?.primary?.background_color,
})

export const fragment = graphql`
  fragment PageBodyText on Query {
    prismicPage(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPageBodyText {
            id
            primary {
              background_color
              headline_color
              text_color
              link_color
              text {
                text
                html
              }
            }
          }
        }
      }
    }
  }
`

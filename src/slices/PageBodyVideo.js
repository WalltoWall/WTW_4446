import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { propPairsEq, notEmpty } from 'helpers'

import { safeHexToP3 } from 'src/helpers'

import { ThemeProvider } from 'system'
import { BoundedBox, HTMLContent } from 'src/components'

export const PageBodyVideo = ({
  backgroundColor = 'white',
  embedHTML,
  ...props
}) => {
  const theme = useMemo(
    () => ({
      colors: {
        background: safeHexToP3(backgroundColor),
      },
    }),
    [backgroundColor],
  )

  return (
    <ThemeProvider theme={theme}>
      <BoundedBox as="section" bg="background" {...props}>
        {notEmpty(embedHTML) && <HTMLContent html={embedHTML} />}
      </BoundedBox>
    </ThemeProvider>
  )
}

PageBodyVideo.mapDataToProps = ({ data, context, nextContext }) => ({
  nextSharesBg: propPairsEq('bg', context, nextContext),
  backgroundColor: data?.primary?.background_color,
  embedHTML: data?.primary?.video_url?.html,
})

PageBodyVideo.mapDataToContext = ({ data }) => ({
  bg: data?.primary?.background_color,
})

export const fragment = graphql`
  fragment PageBodyVideo on Query {
    prismicPage(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPageBodyVideo {
            id
            primary {
              background_color
              video_url {
                html
              }
            }
          }
        }
      }
    }
  }
`

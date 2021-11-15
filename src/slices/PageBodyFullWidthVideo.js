import React from 'react'
import { graphql } from 'gatsby'
import { propPairsEq } from 'helpers'

import { safeHexToP3 } from 'src/helpers'

import { ThemeProvider, AspectRatio, Box } from 'system'
import { convertVimeoLinkToIframeSrc } from '../utils/convertVimeoLinkToIFrameSrc'

export const PageBodyFullWidthVideo = ({
  backgroundColor = 'white',
  vimeoURL,
  videoPlayerId = 'video',
}) => {
  const theme = React.useMemo(
    () => ({
      colors: {
        background: safeHexToP3(backgroundColor),
      },
    }),
    [backgroundColor],
  )

  return (
    <ThemeProvider theme={theme}>
      <Box as="section" position="relative">
        <AspectRatio x={16} y={9} bg="background">
          {vimeoURL && (
            <iframe
              id={videoPlayerId}
              src={convertVimeoLinkToIframeSrc(vimeoURL)}
              title="FullWidthVideo"
              frameBorder={0}
              allow="autoplay; fullscreen; muted"
              allowFullScreen
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </AspectRatio>
      </Box>
    </ThemeProvider>
  )
}

PageBodyFullWidthVideo.mapDataToProps = ({ data, context, nextContext }) => ({
  nextSharesBg: propPairsEq('bg', context, nextContext),
  backgroundColor: data?.primary?.background_color,
  vimeoURL: data?.primary?.vimeo_url,
})

PageBodyFullWidthVideo.mapDataToContext = ({ data }) => ({
  bg: data?.primary?.background_color,
})

export const fragment = graphql`
  fragment PageBodyFullWidthVideo on Query {
    prismicPage(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPageBodyFullWidthVideo {
            id
            primary {
              background_color
              vimeo_url
            }
          }
        }
      }
    }
  }
`

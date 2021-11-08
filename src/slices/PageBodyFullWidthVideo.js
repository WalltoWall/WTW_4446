import React from 'react'
import Player from '@vimeo/player'
import { graphql } from 'gatsby'
import { propPairsEq } from 'helpers'

import { safeHexToP3 } from 'src/helpers'

import { ThemeProvider, AspectRatio } from 'system'
import { convertVimeoLinkToIframeSrc } from '../utils/convertVimeoLinkToIFrameSrc'

export const PageBodyFullWidthVideo = ({
  backgroundColor = 'white',
  vimeoURL,
}) => {
  const player = React.useRef < Player > (() => new Player('foo-bar'))

  const theme = React.useMemo(
    () => ({
      colors: {
        background: safeHexToP3(backgroundColor),
      },
    }),
    [backgroundColor],
  )

  React.useEffect(() => {
    try {
      if (!player.current) {
        player.current = new Player('foo-bar')
      }
    } catch {}
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <AspectRatio as="section" x={16} y={9} bg="background">
        {vimeoURL && (
          <iframe
            id="foo-bar"
            src={
              convertVimeoLinkToIframeSrc(vimeoURL) +
              '?autoplay=1&loop=0&autopause=0&muted=1&background=1'
            }
            title="foo-bar"
            frameBorder={0}
            allow="autoplay; fullscreen; muted"
            allowFullScreen
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </AspectRatio>
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

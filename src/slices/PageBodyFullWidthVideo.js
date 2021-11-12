import React from 'react'
import Player from '@vimeo/player'
import { graphql } from 'gatsby'
import { propPairsEq } from 'helpers'

import { safeHexToP3 } from 'src/helpers'

import { ThemeProvider, AspectRatio, Box, Flex } from 'system'
import { convertVimeoLinkToIframeSrc } from '../utils/convertVimeoLinkToIFrameSrc'
import { ReactComponent as AssetIconSoundOffSVG } from '../assets/icon-sound-off.svg'
import { ReactComponent as AssetIconSoundOnSVG } from '../assets/icon-sound-on.svg'
import { ReactComponent as AssetIconReplayVideoSVG } from '../assets/icon-replay-video.svg'
import { ReactComponent as AssetIconPlaySVG } from '../assets/icon-play.svg'
import { ReactComponent as AssetIconPauseSVG } from '../assets/icon-pause.svg'

export const PageBodyFullWidthVideo = ({
  backgroundColor = 'white',
  vimeoURL,
  videoPlayerId = 'video',
}) => {
  const player = React.useRef()
  const [mute, setMute] = React.useState(true)
  const [videoEnded, setVideoEnded] = React.useState(false)
  const [playing, setPlaying] = React.useState(false)

  const toggleMute = () => setMute(mute => !mute)

  const toggleVideo = () => {
    if (!player.current) return

    if (playing) {
      setPlaying(false)
    } else {
      setPlaying(true)
      setMute(false)
    }
  }

  const replayVideo = () => {
    if (!player.current) return

    setVideoEnded(false)
    setPlaying(true)
  }

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
      if (!player.current) player.current = new Player(videoPlayerId)

      if (playing) {
        player.current.play()
      } else {
        player.current.pause()
      }

      player.current.setVolume(mute ? 0 : 1)
      player.current.on('ended', function() {
        setVideoEnded(true)
        setPlaying(false)
      })
    } catch (error) {
      console.error(error)
    }
  }, [mute, videoPlayerId, playing])

  return (
    <ThemeProvider theme={theme}>
      <Box as="section" position="relative">
        <AspectRatio x={16} y={9} bg="background">
          {vimeoURL && (
            <iframe
              id={videoPlayerId}
              src={
                convertVimeoLinkToIframeSrc(vimeoURL) +
                '?autoplay=0&loop=0&autopause=0&muted=1&background=1'
              }
              title="FullWidthVideo"
              frameBorder={0}
              allow="autoplay; fullscreen; muted"
              allowFullScreen
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </AspectRatio>

        {!videoEnded ? (
          <>
            <Flex
              as="button"
              width="100%"
              height="100%"
              position="absolute"
              background="rgb(0, 0, 0, .3)"
              opacity={!playing ? 1 : 0}
              top={0}
              left={0}
              right={0}
              bottom={0}
              justifyContent="center"
              alignItems="center"
              transitionProperty="opacity"
              transitionDuration="200ms"
              cursor="pointer"
              onClick={toggleVideo}
              css={{
                '&:hover': { opacity: 1, '& .video-control': { opacity: 1 } },
              }}
            >
              <Box
                width="4rem"
                color="white"
                position="relative"
                transitionProperty="opacity"
                transitionDuration="200ms"
                opacity={0.7}
                className="video-control"
              >
                {playing ? <AssetIconPauseSVG /> : <AssetIconPlaySVG />}
              </Box>
            </Flex>

            <Flex
              position="absolute"
              bottom={0}
              left={['.75rem', '1rem', '1.5rem']}
              alignItems="center"
              justifyContent="start"
              height={['2.75rem', '3rem', '4rem']}
            >
              <Box
                as="button"
                onClick={toggleMute}
                opacity={0.7}
                bg="transparent"
                transitionProperty="opacity"
                transitionDuration="200ms"
                cursor="pointer"
                css={{
                  '&:hover, &:focus': {
                    opacity: 1,
                  },
                }}
              >
                {mute ? (
                  <Box as={AssetIconSoundOffSVG} width="2rem" color="white" />
                ) : (
                  <Box as={AssetIconSoundOnSVG} width="2rem" color="white" />
                )}
              </Box>
            </Flex>
          </>
        ) : (
          <Flex
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            justifyContent="center"
            alignItems="center"
          >
            <Box
              position="absolute"
              background="black"
              width="100%"
              height="100%"
              opacity={0.5}
            />

            <Box
              as="button"
              onClick={replayVideo}
              color="white"
              bg="transparent"
              position="relative"
              cursor="pointer"
              opacity={0.8}
              transitionProperty="opacity"
              transitionDuration="200ms"
              css={{
                '&:hover, &:focus': {
                  opacity: 1,
                },
              }}
            >
              <AssetIconReplayVideoSVG width="4rem" />
            </Box>
          </Flex>
        )}
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

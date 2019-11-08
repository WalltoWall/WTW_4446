import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { linearScale } from 'styled-system-scale'
import { getImageFluid } from 'helpers'

import { useNavigationData } from 'src/hooks'
import { safeHexToP3 } from 'src/helpers'

import { ThemeProvider, Box, Grid, Flex, Image, Link } from 'system'
import { BoundedBox } from 'src/components'

export const PageBodyHeader = ({
  backgroundColor,
  linkColor = 'inherit',
  logoImageFluid,
  logoImageURL,
  logoImageAlt,
  ...props
}) => {
  const isTransparent = !Boolean(backgroundColor)
  // const navigation = useNavigationData(navigationUID)

  const theme = useMemo(
    () => ({
      colors: {
        background: safeHexToP3(backgroundColor),
        link: safeHexToP3(linkColor),
      },
    }),
    [backgroundColor, linkColor],
  )

  return (
    <ThemeProvider theme={theme}>
      <BoundedBox
        as="header"
        bg="background"
        color="link"
        left={0}
        maxWidth="none"
        position={isTransparent ? 'absolute' : 'static'}
        pyScale="s"
        right={0}
        top={0}
        zIndex="header"
        {...props}
      >
        <Flex alignItems="center" justifyContent="space-between">
          {(logoImageFluid || logoImageURL) && (
            <Image
              fluid={logoImageFluid}
              src={logoImageURL}
              alt={logoImageAlt}
              width={linearScale('70px', '207px', { count: 5 })}
            />
          )}
        </Flex>
      </BoundedBox>
    </ThemeProvider>
  )
}

PageBodyHeader.mapDataToProps = ({ data }) => ({
  backgroundColor: data?.primary?.background_color,
  linkColor: data?.primary?.link_color,
  navigationUID: data?.primary?.navigation?.uid,
  logoImageFluid: getImageFluid(data?.primary?.logo),
  logoImageURL: data?.primary?.logo?.url,
  logoImageAlt: data?.primary?.logo?.alt,
})

export const fragment = graphql`
  fragment PageBodyHeader on Query {
    prismicPage(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPageBodyHeader {
            id
            primary {
              background_color
              link_color
              navigation {
                uid
              }
              logo {
                alt
                localFile {
                  childImageSharp {
                    fluid(
                      maxWidth: 200
                      quality: 85
                      srcSetBreakpoints: [400]
                      pngCompressionSpeed: 10
                    ) {
                      ...GatsbyImageSharpFluid_noBase64
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

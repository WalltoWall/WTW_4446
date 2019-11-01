import React from 'react'
import { graphql } from 'gatsby'
import { linearScale } from 'styled-system-scale'
import { hexToP3 } from '@walltowall/hex-to-p3'
import { getImageFluid } from 'helpers'

import { useNavigationData } from 'src/hooks'

import { Box, Grid, Flex, Image, Link } from 'system'
import { BoundedBox } from 'src/components'

export const PageBodyHeader = ({
  navigationUID,
  backgroundColor,
  linkColor = 'inherit',
  fontFamily = 'inherit',
  logoImageFluid,
  logoImageURL,
  logoImageAlt,
  ...props
}) => {
  const isTransparent = !Boolean(backgroundColor)
  const navigation = useNavigationData(navigationUID)

  const backgroundColorP3 = backgroundColor && hexToP3(backgroundColor)
  const linkColorP3 = hexToP3(linkColor)

  return (
    <BoundedBox
      as="header"
      bg={backgroundColorP3}
      color={linkColorP3}
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
        {navigation && (
          <Grid as="ul" gridAutoFlow="column" gridGapScale="m">
            {navigation.items.map(item => (
              <Box key={item.id} as="li" color={linkColorP3}>
                <Link
                  href={item.url}
                  target={item.target}
                  fontFamily={fontFamily}
                  fontSizeScale="l"
                >
                  {item.primary.name}
                </Link>
              </Box>
            ))}
          </Grid>
        )}
      </Flex>
    </BoundedBox>
  )
}

PageBodyHeader.mapDataToProps = ({ data }) => ({
  backgroundColor: data?.primary?.background_color,
  linkColor: data?.primary?.link_color,
  fontFamily: data?.primary?.font_family?.text,
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
              font_family {
                text
              }
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

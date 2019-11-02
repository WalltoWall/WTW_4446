import React from 'react'
import { graphql } from 'gatsby'
import { camelCase } from 'tiny-compose-fns'
import { notEmpty, getRichText, getImageFluid } from 'helpers'

import { safeHexToP3 } from 'src/helpers'

import { Box, Flex, ImageContainer, Image, Link } from 'system'
import { BoundedBox, Button, HTMLContent } from 'src/components'

const normalizedTextVerticalAlignments = {
  center: 'center',
  top: 'flex-start',
  bottom: 'flex-end',
}

export const PageBodyFullViewportImage = ({
  textColor = 'inherit',
  buttonColor = 'black',
  buttonTextColor = 'white',
  fontFamily = 'inherit',
  imageFluid,
  imageURL,
  imageAlt,
  textHTML,
  textVerticalAlignment = 'center',
  buttons = [],
  ...props
}) => {
  const normalizedTextVerticalAlignment =
    normalizedTextVerticalAlignments[textVerticalAlignment]

  const textColorP3 = safeHexToP3(textColor)
  const buttonColorP3 = safeHexToP3(buttonColor)
  const buttonTextColorP3 = safeHexToP3(buttonTextColor)

  return (
    <BoundedBox
      position="relative"
      height="100vh"
      pt="20vh"
      pb="20vh"
      {...props}
    >
      <ImageContainer
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        css={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <Image
          fluid={imageFluid}
          src={imageURL}
          alt={imageAlt}
          {...props}
          css={{ userSelect: 'none', pointerEvents: 'none' }}
        />
      </ImageContainer>
      <Flex height="100%" justifyContent="center">
        <Flex
          position="relative"
          flexDirection="column"
          alignSelf={normalizedTextVerticalAlignment}
          maxWidth="m"
        >
          <HTMLContent
            html={textHTML}
            color={textColorP3}
            fontFamily={fontFamily}
            fontSizeScale="m"
            mbScale="m-"
            textAlign="center"
            fontWeight="bold"
          />
          <Flex as="ul" flexWrap="wrap" justifyContent="center">
            {buttons.map(button => (
              <Box key={button?.href} as="li" mrScale="s">
                <Button
                  as={Link}
                  href={button?.href}
                  bg={buttonColorP3}
                  color={buttonTextColorP3}
                >
                  {button?.text}
                </Button>
              </Box>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </BoundedBox>
  )
}

PageBodyFullViewportImage.mapDataToProps = ({ data }) => ({
  textColor: data?.primary?.text_color,
  buttonColor: data?.primary?.button_color,
  buttonTextColor: data?.primary?.button_text_color,
  fontFamily: data?.primary?.font_family?.text,
  imageFluid: getImageFluid(data?.primary?.image),
  imageURL: data?.primary?.image?.url,
  imageAlt: data?.primary?.image?.alt,
  textHTML: getRichText(data?.primary?.text),
  textVerticalAlignment: notEmpty(
    camelCase(data?.primary?.text_vertical_alignment),
  ),
  buttons: data?.items?.map?.(item => ({
    text: item?.button_text?.text,
    href: item?.button_link?.url,
    target: item?.button_link?.target,
  })),
})

export const fragment = graphql`
  fragment PageBodyFullViewportImage on Query {
    prismicPage(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPageBodyFullViewportImage {
            id
            primary {
              text_color
              button_color
              button_text_color
              font_family {
                text
              }
              text {
                text
                html
              }
              text_vertical_alignment
              image {
                alt
                localFile {
                  childImageSharp {
                    fluid(
                      maxWidth: 1000
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
            items {
              button_text {
                text
              }
              button_link {
                url
                target
              }
            }
          }
        }
      }
    }
  }
`

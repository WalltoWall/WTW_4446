import React from 'react'
import { graphql } from 'gatsby'
import { camelCase } from 'tiny-compose-fns'
import { notEmpty, getImageFluid } from 'helpers'

import { Box, Image } from 'system'

const variants = {
  autoHeight: { imageHeight: 'auto' },
  fullViewportHeight: { imageHeight: '100vh' },
}

export const PageBodyFullWidthImage = ({
  variant: variantName = 'autoHeight',
  imageFluid,
  imageURL,
  imageAlt,
  ...props
}) => {
  const variant = variants[variantName]

  return (
    <Box as="section" {...props}>
      <Image
        fluid={imageFluid}
        src={imageURL}
        alt={imageAlt}
        height={variant.imageHeight}
      />
    </Box>
  )
}

PageBodyFullWidthImage.mapDataToProps = ({ data }) => ({
  variant: notEmpty(camelCase(data?.primary?.variant)),
  imageFluid: getImageFluid(data?.primary?.image),
  imageURL: data?.primary?.image?.url,
  imageAlt: data?.primary?.image?.alt,
})

export const fragment = graphql`
  fragment PageBodyFullWidthImage on Query {
    prismicPage(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPageBodyFullWidthImage {
            id
            primary {
              variant
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
          }
        }
      }
    }
  }
`

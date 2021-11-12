import React from 'react'
import { graphql } from 'gatsby'
import { camelCase } from 'tiny-compose-fns'
import { notEmpty } from 'helpers'

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
  mobileImageFluid,
  mobileImageURL,
  mobileImageAlt,
  ...props
}) => {
  const variant = variants[variantName]

  return null

  return (
    <Box as="section" {...props}>
      <Image
        display={[null, 'none']}
        fluid={mobileImageFluid}
        src={mobileImageURL}
        alt={mobileImageAlt}
        height={variant.imageHeight}
      />

      <Image
        // display={['none', 'block']}
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
  imageFluid: data?.primary?.image?.fluid,
  imageURL: data?.primary?.image?.url,
  imageAlt: data?.primary?.image?.alt,
  mobileImageFluid: data?.primary?.image?.thumbnails?.Tablet?.fluid,
  mobileImageURL: data?.primary?.image?.thumbnails?.Tablet?.url,
  mobileImageAlt: data?.primary?.image?.thumbnails?.Tablet?.alt,
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
                fluid(maxWidth: 1000) {
                  ...GatsbyPrismicImageFluid
                }
                thumbnails {
                  Tablet {
                    alt
                    fluid(maxWidth: 600) {
                      ...GatsbyPrismicImageFluid
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

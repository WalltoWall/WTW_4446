import React from 'react'
import { graphql } from 'gatsby'
import { getImageFluid } from 'helpers'

import { ImageContainer, Image } from 'system'

export const PageBodyFullViewportImage = ({
  imageFluid,
  imageURL,
  imageAlt,
  ...props
}) => (
  <ImageContainer height="100vh">
    <Image
      fluid={imageFluid}
      src={imageURL}
      alt={imageAlt}
      {...props}
      css={{ userSelect: 'none', pointerEvents: 'none' }}
    />
  </ImageContainer>
)

PageBodyFullViewportImage.mapDataToProps = ({ data }) => ({
  imageFluid: getImageFluid(data?.primary?.image),
  imageURL: data?.primary?.image?.url,
  imageAlt: data?.primary?.image?.alt,
})

export const fragment = graphql`
  fragment PageBodyFullViewportImage on Query {
    prismicPage(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPageBodyFullViewportImage {
            id
            primary {
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

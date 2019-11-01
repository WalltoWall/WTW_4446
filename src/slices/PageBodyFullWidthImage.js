import React from 'react'
import { graphql } from 'gatsby'
import { getImageFluid } from 'helpers'

import { Image } from 'system'

export const PageBodyFullWidthImage = ({
  imageFluid,
  imageURL,
  imageAlt,
  ...props
}) => (
  <Image
    fluid={imageFluid}
    src={imageURL}
    alt={imageAlt}
    height="auto"
    {...props}
  />
)

PageBodyFullWidthImage.mapDataToProps = ({ data }) => ({
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

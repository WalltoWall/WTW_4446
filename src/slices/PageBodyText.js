import React from 'react'
import { graphql } from 'gatsby'
import { getRichText, getImageFluid, propPairsEq } from 'helpers'

import { safeHexToP3 } from 'src/helpers'

import { Grid, Flex, Image } from 'system'
import { BoundedBox, HTMLContent, Heading } from 'src/components'

export const PageBodyText = ({
  children,
  backgroundColor = 'white',
  linkColor = 'inherit',
  headingColor = 'inherit',
  textColor = 'inherit',
  fontFamily = 'inherit',
  headingImageFluid,
  headingImageURL,
  headingImageAlt,
  headingImageWidth,
  heading,
  textHTML,
  ...props
}) => {
  const hasHeadingImage = headingImageFluid ?? headingImageURL

  const backgroundColorP3 = safeHexToP3(backgroundColor)
  const headingColorP3 = safeHexToP3(headingColor)
  const textColorP3 = safeHexToP3(textColor)
  const linkColorP3 = safeHexToP3(linkColor)

  return (
    <BoundedBox as="section" bg={backgroundColorP3} maxWidth="l" {...props}>
      <Grid
        gridColumnGapScale="l"
        gridRowGapScale="s"
        alignItems="baseline"
        gridTemplateColumns={['repeat(8, 1fr)', 'repeat(12, 1fr)']}
      >
        <Heading gridColumn={['1 / -1', '1 / span 4']} color={headingColorP3}>
          {heading}
        </Heading>
        <HTMLContent
          gridColumn={['1 / -2', '5 / span 8']}
          html={textHTML}
          color={textColorP3}
          fontFamily={fontFamily}
        />
      </Grid>
    </BoundedBox>
  )

  return (
    <BoundedBox bg={backgroundColorP3} as="section" maxWidth="s" {...props}>
      <Flex flexDirection="column">
        {hasHeadingImage ? (
          <Image
            fluid={headingImageFluid}
            src={headingImageURL}
            alt={headingImageAlt}
            width={headingImageWidth}
            height="auto"
            alignSelf="center"
            mbScale="m"
          />
        ) : (
          heading && <Heading mbScale="l">{heading}</Heading>
        )}
        {children ||
          (textHTML && (
            <HTMLContent
              html={textHTML}
              color={textColorP3}
              textAlign="center"
              fontFamily={fontFamily}
              componentOverrides={{
                a: Comp => props => <Comp color={linkColorP3} {...props} />,
              }}
            />
          ))}
      </Flex>
    </BoundedBox>
  )
}

PageBodyText.mapDataToProps = ({ data, context, nextContext }) => ({
  nextSharesBg: propPairsEq('bg', context, nextContext),
  backgroundColor: data?.primary?.background_color,
  headingColor: data?.primary?.heading_color,
  textColor: data?.primary?.text_color,
  linkColor: data?.primary?.link_color,
  fontFamily: data?.primary?.font_family?.text,
  headingImageFluid: getImageFluid(data?.primary?.heading_image),
  headingImageURL: data?.primary?.heading_image?.url,
  headingImageAlt: data?.primary?.heading_image?.alt,
  headingImageWidth: data?.primary?.heading_image?.dimensions?.width / 3,
  heading: data?.primary?.heading?.text,
  textHTML: getRichText(data?.primary?.text),
})

PageBodyText.mapDataToContext = ({ data }) => ({
  bg: data?.primary?.background_color,
})

export const fragment = graphql`
  fragment PageBodyText on Query {
    prismicPage(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPageBodyText {
            id
            primary {
              background_color
              heading_color
              text_color
              link_color
              font_family {
                text
              }
              heading_image {
                alt
                dimensions {
                  width
                }
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
              heading {
                text
              }
              text {
                text
                html
              }
            }
          }
        }
      }
    }
  }
`

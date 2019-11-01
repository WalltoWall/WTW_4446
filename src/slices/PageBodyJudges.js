import React from 'react'
import { graphql } from 'gatsby'
import { camelCase } from 'tiny-compose-fns'
import { getRichText, getImageFluid, propPairsEq } from 'helpers'

import { safeHexToP3 } from 'src/helpers'

import { Grid, Flex, Image, Text } from 'system'
import { BoundedBox, HTMLContent, Heading } from 'src/components'

export const PageBodyJudges = ({
  children,
  backgroundColor = 'white',
  linkColor = 'inherit',
  textColor = 'black',
  fontFamily = 'inherit',
  headingImageFluid,
  headingImageURL,
  headingImageAlt,
  headingImageWidth,
  heading,
  ...props
}) => {
  const hasHeadingImage = headingImageFluid ?? headingImageURL

  const backgroundColorP3 = safeHexToP3(backgroundColor)
  const textColorP3 = safeHexToP3(textColor)
  const linkColorP3 = safeHexToP3(linkColor)

  return (
    <Text as="section" fontFamily={fontFamily} color={textColorP3}>
      <BoundedBox bg={backgroundColorP3} textColor={textColorP3} {...props}>
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
          <Grid gridGapScale="l">{children}</Grid>
        </Flex>
      </BoundedBox>
    </Text>
  )
}

PageBodyJudges.Judge = ({
  imageSide = 'left',
  imageFluid,
  imageURL,
  imageAlt,
  textHTML,
  ...props
}) => {
  const isImageOnLeft = imageSide === 'left'

  return (
    <Grid
      gridTemplateColumns={['1fr', 'repeat(2, 1fr)']}
      gridGapScale="l"
      gridAutoFlow="dense"
      alignItems="center"
      {...props}
    >
      {(imageFluid || imageURL) && (
        <Image
          fluid={imageFluid}
          src={imageURL}
          alt={imageAlt}
          width="100%"
          height="auto"
          gridColumn={[null, isImageOnLeft ? 1 : 2]}
          maxWidth={['20rem', 'none']}
          mx="auto"
        />
      )}
      {textHTML && (
        <HTMLContent
          html={textHTML}
          gridColumn={[null, isImageOnLeft ? 2 : 1]}
          componentOverrides={{
            h1: Comp => props => <Comp fontSizeScale="l" {...props} />,
            h2: Comp => props => <Comp mbScale="s" {...props} />,
          }}
        />
      )}
    </Grid>
  )
}

PageBodyJudges.mapDataToProps = ({ data, context, nextContext }) => ({
  nextSharesBg: propPairsEq('bg', context, nextContext),
  backgroundColor: data?.primary?.background_color,
  textColor: data?.primary?.text_color,
  linkColor: data?.primary?.link_color,
  fontFamily: data?.primary?.font_family?.text,
  headingImageFluid: getImageFluid(data?.primary?.heading_image),
  headingImageURL: data?.primary?.heading_image?.url,
  headingImageAlt: data?.primary?.heading_image?.alt,
  headingImageWidth: data?.primary?.heading_image?.dimensions?.width / 3,
  heading: data?.primary?.heading?.text,
  children: data?.items?.map?.(item => (
    <PageBodyJudges.Judge
      imageSide={camelCase(item?.image_side)}
      imageFluid={getImageFluid(item?.image)}
      imageURL={item?.image?.url}
      imageAlt={item?.image?.alt}
      textHTML={getRichText(item?.text)}
    />
  )),
})

PageBodyJudges.mapDataToContext = ({ data }) => ({
  bg: data?.primary?.background_color,
})

export const fragment = graphql`
  fragment PageBodyJudges on Query {
    prismicPage(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPageBodyJudges {
            id
            primary {
              background_color
              text_color
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
            }
            items {
              text {
                text
                html
              }
              image_side
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

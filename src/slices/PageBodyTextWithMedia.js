import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { getRichText, propPairsEq } from 'helpers'

import { safeHexToP3 } from 'src/helpers'

import { ThemeProvider, Image, Box } from 'system'
import {
  BoundedBox,
  HTMLContent,
  StandardGrid,
  Subheading,
} from 'src/components'

export const PageBodyTextWithMedia = ({
  backgroundColor = 'white',
  linkColor = 'inherit',
  headlineColor = 'inherit',
  subheadlineColor = 'inherit',
  textColor = 'inherit',
  imageFluid,
  imageURL,
  imageAlt,
  textHTML,
  ...props
}) => {
  const theme = useMemo(
    () => ({
      colors: {
        background: safeHexToP3(backgroundColor),
        headline: safeHexToP3(headlineColor),
        subheadline: safeHexToP3(subheadlineColor),
        body: safeHexToP3(textColor),
        link: safeHexToP3(linkColor),
      },
    }),
    [backgroundColor, headlineColor, subheadlineColor, textColor, linkColor],
  )

  return (
    <ThemeProvider theme={theme}>
      <BoundedBox as="section" bg="background" {...props}>
        <StandardGrid gridAutoFlow="column dense" alignItems="start">
          <Box gridColumn={['1 / -1', null, '7 / -1']}>
            {imageFluid && (
              <Image
                fluid={imageFluid}
                src={imageURL}
                alt={imageAlt}
                objectFit="contain"
              />
            )}
          </Box>

          <HTMLContent
            gridColumn={['1 / -1', null, '1 / span 6']}
            html={textHTML}
            componentOverrides={{
              h2: () => props => (
                <Subheading
                  as={Subheading}
                  as="h4"
                  boxStyle="firstLastNoMargin"
                  myScale="m"
                  {...props}
                />
              ),
              a: Comp => props => <Comp mbScale="s" {...props} />,
            }}
          />
        </StandardGrid>
      </BoundedBox>
    </ThemeProvider>
  )
}

PageBodyTextWithMedia.mapDataToProps = ({ data, context, nextContext }) => ({
  nextSharesBg: propPairsEq('bg', context, nextContext),
  backgroundColor: data?.primary?.background_color,
  headlineColor: data?.primary?.headline_color,
  subheadlineColor: data?.primary?.subheadline_color,
  textColor: data?.primary?.text_color,
  linkColor: data?.primary?.link_color,
  textHTML: getRichText(data?.primary?.text),
  imageFluid: data?.primary?.image?.fluid,
  imageURL: data?.primary?.image?.url,
  imageAlt: data?.primary?.image?.alt,
})

PageBodyTextWithMedia.mapDataToContext = ({ data }) => ({
  bg: data?.primary?.background_color,
})

export const fragment = graphql`
  fragment PageBodyTextWithMedia on Query {
    prismicPage(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPageBodyTextWithMedia {
            id
            primary {
              background_color
              headline_color
              subheadline_color
              text_color
              link_color
              text {
                text
                html
              }
              image {
                alt
                fluid(maxWidth: 1000) {
                  ...GatsbyPrismicImageFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

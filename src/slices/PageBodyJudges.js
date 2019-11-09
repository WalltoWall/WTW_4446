import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { camelCase } from 'tiny-compose-fns'
import { notEmpty, getImageFluid, getRichText } from 'helpers'

import { safeHexToP3 } from 'src/helpers'

import { ThemeProvider, Grid } from 'system'
import { BoundedBox, StandardGrid, Heading, Judge } from 'src/components'

export const PageBodyJudges = ({
  backgroundColor = 'white',
  linkColor = 'inherit',
  headlineColor = 'inherit',
  buttonBackgroundColor = 'black',
  buttonColor = 'white',
  textColor = 'inherit',
  headline,
  children,
  ...props
}) => {
  const theme = useMemo(
    () => ({
      colors: {
        background: safeHexToP3(backgroundColor),
        body: safeHexToP3(textColor),
        button: safeHexToP3(buttonColor),
        buttonBackground: safeHexToP3(buttonBackgroundColor),
        headline: safeHexToP3(headlineColor),
        link: safeHexToP3(linkColor),
        subheadline: safeHexToP3(headlineColor),
      },
    }),
    [
      backgroundColor,
      textColor,
      buttonColor,
      buttonBackgroundColor,
      headlineColor,
      linkColor,
    ],
  )

  return (
    <ThemeProvider theme={theme}>
      <BoundedBox as="section" id="judges" bg="background" {...props}>
        <StandardGrid gridRowGapScale="xl">
          {headline && (
            <Heading gridColumn="1 / -1" textAlign="center" color="body">
              {headline}
            </Heading>
          )}
          <Grid
            gridColumn={['1 / -1', null, null, '2 / span 10']}
            gridGapScale="xl"
          >
            {children}
          </Grid>
        </StandardGrid>
      </BoundedBox>
    </ThemeProvider>
  )
}

PageBodyJudges.Judge = Judge

PageBodyJudges.mapDataToProps = ({ data }) => ({
  backgroundColor: data?.primary?.background_color,
  headlineColor: data?.primary?.headline_color,
  textColor: data?.primary?.text_color,
  linkColor: data?.primary?.link_color,
  buttonBackgroundColor: data?.primary?.button_background_color,
  buttonTextColor: data?.primary?.button_text_color,
  headline: data?.primary?.headline?.text,
  children: data?.items?.map(item => (
    <PageBodyJudges.Judge
      imageSide={notEmpty(camelCase(item?.image_side))}
      name={item?.name?.text}
      jobTitle={item?.job_title?.text}
      location={item?.location?.text}
      bioHTML={getRichText(item?.bio)}
      imageFluid={getImageFluid(item?.image)}
      imageURL={item?.image?.url}
      imageAlt={item?.image?.alt}
    />
  )),
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
              headline_color
              text_color
              link_color
              button_background_color
              button_text_color
              headline {
                text
              }
            }
            items {
              image_side
              name {
                text
              }
              job_title {
                text
              }
              location {
                text
              }
              bio {
                text
                html
              }
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

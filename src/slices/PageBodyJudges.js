import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { camelCase } from 'tiny-compose-fns'
import { notEmpty, getRichText } from 'helpers'

import { safeHexToP3 } from 'src/helpers'

import { ThemeProvider, Grid } from 'system'
import { BoundedBox, StandardGrid, Heading, Judge } from 'src/components'

export const PageBodyJudges = ({
  backgroundColor = 'white',
  linkColor = 'inherit',
  headlineColor = 'inherit',
  judgeHeadlineColor = 'inherit',
  judgeBackgroundColor = 'inherit',
  buttonBackgroundColor = 'black',
  buttonTextColor = 'white',
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
        button: safeHexToP3(buttonTextColor),
        buttonBackground: safeHexToP3(buttonBackgroundColor),
        headline: safeHexToP3(headlineColor),
        link: safeHexToP3(linkColor),
        subheadline: safeHexToP3(headlineColor),
      },
    }),
    [
      backgroundColor,
      textColor,
      buttonTextColor,
      buttonBackgroundColor,
      headlineColor,
      linkColor,
    ],
  )

  const judgeTheme = useMemo(
    () => ({
      colors: {
        background: safeHexToP3(judgeBackgroundColor),
        body: safeHexToP3(textColor),
        button: safeHexToP3(buttonTextColor),
        buttonBackground: safeHexToP3(buttonBackgroundColor),
        headline: safeHexToP3(judgeHeadlineColor),
        link: safeHexToP3(linkColor),
        subheadline: safeHexToP3(headlineColor),
      },
    }),
    [
      buttonBackgroundColor,
      buttonTextColor,
      headlineColor,
      judgeBackgroundColor,
      judgeHeadlineColor,
      linkColor,
      textColor,
    ],
  )

  return (
    <ThemeProvider theme={theme}>
      <BoundedBox as="section" bg="background" {...props}>
        <StandardGrid>
          {headline && (
            <Heading gridColumn="1 / -1" textAlign="center">
              {headline}
            </Heading>
          )}
          <Grid gridColumn="1 / -1" gridGapScale="xl">
            <ThemeProvider theme={judgeTheme}>{children}</ThemeProvider>
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
  judgeHeadlineColor: data?.primary?.judge_headline_color,
  judgeBackgroundColor: data?.primary?.judge_background_color,
  textColor: data?.primary?.text_color,
  linkColor: data?.primary?.link_color,
  buttonBackgroundColor: data?.primary?.button_background_color,
  buttonTextColor: data?.primary?.button_text_color,
  headline: data?.primary?.headline?.text,
  children: data?.items?.map((item, idx) => (
    <PageBodyJudges.Judge
      key={idx}
      imageSide={notEmpty(camelCase(item?.image_side))}
      name={item?.name?.text}
      jobTitle={item?.job_title?.text}
      location={item?.location?.text}
      bioHTML={getRichText(item?.bio)}
      imageFluid={item?.image?.fluid}
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
              judge_headline_color
              judge_background_color
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
                fluid(maxWidth: 800) {
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

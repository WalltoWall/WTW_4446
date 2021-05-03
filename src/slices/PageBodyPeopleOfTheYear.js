import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { camelCase } from 'tiny-compose-fns'
import { notEmpty, getRichText, propPairsEq } from 'helpers'

import { safeHexToP3 } from 'src/helpers'

import { ThemeProvider, Grid } from 'system'
import { BoundedBox, StandardGrid, Heading, HTMLContent } from 'src/components'
import { PersonOfTheYear } from '../components/PersonOfTheYear'

export const PageBodyPeopleOfTheYear = ({
  backgroundColor = 'white',
  headlineColor = 'inherit',
  introCopyColor = 'inherit',
  potyHeadlineColor = 'inherit',
  potyBackgroundColor = 'inherit',
  textColor = 'inherit',
  linkColor = 'inherit',
  buttonBackgroundColor = 'black',
  buttonTextColor = 'white',
  headline,
  introCopy,
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
        intro: safeHexToP3(introCopyColor),
        link: safeHexToP3(linkColor),
        subheadline: safeHexToP3(headlineColor),
      },
    }),
    [
      backgroundColor,
      textColor,
      introCopyColor,
      buttonTextColor,
      buttonBackgroundColor,
      headlineColor,
      linkColor,
    ],
  )

  const potyTheme = useMemo(
    () => ({
      colors: {
        background: safeHexToP3(potyBackgroundColor),
        body: safeHexToP3(textColor),
        button: safeHexToP3(buttonTextColor),
        buttonBackground: safeHexToP3(buttonBackgroundColor),
        headline: safeHexToP3(potyHeadlineColor),
        link: safeHexToP3(linkColor),
        subheadline: safeHexToP3(headlineColor),
      },
    }),
    [
      buttonBackgroundColor,
      buttonTextColor,
      headlineColor,
      potyHeadlineColor,
      potyBackgroundColor,
      linkColor,
      textColor,
    ],
  )

  return (
    <ThemeProvider theme={theme}>
      <BoundedBox as="section" bg="background" {...props}>
        <StandardGrid>
          {headline && (
            <Heading gridColumn="1 / -1" textAlign="center" color="headline">
              {headline}
            </Heading>
          )}
          {introCopy && (
            <HTMLContent
              color="intro"
              html={introCopy}
              gridColumn="1 / -1"
              textAlign="center"
              mbScale="m"
              maxWidth="60ch"
              mx="auto"
            />
          )}
          <Grid gridColumn="1 / -1" gridGapScale="xl">
            <ThemeProvider theme={potyTheme}>{children}</ThemeProvider>
          </Grid>
        </StandardGrid>
      </BoundedBox>
    </ThemeProvider>
  )
}

PageBodyPeopleOfTheYear.Person = PersonOfTheYear

PageBodyPeopleOfTheYear.mapDataToProps = ({ data, context, nextContext }) => ({
  nextSharesBg: propPairsEq('bg', context, nextContext),
  backgroundColor: data?.primary?.background_color,
  headlineColor: data?.primary?.headline_color,
  introCopyColor: data?.primary?.intro_copy_color,
  potyHeadlineColor: data?.primary?.poty_headline_color,
  potyBackgroundColor: data?.primary?.poty_background_color,
  textColor: data?.primary?.text_color,
  linkColor: data?.primary?.link_color,
  buttonBackgroundColor: data?.primary?.button_background_color,
  buttonTextColor: data?.primary?.button_text_color,
  headline: data?.primary?.headline?.text,
  introCopy: getRichText(data?.primary?.intro_copy),
  children: data?.items?.map((item, idx) => (
    <PageBodyPeopleOfTheYear.Person
      key={idx}
      imageSide={notEmpty(camelCase(item?.image_side))}
      award={item?.award?.text}
      name={item?.name?.text}
      location={item?.location?.text}
      textHTML={getRichText(item?.text)}
      imageFluid={item?.image?.fluid}
      imageURL={item?.image?.url}
      imageAlt={item?.image?.alt}
    />
  )),
})

PageBodyPeopleOfTheYear.mapDataToContext = ({ data }) => ({
  bg: data?.primary?.background_color,
})

export const fragment = graphql`
  fragment PageBodyPeopleOfTheYear on Query {
    prismicPage(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPageBodyPeopleOfTheYear {
            id
            primary {
              background_color
              headline_color
              intro_copy_color
              poty_headline_color
              poty_background_color
              text_color
              link_color
              button_background_color
              button_text_color
              headline {
                text
              }
              intro_copy {
                text
                html
              }
            }
            items {
              image_side
              award {
                text
              }
              name {
                text
              }
              location {
                text
              }
              text {
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

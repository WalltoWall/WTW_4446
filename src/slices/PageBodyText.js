import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { getRichText, propPairsEq } from 'helpers'

import { safeHexToP3 } from 'src/helpers'

import { Grid, Link, ThemeProvider } from 'system'
import {
  BoundedBox,
  HTMLContent,
  StandardGrid,
  Button,
  Subheading,
} from 'src/components'

export const PageBodyText = ({
  backgroundColor = 'white',
  linkColor = 'inherit',
  headlineColor = 'inherit',
  subheadlineColor = 'inherit',
  buttonBackgroundColor = 'black',
  buttonColor = 'white',
  textColor = 'inherit',
  textHTML,
  buttons,
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
        buttonBackground: safeHexToP3(buttonBackgroundColor),
        button: safeHexToP3(buttonColor),
      },
    }),
    [
      backgroundColor,
      headlineColor,
      subheadlineColor,
      textColor,
      linkColor,
      buttonBackgroundColor,
      buttonColor,
    ],
  )

  return (
    <ThemeProvider theme={theme}>
      <BoundedBox as="section" bg="background" {...props}>
        <StandardGrid>
          <HTMLContent
            gridColumn={['1 / -1', null, '1 / span 9']}
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
            }}
          />
          {buttons && (
            <Grid
              justifyContent="start"
              gridGapScale="s"
              gridRow={[null, null, 2]}
            >
              {buttons}
            </Grid>
          )}
        </StandardGrid>
      </BoundedBox>
    </ThemeProvider>
  )
}

PageBodyText.mapDataToProps = ({ data, context, nextContext }) => ({
  nextSharesBg: propPairsEq('bg', context, nextContext),
  backgroundColor: data?.primary?.background_color,
  headlineColor: data?.primary?.headline_color,
  subheadlineColor: data?.primary?.subheadline_color,
  textColor: data?.primary?.text_color,
  linkColor: data?.primary?.link_color,
  buttonBackgroundColor: data?.primary?.button_background_color,
  buttonColor: data?.primary?.button_text_color,
  textHTML: getRichText(data?.primary?.text),
  buttons: data?.items
    ?.filter?.(item => item?.button_link?.url)
    ?.map?.(item => (
      <Button
        as={Link}
        href={item?.button_link?.url}
        target={item?.button_link?.target}
      >
        {item?.button_text?.text}
      </Button>
    )),
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
              headline_color
              subheadline_color
              text_color
              link_color
              button_background_color
              button_text_color
              text {
                text
                html
              }
            }
            items {
              button_text {
                text
              }
              button_link {
                url
                target
              }
            }
          }
        }
      }
    }
  }
`

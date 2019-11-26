import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { getRichText, propPairsEq } from 'helpers'

import { safeHexToP3 } from 'src/helpers'

import { ThemeProvider, Box, Grid, Link } from 'system'
import {
  BoundedBox,
  HTMLContent,
  StandardGrid,
  Subheading,
  Button,
} from 'src/components'

export const PageBodyEventDetails = ({
  backgroundColor = 'white',
  linkColor = 'inherit',
  headlineColor = 'inherit',
  subheadlineColor = 'inherit',
  buttonBackgroundColor = 'black',
  buttonColor = 'white',
  textColor = 'inherit',
  textHTML,
  details = [],
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
      buttonBackgroundColor,
      buttonColor,
      headlineColor,
      linkColor,
      subheadlineColor,
      textColor,
    ],
  )

  return (
    <ThemeProvider theme={theme}>
      <BoundedBox as="section" id="event-details" bg="background" {...props}>
        <StandardGrid alignItems="baseline" gridRowGapScale="xl">
          <HTMLContent
            gridColumn={['1 / -1', '1 / span 9']}
            html={textHTML}
            maxWidth="xl"
          />
          <Grid
            as="dl"
            gridGapScale="l"
            gridTemplateColumns={['1fr', 'repeat(2, 1fr)']}
            gridColumn="1 / -1"
            alignContent="start"
          >
            {details.map(detail => (
              <Box key={detail.name}>
                <Subheading as="dt" mbScale="t-">
                  {detail.name}
                </Subheading>
                <HTMLContent
                  html={detail.textHTML}
                  fontSizeScale="s"
                  width={5 / 6}
                  componentOverrides={{
                    h3: Comp => props => <Comp as="p" mbScale="t" {...props} />,
                    a: () => props => (
                      <Button as={Link} mrScale="s" mbScale="s" {...props} />
                    ),
                  }}
                />
              </Box>
            ))}
          </Grid>
        </StandardGrid>
      </BoundedBox>
    </ThemeProvider>
  )
}

PageBodyEventDetails.mapDataToProps = ({ data, context, nextContext }) => ({
  nextSharesBg: propPairsEq('bg', context, nextContext),
  backgroundColor: data?.primary?.background_color,
  headlineColor: data?.primary?.headline_color,
  subheadlineColor: data?.primary?.subheadline_color,
  textColor: data?.primary?.text_color,
  linkColor: data?.primary?.link_color,
  buttonBackgroundColor: data?.primary?.button_background_color,
  buttonColor: data?.primary?.button_text_color,
  textHTML: getRichText(data?.primary?.text),
  buyTicketsHref: data?.primary?.buy_tickets_link?.url,
  details: data?.items
    ?.map(item => ({
      name: item?.detail_name?.text,
      textHTML: getRichText(item?.detail_text),
    }))
    .filter(item => item.name || item.textHTML),
})

PageBodyEventDetails.mapDataToContext = ({ data }) => ({
  bg: data?.primary?.background_color,
})

export const fragment = graphql`
  fragment PageBodyEventDetails on Query {
    prismicPage(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPageBodyEventDetails {
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
              buy_tickets_link {
                url
              }
            }
            items {
              detail_name {
                text
              }
              detail_text {
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

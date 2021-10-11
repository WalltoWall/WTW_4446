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
  Heading,
  Button,
} from 'src/components'

export const PageBodyEntryDetails = ({
  backgroundColor = 'white',
  linkColor = 'inherit',
  headlineColor = 'inherit',
  subheadlineColor = 'inherit',
  deadlineHeadlineColor = 'inherit',
  buttonBackgroundColor = 'black',
  buttonColor = 'white',
  textColor = 'inherit',
  textHTML,
  entryBookletButtonHref,
  entryBookletButtonText = 'Download Entry Booklet',
  onlineEntryButtonHref,
  onlineEntryButtonText = 'Enter Online',
  deadlines = [],
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
      <BoundedBox as="section" id="entry-details" bg="background" {...props}>
        <StandardGrid alignItems="baseline" gridRowGapScale="l">
          <HTMLContent
            gridColumn={['1 / -1', '1 / span 6']}
            gridRow={[null, '1']}
            html={textHTML}
            componentOverrides={{
              h1: Comp => props => <Comp width={[null, 5 / 6]} {...props} />,
            }}
          />
          <Grid
            as="dl"
            gridGapScale="m"
            gridColumn={['1 / -1', '7 / span 6']}
            gridRow={[null, '1 / span 2']}
            alignContent="start"
          >
            {deadlines.map(deadline => (
              <Box key={deadline.name}>
                <Subheading as="dt" mbScale="t-">
                  {deadline.name}
                </Subheading>
                <Heading as="dd" color="body" color={deadlineHeadlineColor}>
                  {deadline.date}
                </Heading>
              </Box>
            ))}
          </Grid>
          <Grid
            as="ul"
            gridGapScale="s"
            gridColumn={['1 / -1', '1 / span 6']}
            gridRow={[null, '2']}
            alignItems="start"
            justifyItems="start"
          >
            {entryBookletButtonHref && (
              <Button as={Link} href={entryBookletButtonHref} target="_blank">
                {entryBookletButtonText}
              </Button>
            )}
            {onlineEntryButtonHref && (
              <Button as={Link} href={onlineEntryButtonHref} target="_blank">
                {onlineEntryButtonText}
              </Button>
            )}
          </Grid>
        </StandardGrid>
      </BoundedBox>
    </ThemeProvider>
  )
}

PageBodyEntryDetails.mapDataToProps = ({ data, context, nextContext }) => ({
  nextSharesBg: propPairsEq('bg', context, nextContext),
  backgroundColor: data?.primary?.background_color,
  headlineColor: data?.primary?.headline_color,
  subheadlineColor: data?.primary?.subheadline_color,
  deadlineHeadlineColor: data?.primary?.deadline_headline_color,
  textColor: data?.primary?.text_color,
  linkColor: data?.primary?.link_color,
  buttonBackgroundColor: data?.primary?.button_background_color,
  buttonColor: data?.primary?.button_text_color,
  textHTML: getRichText(data?.primary?.text),
  entryBookletButtonHref: data?.primary?.entry_booklet_button_link?.url,
  entryBookletButtonText: data?.primary?.entry_booklet_button_text?.text,
  onlineEntryButtonHref: data?.primary?.online_entry_button_link?.url,
  onlineEntryButtonText: data?.primary?.online_entry_button_text?.text,
  deadlines: data?.items
    ?.map(item => ({
      name: item?.deadline_name?.text,
      date: item?.deadline_date?.text,
    }))
    .filter(item => item.name || item.date),
})

PageBodyEntryDetails.mapDataToContext = ({ data }) => ({
  bg: data?.primary?.background_color,
})

export const fragment = graphql`
  fragment PageBodyEntryDetails on Query {
    prismicPage(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPageBodyEntryDetails {
            id
            primary {
              background_color
              headline_color
              subheadline_color
              deadline_headline_color
              text_color
              link_color
              button_background_color
              button_text_color
              text {
                text
                html
              }
              entry_booklet_button_link {
                url
              }
              entry_booklet_button_text {
                text
              }
              online_entry_button_link {
                url
              }
              online_entry_button_text {
                text
              }
            }
            items {
              deadline_name {
                text
              }
              deadline_date {
                text
              }
            }
          }
        }
      }
    }
  }
`

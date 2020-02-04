import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { getRichText, propPairsEq } from 'helpers'

import { safeHexToP3 } from 'src/helpers'

import { ThemeProvider, Box, Flex, Link } from 'system'
import { BoundedBox, HTMLContent, StandardGrid, Button } from 'src/components'

export const PageBodyPastYears = ({
  backgroundColor = 'white',
  headlineColor = 'inherit',
  buttonBackgroundColor = 'black',
  buttonColor = 'white',
  textHTML,
  children,
  ...props
}) => {
  const theme = useMemo(
    () => ({
      colors: {
        background: safeHexToP3(backgroundColor),
        headline: safeHexToP3(headlineColor),
        buttonBackground: safeHexToP3(buttonBackgroundColor),
        button: safeHexToP3(buttonColor),
      },
    }),
    [backgroundColor, buttonBackgroundColor, buttonColor, headlineColor],
  )

  const childrenCount = React.Children.count(children)

  return (
    <ThemeProvider theme={theme}>
      <BoundedBox as="section" bg="background" {...props}>
        <StandardGrid>
          {textHTML && (
            <HTMLContent
              gridColumn="1 / -1"
              html={textHTML}
              textAlign="center"
            />
          )}
          {children && (
            <Flex
              gridColumn="1 / -1"
              justifyContent={[
                childrenCount < 2 ? 'center' : null,
                childrenCount < 3 ? 'center' : null,
                childrenCount < 4 ? 'center' : null,
              ]}
              mrScale="-s"
              mbScale="-s"
              flexWrap="wrap"
            >
              {React.Children.map(
                children,
                child =>
                  child && (
                    <Box prScale="s" pbScale="s" width={[1 / 2, 1 / 3, 1 / 4]}>
                      {child}
                    </Box>
                  ),
              )}
            </Flex>
          )}
        </StandardGrid>
      </BoundedBox>
    </ThemeProvider>
  )
}

PageBodyPastYears.Button = ({ target = '_blank', ...props }) => (
  <Button as={Link} target={target} fontSizeScale="l" width="100%" {...props} />
)

PageBodyPastYears.mapDataToProps = ({ data, context, nextContext }) => ({
  nextSharesBg: propPairsEq('bg', context, nextContext),
  backgroundColor: data?.primary?.background_color,
  headlineColor: data?.primary?.headline_color,
  buttonBackgroundColor: data?.primary?.button_background_color,
  buttonColor: data?.primary?.button_text_color,
  textHTML: getRichText(data?.primary?.text),
  children: data?.items?.map(item => (
    <PageBodyPastYears.Button
      href={item?.button_link?.url}
      target={item?.button_link?.target || undefined}
    >
      {item?.button_text?.text}
    </PageBodyPastYears.Button>
  )),
})

PageBodyPastYears.mapDataToContext = ({ data }) => ({
  bg: data?.primary?.background_color,
})

export const fragment = graphql`
  fragment PageBodyPastYears on Query {
    prismicPage(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPageBodyPastYears {
            id
            primary {
              background_color
              headline_color
              button_background_color
              button_text_color
              text {
                text
                html
              }
            }
            items {
              button_link {
                url
                target
              }
              button_text {
                text
              }
            }
          }
        }
      }
    }
  }
`

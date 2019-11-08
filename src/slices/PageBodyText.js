import React from 'react'
import { graphql } from 'gatsby'
import { getRichText, propPairsEq } from 'helpers'

import { safeHexToP3 } from 'src/helpers'

import { BoundedBox, HTMLContent, StandardGrid } from 'src/components'

export const PageBodyText = ({
  backgroundColor = 'white',
  linkColor = 'inherit',
  headlineColor = 'inherit',
  textColor = 'inherit',
  fontFamily = 'inherit',
  textHTML,
  ...props
}) => {
  const backgroundColorP3 = safeHexToP3(backgroundColor)
  const headlineColorP3 = safeHexToP3(headlineColor)
  const textColorP3 = safeHexToP3(textColor)
  const linkColorP3 = safeHexToP3(linkColor)

  return (
    <BoundedBox as="section" bg={backgroundColorP3} {...props}>
      <StandardGrid>
        <HTMLContent
          gridColumn={['1 / -1', null, '1 / span 9']}
          html={textHTML}
          color={textColorP3}
          componentOverrides={{
            h1: Comp => props => <Comp color={headlineColorP3} {...props} />,
            a: Comp => props => <Comp color={linkColorP3} {...props} />,
          }}
        />
      </StandardGrid>
    </BoundedBox>
  )
}

PageBodyText.mapDataToProps = ({ data, context, nextContext }) => ({
  nextSharesBg: propPairsEq('bg', context, nextContext),
  backgroundColor: data?.primary?.background_color,
  headlineColor: data?.primary?.headline_color,
  textColor: data?.primary?.text_color,
  linkColor: data?.primary?.link_color,
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
              headline_color
              text_color
              link_color
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

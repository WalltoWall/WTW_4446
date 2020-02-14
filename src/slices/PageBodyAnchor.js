import React from 'react'
import { graphql } from 'gatsby'

export const PageBodyAnchor = ({ id, ...props }) => {
  return id && <div id={id} {...props} />
}

PageBodyAnchor.mapDataToProps = ({ data }) => ({
  id: data?.primary?.anchor_id,
})

PageBodyAnchor.mapDataToContext = ({ data }) => ({
  bg: data?.primary?.background_color,
})

export const fragment = graphql`
  fragment PageBodyAnchor on Query {
    prismicPage(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPageBodyAnchor {
            id
            primary {
              anchor_id
            }
          }
        }
      }
    }
  }
`

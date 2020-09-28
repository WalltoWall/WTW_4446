/**
 * Reusable GraphQL queries used to query Gatsby's data store. Fragments defined
 * in this file will be available in any Gatsby `graphql` query due to Gatsby's query
 * hoisting at build time.
 *
 * @see https://www.gatsbyjs.org/docs/graphql-concepts/#advanced - Gatsby's docs on Fragment usage.
 */

import { graphql } from 'gatsby'

export const PrismicPageParentRecursive = graphql`
  fragment PrismicPageParentRecursive on PrismicPage {
    ...PrismicPageParentFields
    data {
      parent {
        document {
          ... on PrismicPage {
            ...PrismicPageParentFields
            data {
              parent {
                document {
                  ... on PrismicPage {
                    ...PrismicPageParentFields
                    data {
                      parent {
                        document {
                          ... on PrismicPage {
                            ...PrismicPageParentFields
                            data {
                              parent {
                                document {
                                  ... on PrismicPage {
                                    ...PrismicPageParentFields
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
              }
            }
          }
        }
      }
    }
  }
  fragment PrismicPageParentFields on PrismicPage {
    uid
    url
    data {
      title {
        text
      }
    }
  }
`

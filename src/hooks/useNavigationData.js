import { useStaticQuery, graphql } from 'gatsby'

export const useNavigationData = uid => {
  const queryData = useStaticQuery(graphql`
    {
      allPrismicNavigation {
        nodes {
          uid
          data {
            body {
              ... on PrismicNavigationBodyNavItem {
                id
                primary {
                  name
                  link {
                    url
                    target
                  }
                }
                items {
                  name
                  link {
                    url
                    target
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const normalized = queryData.allPrismicNavigation.nodes.reduce(
    (acc, node) => {
      acc[node.uid] = { ...node, items: node.data.body }
      return acc
    },
    {},
  )

  if (uid) return normalized[uid]

  return normalized
}

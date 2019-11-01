import { useStaticQuery, graphql } from 'gatsby'

export const useSettingsData = () => {
  const queryData = useStaticQuery(graphql`
    {
      prismicSettings {
        data {
          site_name {
            html
            text
          }
          site_description {
            html
            text
          }
          site_copyright {
            html
            text
          }
          facebook_handle {
            text
          }
          twitter_handle {
            text
          }
          instagram_handle {
            text
          }
        }
      }
    }
  `)

  return queryData.prismicSettings?.data
}

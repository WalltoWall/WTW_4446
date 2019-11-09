import { useStaticQuery, graphql } from 'gatsby'

export const useSettingsData = () => {
  const queryData = useStaticQuery(graphql`
    {
      prismicSettings {
        data {
          site_name {
            text
          }
          site_description {
            text
          }
          aaf_hawaii_link {
            url
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

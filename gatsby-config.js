// Load .env file.
require('dotenv').config()

// Configure the following constants for the project.
const SITE_TITLE = 'Pele Awards'
const SITE_TITLE_SHORT = 'Peles'
const SITE_DESCRIPTION =
  'The Pele Awards is one of 15 District Competitions for the American Advertising Awards recognizing the best advertising and creative design work in Hawai‘i.'
const SITE_URL = 'https://peleawards.com'

const siteMetadata = {
  title: 'Pele Awards',
  titleShort: 'Peles',
  description:
    'The Pele Awards is one of 15 District Competitions for the American Advertising Awards recognizing the best advertising and creative design work in Hawai‘i.',
  siteUrl: 'https://hawaiinational.bank',
}

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-react-helmet-async',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-svgr',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-treat',
    process.env.GOOGLE_TAGMANAGER_ID && {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: process.env.GOOGLE_TAGMANAGER_ID,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.titleShort,
        start_url: '/',
        background_color: '#000000',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: path.resolve(__dirname, 'src/assets/manifest-icon.png'),
      },
    },
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: process.env.GATSBY_PRISMIC_REPOSITORY_NAME,
        accessToken: process.env.GATSBY_PRISMIC_ACCESS_TOKEN,
        schemas: require('./src/schemas'),
        linkResolver: require('./src/linkResolver').linkResolver,
        fetchLinks: ['page.parent'],
        prismicToolbar: 'legacy',
      },
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/*': [
            'X-Frame-Options: SAMEORIGIN',
            'X-XSS-Protection: 1; mode=block',
            'X-Content-Type-Options: nosniff',
            'Referrer-Policy: strict-origin',
            'Access-Control-Allow-Origin: *',
          ],
        },
        mergeSecurityHeaders: false,
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        helpers: '@walltowall/helpers',
        system: '@walltowall/system/gatsby',
        reference: '@walltowall/gatsby-theme-ww-reference',
        hooks: '@walltowall/hooks',
        'gatsby-theme-ww-prismic': '@walltowall/gatsby-theme-ww-prismic',
      },
    },
  ].filter(Boolean),
}

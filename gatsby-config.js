const path = require('path')

// Load .env file.
require('dotenv').config()

const siteMetadata = {
  title: 'Pele Awards',
  titleShort: 'Peles',
  description:
    'The Pele Awards is one of 15 District Competitions for the American Advertising Awards recognizing the best advertising and creative design work in Hawai‘i.',
  siteUrl: 'https://peleawards.com',
}

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-react-helmet-async',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-svgr',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-styled-components',
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
        src: path.resolve(__dirname, 'src'),
      },
    },
  ].filter(Boolean),
}

// Load .env file.
require('dotenv').config()

// Configure the following constants for the project.
const SITE_TITLE = 'SITE_TITLE'
const SITE_TITLE_SHORT = 'SITE_TITLE_SHORT'
const SITE_DESCRIPTION = 'SITE_DESCRIPTION'
const SITE_URL = 'https://example.com'

// Load Primsic custom type schemas.
const schemas = require('./src/schemas')

module.exports = {
  plugins: [
    {
      resolve: '@walltowall/gatsby-theme-ww-base',
      options: {
        root: __dirname,
        siteTitle: SITE_TITLE,
        siteTitleShort: SITE_TITLE_SHORT,
        siteDescription: SITE_DESCRIPTION,
        siteUrl: SITE_URL,
        withNetlify: true,
      },
    },
    {
      resolve: '@walltowall/gatsby-theme-ww-prismic',
      options: {
        root: __dirname,
        repositoryName: process.env.GATSBY_PRISMIC_REPOSITORY_NAME,
        accessToken: process.env.GATSBY_PRISMIC_ACCESS_TOKEN,
        schemas,
        defaultTemplate: 'page',
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
  ],
}

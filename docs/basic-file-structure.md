# File Structure

The following files and directories form the basic organization for code in this
project.

- `gatsby-config.js`

  List of Gatsby plugins each with its own set of configuration. See the
  official [Gatsby Config][gatsby-config-docs] documentation for more details.

  This contains Wall-to-Wall's themes like the following:

  - [`gatsby-theme-ww-base`][gatsby-theme-ww-base]
  - [`gatsby-theme-ww-prismic`][gatsby-theme-ww-prismic]
  - [`gatsby-theme-ww-reference`][gatsby-theme-ww-reference]

- `gatsby-node.js` (optional)

  Programatically generates all pages for the project. See the official Gatsby
  [Creating a modifying pages][gatsby-node-docs] documentation for more details.

  **Note**: Not all projects will contain this file. The above mentioned themes
  already contain the most common functionality needed without creating a
  project-specific `gatsby-node.js` file.

- `gatsby-browser.js`

  JavaScript injected into the browser for each page. This is typically used for
  polyfills and/or hooking into Gatsby-specific events. See the official [Gatsby
  Browser APIs][gatsby-browser-docs] documentation for more details.

- `.env`

  List of environment variables needed to run the project. Variables here are
  reserved for sensitive data like API keys and passwords.

- `reference/`

  Client-facing reference documentation on updating and maintaining the site.
  See [`gatsby-theme-ww-reference`][gatsby-theme-ww-reference] for more details.

- `src/`

  Source code for the site.

  - `src/assets/`

    Static images, fonts, audio/video files, etc. used for the site. This folder
    is provided to [`gatsby-source-filesystem`][gatsby-source-filesystem] to
    allow [`gatsby-image`][gatsby-image] integration.

  - `src/components/`

    Reusable React components used in the main layout and slices.

  - `src/pages/`

    Pages not generated from the CMS such as site-wide search or page-specific
    CMS content overrides. See [Overriding Pages and
    Slices][guide-overriding-pages-and-slices] for more details.

  - `src/hooks/` (optional)

    Reusable React hooks used in components and slices.

  - `src/queries/` (optional)

    Reusable GraphQL queries used to query Gatsby's data store. Files with a
    `.graphql` extension will typically be used in `gatsby-node.js` while files
    with a `.js` extension will be loaded with Gatsby's `grahpql` function to be
    used as fragments.

  - `src/schemas/`

    Prismic Custom Type JSON definition files copied from Prismic. These files
    should mirror the configuration in the Prismic CMS to track changes. This
    must be updated manually.

  - `src/slices/`

    React components used for Slices. See the [Slices](concept-slices.md)
    concept documentation for more details.

    - `src/slices/PageBody.js`

      Root Slices file where are Page Body Slices are registered for use in the
      main page template. See the [Create a Slice](guide-create-a-slice.md)
      guide for more details.

  - `src/templates/`

    Reusable React components used as templates for pages. If using
    `gatsby-theme-ww-prismic`, see the [`templates` theme
    option][gatsby-theme-ww-prismic] for more details on how to use templates.

  - `src/helpers.js` (optional)

    Collection of small helpers functions for data management. Each function in
    this file should contain a description of its usage and purpose.

    **Note**: Not all projects will contain this file. Many common helpers are
    available in the [`@walltowall/helpers`][helpers] package.

  - `src/index.css` (optional)

    Global site-wide CSS styles typically used for resets or external fonts.

    **Note**: this project uses [`minireset.css`][minireset-css] as a browser
    CSS reset.

  - `src/theme.js`

    Color, font family, and sizing definitions for use in styling with
    [`@walltowall/system`][system].

  - `src/wrapWithProviders.js`

    Function used to wrap the site with React Context providers. This is used in
    `gatsby-browser.js` and `gatsby-ssr.js` with Gatsby's
    [`wrapRootElement`][gatsby-wrap-root-element] API.

- `static/`

  Static files added to the built version of the site.

  - `static/email/`

    HTML email templates used for [Netlify Identity][netlify-identity]. This is
    used by [`gatsby-theme-ww-reference`][gatsby-theme-ww-reference] to
    password-protect the client documentation.

[gatsby-browser-docs]: https://www.gatsbyjs.org/docs/browser-apis/
[gatsby-config-docs]: https://www.gatsbyjs.org/docs/gatsby-config/
[gatsby-image]: https://www.gatsbyjs.org/packages/gatsby-image/
[gatsby-node-docs]:
  https://www.gatsbyjs.org/docs/creating-and-modifying-pages/#creating-pages-in-gatsby-nodejs
[gatsby-source-filesystem]:
  https://www.gatsbyjs.org/packages/gatsby-source-filesystem/
[gatsby-theme-ww-base]: https://github.com/WalltoWall/gatsby-theme-ww-base
[gatsby-theme-ww-prismic]: https://github.com/WalltoWall/gatsby-theme-ww-prismic
[gatsby-theme-ww-reference]:
  https://github.com/WalltoWall/gatsby-theme-ww-reference
[gatsby-wrap-root-element]:
  https://www.gatsbyjs.org/docs/browser-apis/#wrapRootElement
[guide-overriding-pages-and-slices]: ./guide-overriding-pages-and-slices
[helpers]: https://github.com/WalltoWall/helpers
[minireset-css]: https://github.com/jgthms/minireset.css/
[netlify-identity]: https://www.netlify.com/docs/identity/
[render-props]: https://reactjs.org/docs/render-props.html
[system]: https://github.com/WalltoWall/system

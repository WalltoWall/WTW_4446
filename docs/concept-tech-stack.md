# Tech Stack

## Version Control System

[Git][git]

Hosting: [GitHub][github]

This project uses Git to version control source code and is hosted on GitHub.

## Content Management System

[Prismic][prismic]

Documentation: <https://prismic.io/docs/>

This project uses Prismic for its content management system (CMS). Prismic is a
headless API-based CMS designed to only handle content, not presentation.

## Hosting

[Netlify][netlify]

Documentation: <https://www.netlify.com/docs/>

This project uses Netlify for its website hosting. Netlify is a static site
hosting provider with built-in continuous integration (CI) and content delivery
network (CDN).

When commits are pushed to the `master` branch on GitHub, Netlify will fetch the
updated source, rebuild the site, and distribute the new files across its CDN.

Similarly, when documents are created or modified in Prismic, Netlify will
automatically rebuild and republish the site.

## Front-end Framework

[Gatsby][gatsby]

Documentation: <https://www.gatsbyjs.org/docs/>

This project uses Gatsby v2 to generate a static website using [React][react].
Using Gatsby allows for many automatic optimizations and componentized front-end
development unique to static sites (buzzwords!).

Additional libraries used in the front-end to handle styling, data fetching,
etc. are listed below.

### React

Website: <https://reactjs.org/>

Documentation: <https://reactjs.org/docs/>

JavaScript library for building user interfaces. All parts of this project are
React-based.

### styled-components

Website: <https://styled-components.com/>

Documentation: <https://styled-components.com/docs/>

Performant CSS-in-JS library to allow writing React components alongside your
CSS.

### Styled System

Website: <https://jxnblk.com/styled-system/>

Documentation: <https://github.com/jxnblk/styled-system/tree/master/docs>

Responsive, theme-based style props for building design systems with React.

### `gatsby-image`

Website: <https://gatsbyjs.org/packages/gatsby-image/>

Documentation: <https://gatsbyjs.org/docs/using-gatsby-image/>

Gatsby-specific React component for performance-optimized images. Using Gatsby's
data transformer interface, `gatsby-image` provides an easy method for providing
lazy-loaded and resolution-optimized images.

### SVGR

Documentation: <https://github.com/smooth-code/svgr>

Import SVGs as React components. Allows for easy CSS styling of SVGs.

### React Helmet

Documentation: <https://github.com/nfl/react-helmet>

Manage HTML `<head>` elements such as `<title>` and `<meta>` from within the
React tree.

[git]: https://git-scm.com/
[github]: https://github.com/
[prismic]: http://prismic.io/
[netlify]: http://netlify.com/
[gatsby]: https://www.gatsbyjs.org/
[react]: https://reactjs.org/
[service-worker]:
  https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

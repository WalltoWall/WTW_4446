# Gatsby Starter

This project was bootstrapped using the
[`@walltowall/gatsby-starter-ww`][gatsby-starter-ww] Gatsby starter. Starters
allow new projects to start with a base configuration and file structure.

See the official [Gatsby Starters documentation][gatsby-starters] for more on
starters.

The `@walltowall/gatsby-starter-ww` starter is a basic collection of plugins
and dependencies that are common among most Wall-to-Wall Gatsby projects. As
more websites use the starter, learnings can be applied to improve the starter.

Most Gatsby starters include styling and default content locations or have very
specific purposes. `@walltowall/gatsby-starter-ww` aims to be generic to allow
individual projects to include or override what the project needs.

## Features

- Common Gatsby plugins from
  [`@walltowall/gatsby-theme-ww-base`][gatsby-theme-ww-base]
- IE 11-specific polyfills from
  [`@walltowall/gatsby-theme-ww-base`][gatsby-theme-ww-base]
- Styling with [`styled-system`][styled-system] via
  [`@walltowall/system`][system]
- Git commit linting to ensure [Conventional Commits][conventional-commits]

## Changelog File

A `CHANGELOG.md` file is present in all projects created from the starter. The
changelog file contains a log of fixes and additions up until the project
started. The changelog file effectively becomes static unless it is manually
updated.

Starters work by cloning a Git repository rather than a package dependency.
This means improvements made to the starter are not passed down to its users.
If an improvement upstream is desired, use the upstream changelog to determine
the changes needed in your project.

See the [`@walltowall/gatsby-starter-ww`][gatsby-starter-ww] repository for the
latest version.

[gatsby-starters]: https://www.gatsbyjs.org/docs/starters/
[conventional-commits]: https://www.conventionalcommits.org
[styled-system]: https://github.com/jxnblk/styled-system
[system]: https://github.com/WalltoWall/gatsby-ww/tree/master/packages/system
[gatsby-theme-ww-base]: https://github.com/WalltoWall/gatsby-ww/tree/master/packages/gatsby-theme-ww-base
[gatsby-starter-ww]: https://github.com/WalltoWall/gatsby-ww/tree/master/packages/gatsby-starter-ww

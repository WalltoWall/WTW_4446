# Troubleshooting

When working with Gatsby and Prismic, there are some common issues that you may
come across during development. This document aims to outline strategies other
Wall to Wall developers found success with to work around these issues.

## General Issues

In most cases where you are experiencing strange or unexpected behavior in a
Gatsby project, it's recommended to delete the respective `.cache` and `public`
folders from the project. Gatsby's CLI provides a
[`clean`](https://www.gatsbyjs.org/docs/gatsby-cli/#clean) command to help
facilitate this:

```bash
yarn gatsby clean
```

Behind the scenes, Gatsby performs some aggressive caching that aids in speeding
up development, but can sometimes result in behavior and content refreshing
issues.

Keep in mind that deleting the `public` folder will require you to redownload
and reprocess any images that were previously processed via `gatsby-image`, so
it may be a good idea to delete just the `.cache` folder first.

## Safe Property Access

A common cause of broken website builds with Gatsby are due to unsafe nested
property access.

Consider a data object that we get back from Prismic:

```js
const normalData = {
  prismicPage: {
    data: {
      body: {
        textSlice: { text: 'Home' },
      },
    },
  },
}

const title = normalData.prismicPage.data.body.textSlice.text
// => 'Home'
```

This seems fine initially, but like in most front-end applications, it's unsafe
to assume that user generated data will _always_ be as we expect.

Consider another object that we may get back from Prismic.

```js
const normalData = {
  prismicPage: {
    data: {
      body: {
        textSlice: undefined,
      },
    },
  },
}

const title = normalData.prismicPage.data.body.textSlice.title
// => TypeError: Cannot read property 'title' of undefined
```

In the above scenario, a Gatsby build will always fail if some user-generated
content in Prismic is not specified!

### Solution

Whenever working with user-generated data from Prismic, it's recommended to use
some form of safe property access. Some common strategies include:

- Optional chaining. At the time of writing, this is a stage 3 proposal that
  allows for safe property access. We can use it in our projects via babel by
  installing
  [`@babel/plugin-proposal-optional-chaining`](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining).
- [`dlv`](https://github.com/developit/dlv). A tiny dedicated package for safe
  property access.

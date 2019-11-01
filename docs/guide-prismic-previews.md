# Prismic Previews

Gatsby is typically used to generate static sites using data fetched at
build-time. This means the site requires a rebuild anytime content in Prismic
changes. This can be a problem when wanting to preview changes before publishing
to the live site.

Luckily, [`gatsby-source-prismic`][gatsby-source-prismic] provides a way to
fetch preview data client-side using the
[`usePrismicPreview`][gatsby-source-prismic-use-prismic-preview] hook.

For more information on `usePrismicPreview`, read `gatsby-source-prismic`'s
official [Preview documentation][gatsby-source-prismic-previews].

Ensuring that Slices render properly in previews requires a bit of extra work.
There are some best practices to keep in mind that will save you time debugging
any preview issues.

## Handling Images

Since image preview data is normalized on the fly in the browser, we're unable
to peform the same image optimizations that Gatsby does at build time such as
placeholders and max sizes. Instead, `usePrismicPreview` provides just the URL
from Prismic's CDN.

To ensure image parity in previews, be sure to utilize the `Image` component
from [`@walltowall/system`][system] and provide the image URL to the `src` prop
in addition to the `fluid`/`fixed` props.

The `Image` component conditionally renders either a
[`GatsbyImage`][gatsby-image] or a plain `img` element based on the availability
of `fluid`/`fixed` and `src`.

`Image` prioritizes `src` over `fluid`/`fixed`.

Below is an example of what this would look like:

```jsx
import { Image } from '@walltowall/system'

const MySlice = ({ imageFluid, imageURL, ...props }) => (
  <Box {...props}>
    {(imageFluid || imageURL) && <Image fluid={imageFluid} src={imageURL} />}
  </Box>
)
```

If `imageURL` is available, such as during a preview, `Image` will render an
`img` element. Otherwise, `Image` will render a `GatsbyImage`.

[gatsby-source-prismic]: https://github.com/angeloashmore/gatsby-source-prismic
[gatsby-source-prismic-use-prismic-preview]:
  https://github.com/angeloashmore/gatsby-source-prismic/blob/master/docs/previews.md#useprismicpreview-1
[gatsby-source-prismic-previews]:
  https://github.com/angeloashmore/gatsby-source-prismic/blob/master/docs/previews.md
[system]: https://github.com/WalltoWall/system
[gatsby-image]: https://www.gatsbyjs.org/packages/gatsby-image/

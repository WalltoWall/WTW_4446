# Create a Slice

Slices are componentized so individual slices can be made in isolation from
eachother. The following process describes creating a Slice. This process can
be repeated for all Slices on the site.

For more information on Slices, see [Architecture - SDD: Slice Driven
Development][arch-sdd].

## Determine the Slice's purpose

Before writing code, a proper understanding of the Slice's purpose must exist.
Slices are typically horizontal content areas of a page that should be reusable
on any page (with the exception of visual design incompatibility).

Read the [Slices](concept-slices.md) concept document for more on this topic.

## Create the Slice in Prismic

Once we know what the Slice will contain, we'll need to create the Slice in
Prismic.

Slices can contain two groups of fields: repeatable and non-repeatable.

Repeatable fields are grouped into repeatable blocks with arbitrary quantity.
For example, an image gallery Slice would contain repeatable fields for each
image: the image itself and a text caption.

Non-repeatable fields are static fields for the Slice. Continuing the example
of an image gallery Slice, non-repeatable fields could be a gallery name and
description.

See the official [Prismic Slices][prismic-slices] documentation for more
details on configuring Prismic for your Slice.

## Create the React components

The next step is to create the React components that will render your Slice.
All Slices are located in `src/slices`, each with their own folder named after
the Slice.

Following the convention of the
[`gatsby-source-prismic`][gatsby-source-prismic-slices] plugin, Slices are
named after the content type and field. For example, a Slice named "Rich Text"
for the custom type "Page" in the "Body" Slice Zone would be named
"PageBodyRichText".

TODO

## Register in `src/slices/index.js`

Once the React component is created, the Slice needs to be registered for use
within the main template.

All registration is handled in `src/slices/index.js`.

1. Import your Slice at the top of the file:

   ```js
   import { PageBodyText } from './PageBodyText'
   ```

1. Add your Slice to the `slices` constant:

   ```js
   export const slices = {
     // ...

     PageBodyText,

     // ...
   }
   ```

1. Add your Slice to the `fragment` constant:

   ```js
   export const fragment = graphql`
     fragment Slices on Query {
       # ...

       ...PageBodyText

       # ...
     }
   `
   ```

## Add to a page in Prismic

The next step is to test the Slice in your app. You can do this by adding the
Slice to a page in Prismic and restarting the Gatsby development server. This
will fetch the new content from Prismic and render your content.

```sh
# After adding the Slice to a page in Prismic, stop the server with:
#
#   CTRL+C
#
# Then restart the server:

yarn develop
```

Now that the Slice is visible in the browser, you can build the functionality
and styling necessary for the Slice.

## Write client documentation

Once the Slice is complete, the final step is to document it for client use.
Note that this is different from developer documentation; it is not a set of
instructions on using the Slice and how its technically implemented. Instead,
this is documentation client will use when updating content in Prismic.

A brief description of the Slice's appearance and purpose along with a
description of each field in Prismic should be included.

All documentation is stored in `docs/slice-*.md` where `slice-*` is the name of
the Slice. For example, a Text Slice should be documented in
`docs/slice-text.md`.

See other documents in the `docs` folder to use as a template.

[arch-sdd]: concept-architecture.md#sdd-slice-driven-development
[prismic-slices]: https://intercom.help/prismicio/content-modeling-and-custom-types/field-reference/slices
[gatsby-source-prismic-slices]: https://github.com/angeloashmore/gatsby-source-prismic#query-slices

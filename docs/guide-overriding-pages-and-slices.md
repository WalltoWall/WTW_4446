# Overriding Pages and Slices

[Building pages with slices][concept-slices] is a powerful concept as it allows
content creators and editors freedom to present content as they inted.

As developers, this freedom can complicate styling and data management as we
are unable to anticipate exactly which slices are used on a page and in which
order they appear. The styling of adjacent slices, for example, could result in
unexpected appearances.

We need a system that allows us to arbitrarily modify and react to slices for
any given page. This system should allow us to take full control over what is
rendered with access to the page's metadata, slices, and its context within the
whole site. Such a system would allow us to update styling and manipulate the
presentational data of each slice as necessary.

Luckily, this is all possible by conforming to a pattern as detailed below.

## Export modular templates

> This section can be removed if we default to this style.

Templates are React components. There is nothing special about their
implementation except for their use in generating pages in your
`gatsby-node.js` file. As such, we can use template components in other files
just as any other component. Doing this ensures our overrides will maintain the
same look as other pages of the same type.

### Export template component

Templates are required to be exported as the default export for Gatsby to
recognize it as a template. Your template probably looks something like this:

```js
const PageTemplate = ({ data }) => {
  // Your template logic here
}

export default PageTemplate
```

To use `PageTemplate` as a component, we could import it with the following:

```js
import PageTemplate from 'src/templates/page'
```

To keep it inline with the naming standards of the project, we should export
`PageTemplate` as a named export as well. This will allow us to import it with
the explicit name.

```js
// Note the `export` before const
export const PageTemplate = ({ data }) => {
  // Your template logic here
}

// This export should remain as it is used in gatsby-node.js
export default PageTemplate
```

We can now import it as its constant name:

```js
import { PageTemplate } from 'src/templates/page'
```

For our template to be flexible, we'll want to be able to override what gets
rendered within the template. This can be done by accepting a `children` prop
in the component and rendering it if available.

```js
export const PageTemplate = ({ children, data }) => (
  <Layout>{children || <MapSlicesToComponents />}</Layout>
)
```

### Export MapSlicesToComponents

Next, we'll need to export the `MapSlicesToComponents` component used to render
the page's slices. We can extract the `MapSlicesToComponents` component to its
own constant.

Once it's extracted, we can export it by attaching it to PageTemplate as
property. This allows us to use the component as
`PageTemplate.MapSlicesToComponents` and namespaces it to the template.

```js
import { MapSlicesToComponents as MapSlicesToComponentsBase } from 'src/components/MapSlicesToComponents'

// Moved from within PageTemplate to its own component
const MapSlicesToComponents = ({ rootData, ...props }) => (
  <MapSlicesToComponentsBase
    {/* Your MapSlicesToComponents props here */}
  />
)

// The data prop contains the page's GraphQL data. We need to pass this to
// MapSlicesToComponents to ensure it can continue to render the page's slices.
export const PageTemplate = ({ children, data }) => (
  <Layout>{children || <MapSlicesToComponents rootData={rootData} />}</Layout>
)

// Note that since PageTemplate is exported, this is also exported
PageTemplate.MapSlicesToComponents = MapSlicesToComponents
```

### Create a GraphQL fragment

The last step to setting up our template to be reusable is setting up its
GraphQL fragment. This will let us fetch the same data used on the generated
page in our overrides.

This should be done by moving the page's fields into a fragment like such:

```js
export const query = graphql`
  query($uid: String!) {
    prismicPage(uid: { eq: $uid }) {
      ...PageTemplate
    }
    ...SlicesPageBody
  }

  fragment PageTemplate on PrismicPage {
    uid
    data {
      title {
        text
      }
      meta_title
      meta_description
      body {
        __typename
      }
    }
  }
`
```

The `PageTemplate` fragment can now be used in any query on other pages.

## Page overrides

Specific pages can be completely replaced by a one-off page by creating a page
in `src/pages` with the same path as the page to be replaced. Gatsby will
prioritize this page over the one generated in `createPages` in
`gatsby-node.js`.

If the overriding page needs access to the same GraphQL data as the original
page, the page's context will need to be updated to match that of the generated
version. This project's `gatsby-node.js` already includes an `onCreatePage`
function that passes the page's `uid` as context based on the path, but it can
be updated as necessary.

## Template overrides

- TODO: determine how to perform template overrides

## Strategies for manipulating slices

When creating overrides, we may need to manipulate a slice's styling or data.
The following sections detail scenarios you may find yourself in and how to
deal with them.

### Change styling for a specific slice

If we need to change styling for a specific slice, we can utilize
`MapSlicesToComponents`'s `mapOverrides` prop. This prop allows us to replace
the default mapping for any slice type. When overriding a slice, we actually
receive the slice component thanks to our new mapping in
`MapSlicesToComponents`.

In the following example, we change the background of a `PageBodyImageBlurb`
slice to red only if it follows a `PageBodyHeroImage` slice. Note that `<Comp>`
here is the same as `<PageBodyImageBlurb>`.

```js
const HomePage = ({ data, ...props }) => (
  <PageTemplate data={data}>
    <PageTemplate.MapSlicesToComponents
      rootData={data}
      mapOverrides={{
        PageBodyImageBlurb: Comp => props => {
          const overrideProps = {}

          if (props.previousType === 'PageBodyHeroImage')
            overrideProps.bg = 'red'

          return <Comp {...props} {...overrideProps} />
        },
      }}
    />
  </PageTemplate>
)
```

Notice how we continue to spread `props` on the slice in addition to
`overrideProps`. This ensures the slice continues to receive all the props it
expects. Since `overrideProps` is spread after `props`, any props declared
before it will be replaced if present in `overrideProps`.

`props` contains the following helpful properties:

- `data` - The slice's content data from its GraphQL fragment.
- `index` - The slice's index in `list`.
- `list` - The array of all the page's slices.
- `previous` - The previous slice's data.
- `previousType` - The previous slice's type.
- `previousKey` - The previous slice's key (i.e. GraphQL ID).
- `next` - The next slice's data.
- `nextType` - The next slice's type.
- `nextKey` - The next slice's key (i.e. GraphQL ID).

With this data, we can modify the props of the returned component or return a
different component altogether.

### Change data for a specific slice

As detailed above, we have access to the slice's data and its surrounding
items. We also have access to the slice's content props. For example, the
`PageBodyImageBlurb` slice from our previous example may take in a `heading`
prop. If we wanted to manipulate that data before it gets to
`PageBodyImageBlurb`, we could override its value.

```js
const HomePage = ({ data, ...props }) => (
  <PageTemplate data={data}>
    <PageTemplate.MapSlicesToComponents
      rootData={data}
      mapOverrides={{
        PageBodyImageBlurb: ({ heading, ...props }) => {
          // mockingcase returns a mOcKiNgCaSe version of its input
          const newHeading = mockingcase(heading)

          return <PageBodyImageBlurb {...props} heading={newHeading} />
        },
      }}
    />
  </PageTemplate>
)
```

We can manipulate any of its props using arbitrary JavaScript. Note that we
spread `props` on the returned component to ensure the slice continues to
receive all the props it expects.

### Change the list of slices

`mapOverrides` allows us to alter the returned component for a slice, but it
does not allow us to determine the order in which it is rendered.
`MapSlicesToComponents` takes a `listMiddleware` prop that provides
functionality to do just that.

`listMiddleware` accepts a function that takes the list as its input and
returns a modified version of the list. Modifications could include
whitelisting or blacklisting slice types, reordering slices, or injecting
slices that do not exist anywhere else.

```js
// Removes slices with the GraphQL typename `PrismicPageBodyHeroImage`.
const noPageBodyHeroImage = filter(
  slice => slice.__typename !== 'PrismicPageBodyHeroImage'
)

// Flips the order of the slices using Lodash's reverse function.
const reverseSlices = reverse

// Adds a SecretSlice to the list as the third element. Since the object is
// passed directly to the slice, we can include any data, including functions.
const addSecretSlice = list => {
  const secretSliceData = {
    __typename: 'SecretSlice',
    id: 'uniqueId',
    data: {
      handleButtonClick: () => console.log('Functions in data!')
    }
  }

  list.splice(2, 0, secretSliceData)

  return list
}

const HomePage = ({ data, ...props }) => (
  <PageTemplate data={data}>
    <PageTemplate.MapSlicesToComponents
      rootData={data}
      listMiddleware={/* middleware function here */}
    />
  </PageTemplate>
)
```

`listMiddleware` affects the raw list of slices before it is processed through
`mapDataToProps` and `map`. `listMiddleware` is a low-level API that allows you
to manipulate the data before `MapToComponents` processes it. As such, you do
not get convenient helpers like `type` and `key` from `mapOverrides`.

[concept-slices]: ./concept-slices.md

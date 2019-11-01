# Styling with Ease

Wall-to-Wall Gatsby projects have selected
[`styled-system`](https://styled-system.com/) as it's preferred CSS-in-JS
solution because it enables developers to:

- Style consistently with an explicit global `theme`.
- Implement and respond to changing design requirements quickly.
- Create mobile-first and responsive layouts with ease.

As a quick example, instead of needing to write something like this:

```css
/* example in CSS */
.box {
  font-size: 16px;
  width: 100%;
}
@media screen and (min-width: 40em) {
  font-size: 20px;
  width: 50%;
}
@media screen and (min-width: 52em) {
  font-size: 24px;
}
```

We can just write:

```jsx
<Box fontSize={[16, 20, 24]} width={[1, 1 / 2]} />
```

To get additional justification for using `styled-system`, we recommend reading
[`The Three Tenets of Styled System`](https://jxnblk.com/blog/the-three-tenets-of-styled-system/).

## @walltowall/system

Wall-to-Wall works with a small abstraction over `styled-system` with the
`@walltowall/system` package.

> ⚠️ We'll refer to `@walltowall/system` as `system` going forward.

`system` provides a set of named generic components that explicitly define their
purpose:

```js
import {
  Box,
  Text,
  Grid,
  Flex,
  Image,
  ImageContainer,
  Input,
  Button,
} from 'system' // Aliased via webpack.
```

Each of these components accept a wide range of "system-props" that map their
values to CSS properties. By convention, system-props are just camelCased
equivalents of existing CSS properties. For example, the css property
`font-size` has a system-prop equivalent of `fontSize`.

## Defining a theme

The first step to ensuring consistency with any project using `system` is to
define a global `theme` that all our `system` components will use. This starter
provides a good starting theme in `src/theme.js` that you can modify to fit your
project's needs.

> 📘 **Theme Reference**
>
> `styled-system` provides documentation on the specification for a `theme` that
> is available [here](https://styled-system.com/theme-specification/).

### Colors

The first thing you'll likely need to customize for your `theme` is to provide
the colors for the project you are working on.

Wall-to-Wall has found success in namespacing similar colors under a common name
with a keyed number representing it's general lightness.

This will sound less confusing if you consider the following example:

```js
const theme = {
  colors: {
    gray: {
      20: '#3d3d3d',
      60: '#979797',
      90: '#e7eae2',
      95: '#f9f9f7',
    },
    teal: {
      40: '#617672',
      70: '#00bfcd',
      75: '#2ecbc8',
    },
    red: {
      40: '#dc0024',
    },
    orange: {
      60: '#ff6b00',
    },
    yellow: {
      80: '#ffda28',
    },
    white: '#fff',
    black: '#000',
  },
}
```

In general, darker variants of a color have lower keys than lighter variants. We
can derive `20` for `#3d3d3d` by taking the HSL value, `hsl(0, 0%, 24%)` and
rounding the `24%` to `20`.

#### Usage

Using nampespaced colors is as you would expect with `system`:

```js
import { Text } from 'system'

const Example = () => <Text color="orange.60">This text is orange!</Text>
```

### Scales - font size and space

`system` components allow the usage of custom "scale" props for font sizes and
spacing that `styled-system` doesn't normally support. A scale prop is a special
prop that has predefined responsive values associated with it.

#### Usage

The usage of these custom scale props is just like any other system-prop.

```jsx
import { Text } from 'system'

// A scale component
const ScaleExample = () => (
  <Text mxScale="m" fontSizeScale="b">
    Our size and spacing scale responsively!
  </Text>
)

// Is equal to:
const Example = () => (
  <Text mx={[2, 4, 6, 8]} fontSize={[1, 3, 5, 7]}>
    Our size and spacing scale responsively!
  </Text>
)
```

#### Overrides & negative values

You can override and use negative values for a scale prop at any breakpoint just
like you would with any other system-prop.

```jsx
import { Text } from 'system'

// A scale component
const ScaleExample = () => (
  <Text mxScale={['-m', null, 0]} fontSizeScale={[0, null, 'b']}>
    Our size and spacing scale responsively!
  </Text>
)

// Is equal to:
const Example = () => (
  <Text mx={[-2, -4, 0]} fontSize={[0, null, 5, 7]}>
    Our size and spacing scale responsively!
  </Text>
)
```

#### Defining scales

You may have noticed that the `theme` file has special keys like `fontSizeScale`
and `spaceScale` that are similar to those outlined in the theme specification.
These special keys are where scale props like `mxScale` derive their output
from.

Creating a scale is straightforward since
[`styled-system-scale`](https://github.com/angeloashmore/styled-system-scale),
the package that enables scale props, provides some utility functions like
`linearScale` that make creating scales easy. You should be able to see some
examples in the `theme.js` file in this repo, but feel free to consider the
following example:

```js
import { linearScale } from 'styled-system-scale'

const theme = {
  fontSizeScales: {
    b: linearScale('1rem', '1.2rem', { count: 5 }),
  },
}

// => ['1rem', '1.05rem', '1.10rem', '1.15rem', '1.20rem']
```

The above will generate an array containing 5 total linear incremental values
from `1rem` to `1.20rem` inclusively. In general, `count` should equal your
number of defined breakpoints plus one.

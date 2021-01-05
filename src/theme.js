const { linearScale } = require('styled-system-scale')

const sizes = {
  s: '48rem',
  m: '60rem',
  l: '100rem',
  xl: '130rem',
}
const breakpoints = Object.values(sizes)

// Used for linearScale count
const count = breakpoints.length + 1

const theme = {
  /***
   * Sizes
   */
  breakpoints,
  sizes,

  /***
   * Colors
   */
  colors: {
    white: '#fff',
    black: '#000',
  },

  /***
   * Fonts
   */
  fonts: {
    sans: 'sans-serif',
    serif: 'serif',
  },
  fontSizeScales: {
    t: linearScale('0.75rem', '1.125rem', { count }),
    s: linearScale('0.9375rem', '1.5rem', { count }),
    b: linearScale('1.0625rem', '2rem', { count }),
    m: linearScale('1.3125rem', '2.25rem', { count }),
    l: linearScale('1.625rem', '3.75rem', { count }),
    xl: linearScale('1.9375rem', '5rem', { count }),
    xxl: linearScale('2.25rem', '5.625rem', { count }),
  },
  fontWeights: {
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    heavy: 800,
    black: 900,
  },
  lineHeights: {
    solid: 1,
    title: 1.2,
    copyTight: 1.2,
    copy: 1.3,
  },

  /***
   * Spacing
   */
  spaceScales: {
    0: linearScale(0, 0, { count }),
    't-': linearScale('5px', '15px', { count }),
    t: linearScale('10px', '27px', { count }),
    s: linearScale('12px', '34px', { count }),
    m: linearScale('20px', '45px', { count }),
    l: linearScale('30px', '57px', { count }),
    xl: linearScale('40px', '100px', { count }),
    xxl: linearScale('50px', '150px', { count }),
  },

  /***
   * Transitions
   */
  transitionDurations: {
    slow: '300ms',
    normal: '200ms',
    fast: '100ms',
  },

  /***
   * Z Indices
   */
  zIndices: {
    header: 1,
    headerBar: 3,
    headerMobileNav: 2,
    headerMobileNavOverlap: 1,
  },

  /***
   * Variants
   */
  textStyles: {
    caps: {
      textTransform: 'uppercase',
    },
    trackedCaps: {
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
    },
  },
  boxStyles: {
    lastNoMargin: {
      '&:last-child': {
        marginBottom: 0,
        marginRight: 0,
      },
    },
    firstLastNoMargin: {
      '&:first-child': {
        marginTop: 0,
        marginLeft: 0,
      },
      '&:last-child': {
        marginBottom: 0,
        marginRight: 0,
      },
    },
  },

  /***
   * Media queries
   */
  mediaQueries: Object.keys(sizes).reduce((acc, key) => {
    acc[key] = `@media screen (min-width: ${sizes[key]}rem)`

    return acc
  }, {}),
}

exports.theme = theme

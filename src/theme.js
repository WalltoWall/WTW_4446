const { linearScale } = require('styled-system-scale')
const { hexToP3 } = require('@walltowall/hex-to-p3')

const sizes = {
  s: '48rem',
  m: '60rem',
  l: '80rem',
  xl: '100rem',
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
    blue: hexToP3('#00f'),
    white: '#fff',
    black: '#000',
  },

  /***
   * Fonts
   */
  fonts: {
    sans: 'Inter, sans-serif',
    serif: 'serif',
  },
  fontSizeScales: {
    b: linearScale('14px', '24px', { count }),
    m: linearScale('20px', '28px', { count }),
    l: linearScale('30px', '56px', { count }),
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
    's-': linearScale('8px', '20px', { count }),
    s: linearScale('10px', '30px', { count }),
    'm-': linearScale('20px', '50px', { count }),
    m: linearScale('20px', '60px', { count }),
    l: linearScale('30px', '70px', { count }),
    xl: linearScale('55px', '150px', { count }),
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
    header: 2,
    desktopNav: 2,
    navOverlay: 1,
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

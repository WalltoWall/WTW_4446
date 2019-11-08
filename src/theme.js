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
    s: linearScale('15px', '24px', { count }),
    b: linearScale('17px', '32px', { count }),
    m: linearScale('21px', '48px', { count }),
    l: linearScale('26px', '60px', { count }),
    xl: linearScale('31px', '80px', { count }),
    xxl: linearScale('36px', '100px', { count }),
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
    xl: linearScale('40px', '120px', { count }),
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
  zIndices: {},

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

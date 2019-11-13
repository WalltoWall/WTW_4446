// import { hexToP3 } from '@walltowall/hex-to-p3'

export const safeHexToP3 = hex => {
  if (!/#([a-fA-F\d]{3}){1,2}/.test(hex)) return hex

  // Need to disable this. ThemeProvider is baking in the non-P3 versions on the SSR version of the site.
  // It also conflicts with image color profiles.
  // return hexToP3(hex)

  return hex
}

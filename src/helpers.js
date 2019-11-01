import { hexToP3 } from '@walltowall/hex-to-p3'

export const safeHexToP3 = hex => {
  if (!/#([a-fA-F\d]{3}){1,2}/.test(hex)) return hex

  return hexToP3(hex)
}

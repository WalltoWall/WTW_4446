/**
 * Converts the provided vimeo video URL into a valid embed string
 * to be used in an `<iframe>`.
 *
 * @param {string} vimeoLink - The link to convert.
 * @param options
 *
 * @returns A string for use in an `<iframe>` to embed the video.
 */
export function convertVimeoLinkToIframeSrc(vimeoLink, options) {
  if (vimeoLink.includes('showcase')) return vimeoLink + '/embed'

  let embedLink = vimeoLink.replace('vimeo.com', 'player.vimeo.com/video')

  if (options?.autoplay) embedLink += '?autoplay=1'

  return embedLink
}

const path = require('path')

exports.onCreatePage = gatsbyContext => {
  const { page, actions, getNodes } = gatsbyContext
  const { createPage } = actions

  if (page.path === '/') return

  const nodes = getNodes()
  const settingsNode = nodes.find(
    node => node.internal.type === 'PrismicSettings',
  )
  if (!settingsNode) return

  const liveHomepageUID = settingsNode.data.live_homepage.uid
  if (!liveHomepageUID) return

  const pageUID = page.context && page.context.uid

  if (pageUID === liveHomepageUID) createPage({ ...page, path: '/' })
}

exports.createPages = (gatsbyContext) => {
  const { actions, getNodesByType, reporter } = gatsbyContext
  const { createPage, createRedirect } = actions

  for (const page of getNodesByType('PrismicPage')) {
    createPage({
      path: page.url,
      component: path.resolve(__dirname, 'src/templates/page.js'),
      context: { id: page.id, uid: page.uid },
    })
  }

  /**
   * Create a redirect from /admin to Prismic.
   *
   * @see https://www.gatsbyjs.org/docs/actions/#createRedirect
   */
  {
    const url = `https://${process.env.GATSBY_PRISMIC_REPOSITORY_NAME}.prismic.io`
    reporter.info(`created /admin redirect to ${url}`)
    createRedirect({
      fromPath: '/admin',
      toPath: url,
      redirectInBrowser: true,
      force: true,
    })
  }

}

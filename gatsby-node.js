const path = require('path')

exports.createPages = (gatsbyContext) => {
  const { actions, getNodes, getNodesByType, reporter } = gatsbyContext
  const { createPage, createRedirect } = actions

  const nodes = getNodes()
  const settingsNode = nodes.find(
    node => node.internal.type === 'PrismicSettings',
  )
  const liveHomepageUID = settingsNode && settingsNode.data.live_homepage.uid

  for (const page of getNodesByType('PrismicPage')) {
    createPage({
      path: page.url,
      component: path.resolve(__dirname, 'src/templates/page.js'),
      context: { id: page.id, uid: page.uid },
    })

    if (page.uid === liveHomepageUID) createPage({
      path: '/',
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

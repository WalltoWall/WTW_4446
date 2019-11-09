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

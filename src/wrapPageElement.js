import React from 'react'
import { PageWrapper } from 'src/components'

import 'minireset.css'
import '@reach/skip-nav/styles.css'

import './index.css'

export const wrapPageElement = ({ element, props }) => {
  const location = props.location

  if (location.pathname.startsWith('/admin/')) return element

  return <PageWrapper>{element}</PageWrapper>
}

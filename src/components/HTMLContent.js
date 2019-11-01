import React from 'react'
import HTMLRenderer from 'react-html-renderer'

import { Box, Text } from 'system'
import { Heading, Subheading, Anchor } from 'src/components'

const baseHeadingProps = { boxStyle: 'firstLastNoMargin' }
const baseTextProps = { boxStyle: 'lastNoMargin', mbScale: 's' }

const defaultComponents = {
  h1: props => <Heading as="h3" {...baseHeadingProps} {...props} />,
  h2: props => <Subheading as="h4" {...baseHeadingProps} {...props} />,
  h3: props => <Subheading as="h5" {...baseHeadingProps} {...props} />,
  h4: props => <Subheading as="h6" {...baseHeadingProps} {...props} />,
  h5: props => <Subheading as="h6" {...baseHeadingProps} {...props} />,
  h6: props => <Subheading as="h6" {...baseHeadingProps} {...props} />,
  p: props => <Text as="p" {...baseTextProps} {...props} />,
  ul: props => <Box as="ul" plScale="m" {...baseTextProps} {...props} />,
  li: props => <Text as="li" listStyle="disc" mbScale="s" {...props} />,
  a: props => <Anchor {...props} />,
}

export const HTMLContent = ({ html, componentOverrides, ...props }) => (
  <Text lineHeight="copy" {...props}>
    <HTMLRenderer
      html={html}
      components={defaultComponents}
      componentOverrides={componentOverrides}
    />
  </Text>
)

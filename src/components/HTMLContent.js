import React from 'react'
import HTMLRenderer from 'react-html-renderer'

import { Box, Text, AspectRatio } from 'system'
import { Heading, Subheading, Anchor } from 'src/components'

const baseHeadingProps = {
  boxStyle: 'firstLastNoMargin',
  mtScale: 'm',
  mbScale: 's',
}
const baseTextProps = { boxStyle: 'lastNoMargin', mbScale: 't' }

const defaultComponents = {
  h1: props => <Heading as="h3" {...baseHeadingProps} {...props} />,
  h2: props => <Heading as="h4" {...baseHeadingProps} {...props} />,
  h3: props => <Heading as="h5" {...baseHeadingProps} {...props} />,
  h4: props => <Subheading as="h6" {...baseHeadingProps} {...props} />,
  h5: props => <Subheading as="h6" {...baseHeadingProps} {...props} />,
  h6: props => <Subheading as="h6" {...baseHeadingProps} {...props} />,
  p: props => <Text as="p" {...baseTextProps} {...props} />,
  ol: props => <Box as="ol" plScale="m" {...baseTextProps} {...props} />,
  ul: props => <Box as="ul" plScale="m" {...baseTextProps} {...props} />,
  li: props => (
    <Text as="li" display="list-item" {...baseTextProps} {...props} />
  ),
  a: props => <Anchor {...props} />,
  iframe: props => (
    <AspectRatio x={props.width} y={props.height}>
      <Box
        as="iframe"
        css={`
          width: 100% !important;
          height: 100% !important;
        `}
        {...props}
      />
    </AspectRatio>
  ),
}

export const HTMLContent = ({ html, componentOverrides, ...props }) => (
  <Text color="body" {...props}>
    <HTMLRenderer
      html={html}
      components={defaultComponents}
      componentOverrides={componentOverrides}
    />
  </Text>
)

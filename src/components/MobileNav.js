import React from 'react'
import { a, useSpring } from 'react-spring'

import { Box, Link } from 'system'
import { BoundedBox, Subheading } from 'src/components'

const NavItem = ({ children, href, target, ...props }) => (
  <Box as="li" mbScale="s" boxStyle="lastNoMargin" {...props}>
    <Subheading as="span" fontSizeScale="xl">
      <Link href={href} target={target}>
        {children}
      </Link>
    </Subheading>
  </Box>
)

export const MobileNav = ({
  isOpen = false,
  primaryLinks = [],
  secondaryLinks = [],
  ...props
}) => {
  const animValues = useSpring({
    transform: `translateY(${isOpen ? '-1%' : '-120%'})`,
    opacity: isOpen ? 1 : 0,
  })

  return (
    <BoundedBox
      as={a(BoundedBox)}
      ptScale="m"
      pbScale="xl"
      bg="background"
      position="absolute"
      left={0}
      right={0}
      zIndex="headerMobileNav"
      boxShadow="0 2px 16px rgba(0, 0, 0, 0.4), 0 0.5px 0 rgba(0, 0, 0, 0.1)"
      style={{ transform: animValues.transform }}
      {...props}
    >
      <Box as={a(Box)} style={{ opacity: animValues.opacity }}>
        <Box as="ul">
          {primaryLinks.map(item => (
            <NavItem key={item.name} href={item.href} target={item.target}>
              {item.name}
            </NavItem>
          ))}
        </Box>
        <Box
          as="hr"
          border="none"
          borderTop="2px solid"
          opacity={0.25}
          myScale="l"
          width={1 / 8}
        />
        <Box as="ul">
          {secondaryLinks.map(item => (
            <NavItem key={item.name} href={item.href} target={item.target}>
              {item.name}
            </NavItem>
          ))}
        </Box>
      </Box>
    </BoundedBox>
  )
}

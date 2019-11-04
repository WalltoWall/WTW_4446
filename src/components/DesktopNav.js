import React from 'react'
import { a, useSpring } from 'react-spring'

import { useStore } from 'src/hooks'

import { Box, Grid, Flex, Button, SVG, Link } from 'system'
import { HamburgerButton } from 'src/components'
import { ReactComponent as AssetLogoSVG } from 'src/assets/logo.svg'
import { ReactComponent as AssetLogoAAFHawaiiSVG } from 'src/assets/logo-aaf-hawaii.svg'

const NavItem = ({ children, href, target, ...props }) => (
  <Box as="li" {...props}>
    <Link
      href={href}
      target={target}
      fontSize="64px"
      fontWeight="black"
      lineHeight="solid"
      color="currentColor"
    >
      {children}
    </Link>
  </Box>
)

export const DesktopNav = props => {
  const isNavOpen = useStore(state => state.isNavOpen)
  const closeNav = useStore(state => state.closeNav)
  const toggleNav = useStore(state => state.toggleNav)

  const menuAnimStyles = useSpring({
    width: isNavOpen ? '30vw' : '0vw',
  })

  const navItemsAnimStyles = useSpring({
    transform: isNavOpen ? 'translateX(0vw)' : 'translateX(5vw)',
  })

  return (
    <>
      <Grid
        gridTemplateColumns="90px auto"
        bg="#fff8eb"
        color="#108594"
        {...props}
      >
        <Flex flexDirection="column" p="20px">
          <SVG svg={AssetLogoSVG} x={50} y={28} />
          <Button onClick={toggleNav} outline="0" flexGrow="1">
            <Flex justifyContent="center" alignItems="center" height="100%">
              <HamburgerButton active={isNavOpen} />
            </Flex>
          </Button>
          <SVG svg={AssetLogoAAFHawaiiSVG} x={136.1} y={85.04} />
        </Flex>
        <Flex
          as={a(Flex)}
          flexDirection="column"
          justifyContent="center"
          bg="#fff8eb"
          overflow="hidden"
          style={menuAnimStyles}
        >
          <Box as={a(Box)} style={navItemsAnimStyles}>
            <NavItem>About</NavItem>
            <NavItem>Details</NavItem>
            <NavItem>Enter</NavItem>
            <NavItem>Sponsors</NavItem>
          </Box>
        </Flex>
      </Grid>
      <Box
        onClick={closeNav}
        position="fixed"
        bg="#000a"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={isNavOpen ? 0.5 : 0}
        transitionProperty="opacity"
        zIndex="navOverlay"
        css={{ pointerEvents: isNavOpen ? 'auto' : 'none' }}
      />
    </>
  )
}

import React, { useMemo, useState } from 'react'
import { graphql } from 'gatsby'
import { linearScale } from 'styled-system-scale'
import { getImageFluid } from 'helpers'

import { safeHexToP3 } from 'src/helpers'

import { ThemeProvider, Box, Flex, Grid, Image, Link } from 'system'
import {
  BoundedBox,
  HamburgerButton,
  MobileNav,
  Subheading,
} from 'src/components'

const NavItems = props => (
  <Grid as="ul" gridAutoFlow="column" gridGapScale="s" {...props} />
)

const NavItem = ({ children, href, target, ...props }) => (
  <Box as="li" {...props}>
    <Subheading as="span" textAlign="center" fontSizeScale="b">
      <Link href={href} target={target}>
        {children}
      </Link>
    </Subheading>
  </Box>
)

export const PageBodyHeader = ({
  backgroundColor,
  linkColor = 'inherit',
  logoImageFluid,
  logoImageURL,
  logoImageAlt,
  primaryLinks = [],
  secondaryLinks = [],
  ...props
}) => {
  const [navIsOpen, setNavIsOpen] = useState(false)
  const closeNav = () => setNavIsOpen(false)
  const toggleNav = () => setNavIsOpen(state => !state)
  const isTransparent = !Boolean(backgroundColor)

  const theme = useMemo(
    () => ({
      colors: {
        background: safeHexToP3(backgroundColor),
        subheadline: safeHexToP3(linkColor),
        link: safeHexToP3(linkColor),
      },
    }),
    [backgroundColor, linkColor],
  )

  return (
    <ThemeProvider theme={theme}>
      <Box
        position={isTransparent ? 'absolute' : 'static'}
        left={0}
        right={0}
        top={0}
        zIndex="header"
        color="link"
      >
        <BoundedBox
          as="header"
          bg="background"
          maxWidth="none"
          pyScale="s"
          position="relative"
          zIndex="headerBar"
          {...props}
        >
          <Grid
            gridTemplateColumns={['auto auto', 'auto 1fr']}
            gridGapScale="m"
            alignItems="center"
            justifyContent={['space-between', 'auto']}
          >
            {(logoImageFluid || logoImageURL) && (
              <Image
                fluid={logoImageFluid}
                src={logoImageURL}
                alt={logoImageAlt}
                width={linearScale('70px', '140px', { count: 5 })}
              />
            )}
            <Flex
              display={['none', 'flex']}
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <NavItems>
                {primaryLinks.map(item => (
                  <NavItem
                    key={item.name}
                    href={item.href}
                    target={item.target}
                  >
                    {item.name}
                  </NavItem>
                ))}
              </NavItems>
              <NavItems>
                {secondaryLinks.map(item => (
                  <NavItem
                    key={item.name}
                    href={item.href}
                    target={item.target}
                  >
                    {item.name}
                  </NavItem>
                ))}
              </NavItems>
            </Flex>
            <HamburgerButton
              display={[null, 'none']}
              active={navIsOpen}
              onClick={toggleNav}
            />
          </Grid>
        </BoundedBox>
        <MobileNav
          primaryLinks={primaryLinks}
          secondaryLinks={secondaryLinks}
          isOpen={navIsOpen}
          closeNav={closeNav}
          display={['block', 'none']}
        />
        <Box
          display={[null, 'none']}
          bg="black"
          opacity={navIsOpen ? 0.5 : 0}
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex="headerMobileNavOverlap"
          transitionProperty="opacity"
          onClick={closeNav}
          css={{ pointerEvents: navIsOpen ? 'auto' : 'none' }}
        />
      </Box>
    </ThemeProvider>
  )
}

PageBodyHeader.mapDataToProps = ({ data, meta }) => {
  const page = meta?.page

  return {
    backgroundColor: data?.primary?.background_color,
    linkColor: data?.primary?.link_color,
    navigationUID: data?.primary?.navigation?.uid,
    logoImageFluid: getImageFluid(data?.primary?.logo),
    logoImageURL: data?.primary?.logo?.url,
    logoImageAlt: data?.primary?.logo?.alt,
    primaryLinks: page?.data?.primary_links?.map(item => ({
      name: item?.name?.text,
      href: item?.link?.url,
      target: item?.link?.target,
    })),
    secondaryLinks: page?.data?.secondary_links?.map(item => ({
      name: item?.name?.text,
      href: item?.link?.url,
      target: item?.link?.target,
    })),
  }
}

export const fragment = graphql`
  fragment PageBodyHeader on Query {
    prismicPage(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPageBodyHeader {
            id
            primary {
              background_color
              link_color
              logo {
                alt
                localFile {
                  childImageSharp {
                    fluid(
                      maxWidth: 200
                      quality: 85
                      srcSetBreakpoints: [400]
                      pngCompressionSpeed: 10
                    ) {
                      ...GatsbyImageSharpFluid_noBase64
                    }
                  }
                }
              }
            }
          }
        }
        primary_links {
          name {
            text
          }
          link {
            url
            target
          }
        }
        secondary_links {
          name {
            text
          }
          link {
            url
            target
          }
        }
      }
    }
  }
`

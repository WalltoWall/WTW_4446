import React from 'react'
import { hexToP3 } from '@walltowall/hex-to-p3'
import { a, useSpring } from 'react-spring'

import { useStore } from 'src/hooks'

import { Box, Grid, Flex, Text, ImageContainer, AspectRatio } from 'system'
import {
  PageWrapper,
  DesktopNav,
  ScrollDownIndicator,
  Subheading,
} from 'src/components'
import AssetHero from 'src/assets/hero.jpg'

const FullPage = props => (
  <Flex
    flexDirection="column"
    minHeight="100vh"
    py="116px"
    px="125px"
    {...props}
  />
)

const LargeText = props => (
  <Text
    fontFamily="Inter"
    fontSize="64px"
    fontWeight="black"
    lineHeight="title"
    maxWidth="23ch"
    mb="24px"
    boxStyle="lastNoMargin"
    {...props}
  />
)

const StandardText = props => (
  <Text
    fontFamily="Inter"
    fontSize="32px"
    fontWeight="thin"
    maxWidth="55ch"
    lineHeight="copyTight"
    {...props}
  />
)

const SmallText = props => (
  <Text
    fontFamily="Inter"
    fontSize="18px"
    maxWidth="60ch"
    lineHeight="copy"
    {...props}
  />
)

export const HomePage = () => {
  const isNavOpen = useStore(state => state.isNavOpen)
  const contentAnimStyle = useSpring({
    transform: isNavOpen ? 'translateX(5vw)' : 'translateX(0vw)',
  })

  return (
    <PageWrapper>
      <Grid gridTemplateColumns="90px 1fr" minHeight="100vh">
        <Box>
          <DesktopNav
            position="fixed"
            top={0}
            left={0}
            height="100%"
            zIndex="desktopNav"
          />
        </Box>
        <Box as={a(Box)} overflow="hidden" style={contentAnimStyle}>
          <FullPage minHeight="75vh" position="relative">
            <ImageContainer
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
            >
              <Box
                as="img"
                src={AssetHero}
                height="100%"
                width="100%"
                css={{ objectFit: 'cover' }}
              />
            </ImageContainer>
            <ScrollDownIndicator
              color="#f6be1d"
              position="absolute"
              bottom="20px"
              left="50%"
              transform="translateX(-50%)"
            />
          </FullPage>
          <FullPage minHeight="none" bg={hexToP3('#108594')} color="white">
            <Subheading mb="18px" color={hexToP3('#f6be1d')}>
              What
            </Subheading>
            <LargeText>
              Each year, the AAF-District 13 awards distinguished individuals
              for their contributions to advertising.
            </LargeText>
            <StandardText mb="80px">
              Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor. Maecenas sed diam eget risus varius blandit sit amet non
              magna. Aenean lacinia bibendum nulla sed consectetur.
            </StandardText>
            <Grid gridTemplateColumns="repeat(2, 1fr)" gridGap="64px">
              <Box>
                <Subheading mb="18px" color={hexToP3('#f6be1d')}>
                  When
                </Subheading>
                <LargeText>
                  April 24, 2020
                  <br />6 PM – 9 PM
                </LargeText>
              </Box>
              <Box>
                <Subheading mb="18px" color={hexToP3('#f6be1d')}>
                  Where
                </Subheading>
                <LargeText>
                  The Royal Hawaiian
                  <br />
                  Monarch Room
                </LargeText>
              </Box>
            </Grid>
          </FullPage>
          <FullPage bg={hexToP3('#F6BE1D')} color="white">
            <LargeText>
              The 2020 Pele Judges hail from San Francisco and have worked with
              global clients from Audi to the City of Los Angeles for the
              upcoming 2028 Summer Olympics.
            </LargeText>
          </FullPage>
          <FullPage bg={hexToP3('#EF9037')} color="white">
            <Box flexGrow="1">
              <LargeText>
                Entries are accepted online. Aenean eu leo quam. Pellentesque
                ornare sem lacinia quam venenatis vestibulum.
              </LargeText>
              <StandardText>Entries are due by Feb 4.</StandardText>
            </Box>
            <SmallText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum id ligula porta felis euismod semper.
            </SmallText>
          </FullPage>
        </Box>
      </Grid>
    </PageWrapper>
  )
}

export default HomePage

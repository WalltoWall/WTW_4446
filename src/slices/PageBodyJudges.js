import React, { useMemo, useState } from 'react'
import { graphql } from 'gatsby'
import { linearScale } from 'styled-system-scale'
import { camelCase } from 'tiny-compose-fns'
import { notEmpty, getImageFluid, getRichText } from 'helpers'

import { safeHexToP3 } from 'src/helpers'

import {
  ThemeProvider,
  Box,
  Flex,
  Grid,
  Text,
  ImageContainer,
  Image,
  AspectRatio,
  SVG,
} from 'system'
import {
  BoundedBox,
  StandardGrid,
  Heading,
  Subheading,
  HTMLContent,
  ButtonCircle,
} from 'src/components'
import { ReactComponent as AssetIconPlusSVG } from 'src/assets/icon-plus.svg'
import { ReactComponent as AssetIconMinusSVG } from 'src/assets/icon-minus.svg'

const toggleButtonSVGs = {
  plus: { svg: AssetIconPlusSVG, x: 1, y: 1 },
  minus: { svg: AssetIconMinusSVG, x: 20, y: 8 },
}

export const PageBodyJudges = ({
  backgroundColor = 'white',
  linkColor = 'inherit',
  headlineColor = 'inherit',
  buttonBackgroundColor = 'black',
  buttonColor = 'white',
  textColor = 'inherit',
  headline,
  children,
  ...props
}) => {
  const theme = useMemo(
    () => ({
      colors: {
        background: safeHexToP3(backgroundColor),
        body: safeHexToP3(textColor),
        button: safeHexToP3(buttonColor),
        buttonBackground: safeHexToP3(buttonBackgroundColor),
        headline: safeHexToP3(headlineColor),
        link: safeHexToP3(linkColor),
        subheadline: safeHexToP3(headlineColor),
      },
    }),
    [
      backgroundColor,
      textColor,
      buttonColor,
      buttonBackgroundColor,
      headlineColor,
      linkColor,
    ],
  )

  return (
    <ThemeProvider theme={theme}>
      <BoundedBox as="section" bg="background" {...props}>
        <StandardGrid gridGapScale="xl">
          {headline && (
            <Heading gridColumn="1 / -1" textAlign="center" color="body">
              {headline}
            </Heading>
          )}
          <Grid
            gridColumn="1 / -1"
            maxWidth="l"
            mx="auto"
            gridGapScale="xl"
            width={1}
          >
            {children}
          </Grid>
        </StandardGrid>
      </BoundedBox>
    </ThemeProvider>
  )
}

PageBodyJudges.Judge = ({
  imageSide = 'left',
  name,
  jobTitle,
  location,
  bioHTML,
  imageFluid,
  imageURL,
  imageAlt,
  ...props
}) => {
  const [bioIsOpen, setBioIsOpen] = useState(false)
  const toggleBioIsOpen = () => setBioIsOpen(state => !state)

  const imageIsOnLeft = imageSide === 'left'
  const svg = toggleButtonSVGs[bioIsOpen ? 'minus' : 'plus']

  return (
    <Grid
      gridAutoFlow="dense"
      gridTemplateColumns={['1fr', 'repeat(2, 1fr)']}
      gridRowGapScale="m"
      gridColumnGapScale="xxl"
      alignItems="center"
    >
      <ImageContainer gridColumn={[null, imageIsOnLeft ? 1 : 2]}>
        <AspectRatio x={6} y={7}>
          <Image fluid={imageFluid} src={imageURL} alt={imageAlt} />
        </AspectRatio>
      </ImageContainer>
      <Box gridColumn={[null, imageIsOnLeft ? 2 : 1]}>
        {name && (
          <Heading fontSizeScale="xl" mbScale="t-">
            {name}
          </Heading>
        )}
        {jobTitle && (
          <Text as="p" mbScale="t-">
            {jobTitle}
          </Text>
        )}
        {location && (
          <Subheading as="p" color="body" mbScale="t-">
            {location}
          </Subheading>
        )}
        {bioHTML && (
          <Box mtScale="s">
            <Flex alignItems="center">
              <ButtonCircle
                height={linearScale('30px', '70px', { count: 5 })}
                width={linearScale('30px', '70px', { count: 5 })}
                mrScale="t"
                onClick={toggleBioIsOpen}
              >
                <SVG
                  svg={svg.svg}
                  x={svg.x}
                  y={svg.y}
                  width={linearScale('12px', '30px', { count: 5 })}
                />
              </ButtonCircle>
              <Subheading as="span" fontSizeScale="m" textStyle="caps">
                Bio
              </Subheading>
            </Flex>
            <HTMLContent
              mtScale="t"
              html={bioHTML}
              display={bioIsOpen ? 'block' : 'none'}
            />
          </Box>
        )}
      </Box>
    </Grid>
  )
}

PageBodyJudges.mapDataToProps = ({ data }) => ({
  backgroundColor: data?.primary?.background_color,
  headlineColor: data?.primary?.headline_color,
  textColor: data?.primary?.text_color,
  linkColor: data?.primary?.link_color,
  buttonBackgroundColor: data?.primary?.button_background_color,
  buttonTextColor: data?.primary?.button_text_color,
  headline: data?.primary?.headline?.text,
  children: data?.items?.map(item => (
    <PageBodyJudges.Judge
      imageSide={notEmpty(camelCase(item?.image_side))}
      name={item?.name?.text}
      jobTitle={item?.job_title?.text}
      location={item?.location?.text}
      bioHTML={getRichText(item?.bio)}
      imageFluid={getImageFluid(item?.image)}
      imageURL={item?.image?.url}
      imageAlt={item?.image?.alt}
    />
  )),
})

export const fragment = graphql`
  fragment PageBodyJudges on Query {
    prismicPage(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPageBodyJudges {
            id
            primary {
              background_color
              headline_color
              text_color
              link_color
              button_background_color
              button_text_color
              headline {
                text
              }
            }
            items {
              image_side
              name {
                text
              }
              job_title {
                text
              }
              location {
                text
              }
              bio {
                text
                html
              }
              image {
                alt
                localFile {
                  childImageSharp {
                    fluid(
                      maxWidth: 1000
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
      }
    }
  }
`

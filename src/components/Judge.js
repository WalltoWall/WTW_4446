import React, { useState } from 'react'
import { linearScale } from 'styled-system-scale'

import {
  Box,
  Grid,
  Flex,
  Text,
  ImageContainer,
  Image,
  AspectRatio,
  SVG,
} from 'system'
import { Heading, Subheading, ButtonCircle, HTMLContent } from 'src/components'
import { ReactComponent as AssetIconPlusSVG } from 'src/assets/icon-plus.svg'
import { ReactComponent as AssetIconMinusSVG } from 'src/assets/icon-minus.svg'

const toggleButtonSVGs = {
  plus: { svg: AssetIconPlusSVG, x: 1, y: 1 },
  minus: { svg: AssetIconMinusSVG, x: 20, y: 8 },
}

export const Judge = ({
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
      {...props}
    >
      <Flex
        justifyContent={['center', imageIsOnLeft ? 'flex-end' : 'flex-start']}
        gridColumn={[null, imageIsOnLeft ? 1 : 2]}
      >
        <ImageContainer maxWidth={['30rem', 'none']} width="100%">
          <AspectRatio x={6} y={7}>
            <Image fluid={imageFluid} src={imageURL} alt={imageAlt} />
          </AspectRatio>
        </ImageContainer>
      </Flex>
      <Flex
        justifyContent={[null, imageIsOnLeft ? 'flex-start' : 'flex-end']}
        gridColumn={[null, imageIsOnLeft ? 2 : 1]}
      >
        <Box maxWidth={[null, '30ch']}>
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
      </Flex>
    </Grid>
  )
}

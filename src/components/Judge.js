import React, { useState } from 'react'
import { linearScale } from 'styled-system-scale'
import Expand from 'react-expand-animated'

import { Box, Grid, Flex, Text, Image, SVG } from 'system'
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
      bg="background"
      gridAutoFlow="dense"
      gridTemplateColumns={['1fr', 'repeat(2, 1fr)']}
      alignItems="center"
      gridColumnGapScale="l"
      gridRowGapScale={['l', 0]}
      pxScale="l"
      {...props}
    >
      {(imageFluid || imageURL) && (
        <Image
          fluid={imageFluid}
          src={imageURL}
          alt={imageAlt}
          objectFit="contain"
          width="75%"
          height="auto"
          gridColumn={['auto', imageIsOnLeft ? 1 : 2]}
          justifySelf={[null, imageIsOnLeft ? 'end' : 'start']}
        />
      )}

      <Text
        display={[null, 'flex']}
        flexDirection={[null, 'column']}
        alignSelf="center"
        gridColumn={['auto', imageIsOnLeft ? 2 : 1]}
        justifySelf={[null, imageIsOnLeft ? 'start' : 'end']}
        textAlign={[null, imageIsOnLeft ? 'left' : 'right']}
        maxWidth={[null, '75%']}
        pyScale={[0, 'l', 's']}
      >
        {name && (
          <Heading fontSizeScale="xl" mbScale="t-">
            {name}
          </Heading>
        )}
        {jobTitle && (
          <Text as="p" mbScale="t-" style={{ whiteSpace: 'pre-line' }}>
            {jobTitle}
          </Text>
        )}
        {location && (
          <Subheading
            as="p"
            color="body"
            mbScale="t-"
            style={{ whiteSpace: 'pre-line' }}
          >
            {location}
          </Subheading>
        )}
        {bioHTML && (
          <Flex
            alignItems="center"
            mtScale="s"
            ml={[null, imageIsOnLeft ? null : 'auto']}
          >
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
            <Subheading
              as="span"
              fontSizeScale="m"
              textStyle="caps"
              color="buttonBackground"
            >
              Bio
            </Subheading>
          </Flex>
        )}
      </Text>

      {bioHTML && (
        <Box gridColumn="1 / -1" maxWidth={['45ch', '50ch']} mx={[0, 'auto']}>
          <Expand open={bioIsOpen}>
            <HTMLContent
              html={bioHTML}
              fontSizeScale="s"
              pbScale="l"
              ptScale={[0, 'l']}
            />
          </Expand>
        </Box>
      )}
    </Grid>
  )
}

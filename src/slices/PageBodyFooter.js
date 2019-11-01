import React from 'react'
import { graphql } from 'gatsby'
import { linearScale } from 'styled-system-scale'
import { hexToP3 } from '@walltowall/hex-to-p3'

import { useSettingsData } from 'src/hooks'

import { Flex, Link, SVG, Text } from 'system'
import { BoundedBox } from 'src/components'
import { ReactComponent as AssetLogoAAFHawaiiSVG } from 'src/assets/logo-aaf-hawaii.svg'
import { ReactComponent as AssetIconFacebookSVG } from 'src/assets/icon-facebook.svg'
import { ReactComponent as AssetIconInstagramSVG } from 'src/assets/icon-instagram.svg'

export const PageBodyFooter = ({
  backgroundColor,
  linkColor = 'inherit',
  textColor = 'inherit',
  fontFamily = 'inherit',
  ...props
}) => {
  const settings = useSettingsData()
  const isTransparent = !Boolean(backgroundColor)

  const backgroundColorP3 = hexToP3(backgroundColor)
  const linkColorP3 = hexToP3(linkColor)
  const textColorP3 = hexToP3(textColor)

  return (
    <BoundedBox
      pyScale="m-"
      as="footer"
      bg={backgroundColorP3}
      color={textColorP3}
      position={isTransparent ? 'absolute' : 'static'}
      top={0}
      right={0}
      left={0}
      zIndex="header"
      maxWidth="none"
      {...props}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Link href="" mrScale="l">
          <SVG
            x={136.1}
            y={85.04}
            svg={AssetLogoAAFHawaiiSVG}
            width={linearScale('50px', '120px', { count: 5 })}
            color={textColor}
          />
        </Link>
        <Flex alignItems="center">
          <Link href="" color={linkColorP3} mrScale="s">
            <SVG
              x={31}
              y={57}
              svg={AssetIconFacebookSVG}
              width={linearScale('12px', '30px', { count: 5 })}
              color={textColor}
            />
          </Link>
          <Link href="" color={linkColorP3} mrScale="m">
            <SVG
              x={1}
              y={1}
              svg={AssetIconInstagramSVG}
              width={linearScale('23px', '60px', { count: 5 })}
              color={textColor}
            />
          </Link>
          <Text as="p" fontFamily={fontFamily} textAlign="right">
            {settings?.site_copyright?.text}
          </Text>
        </Flex>
      </Flex>
    </BoundedBox>
  )
}

PageBodyFooter.mapDataToProps = ({ data }) => ({
  backgroundColor: data?.primary?.background_color,
  linkColor: data?.primary?.link_color,
  textColor: data?.primary?.text_color,
  fontFamily: data?.primary?.font_family?.text,
})

export const fragment = graphql`
  fragment PageBodyFooter on Query {
    prismicPage(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPageBodyFooter {
            id
            primary {
              background_color
              link_color
              text_color
              font_family {
                text
              }
            }
          }
        }
      }
    }
  }
`

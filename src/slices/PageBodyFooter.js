import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { linearScale } from 'styled-system-scale'

import { safeHexToP3 } from 'src/helpers'
import { useSettingsData } from 'src/hooks'

import { ThemeProvider, Grid, SVG, Text } from 'system'
import { BoundedBox, Anchor } from 'src/components'
import { ReactComponent as AssetLogoAAFDistrict13SVG } from 'src/assets/logo-aaf-district-13.svg'
import { ReactComponent as AssetIconFacebookSVG } from 'src/assets/icon-facebook.svg'
import { ReactComponent as AssetIconInstagramSVG } from 'src/assets/icon-instagram.svg'

export const PageBodyFooter = ({
  backgroundColor,
  linkColor = 'inherit',
  textColor = 'inherit',
  copyright,
  ...props
}) => {
  const isTransparent = !Boolean(backgroundColor)
  const settingsData = useSettingsData()

  const theme = useMemo(
    () => ({
      colors: {
        background: safeHexToP3(backgroundColor),
        body: safeHexToP3(textColor),
        link: safeHexToP3(linkColor),
      },
    }),
    [backgroundColor, linkColor, textColor],
  )

  return (
    <ThemeProvider theme={theme}>
      <BoundedBox
        pyScale="m"
        as="footer"
        bg="background"
        color="body"
        position={isTransparent ? 'absolute' : 'static'}
        top={0}
        right={0}
        left={0}
        zIndex="header"
        maxWidth="none"
        pxScale={['l', null, 'xl']}
        {...props}
      >
        <Grid
          gridGapScale="m"
          gridTemplateColumns="auto 1fr auto auto"
          alignItems="center"
        >
          <Anchor href={settingsData?.aaf_hawaii_link?.url} target="_blank">
            <SVG
              x={74}
              y={69}
              svg={AssetLogoAAFDistrict13SVG}
              width={linearScale('32px', '74px', { count: 5 })}
            />
          </Anchor>
          <Text as="p" fontSizeScale="t">
            {copyright ||
              `© ${new Date().getFullYear()} Pele Awards. All rights reserved.`}
          </Text>
          <Anchor
            href={`https://facebook.com/${settingsData?.facebook_handle?.text}`}
            target="_blank"
          >
            <SVG
              x={31}
              y={57}
              svg={AssetIconFacebookSVG}
              width={linearScale('16px', '30px', { count: 5 })}
            />
          </Anchor>
          <Anchor
            href={`https://instagram.com/${settingsData?.instagram_handle?.text}`}
            target="_blank"
          >
            <SVG
              x={1}
              y={1}
              svg={AssetIconInstagramSVG}
              width={linearScale('31px', '60px', { count: 5 })}
            />
          </Anchor>
        </Grid>
      </BoundedBox>
    </ThemeProvider>
  )
}

PageBodyFooter.mapDataToProps = ({ data }) => ({
  backgroundColor: data?.primary?.background_color,
  linkColor: data?.primary?.link_color,
  textColor: data?.primary?.text_color,
  copyright: data?.primary?.copyright?.text,
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
              copyright {
                text
              }
            }
          }
        }
      }
    }
  }
`

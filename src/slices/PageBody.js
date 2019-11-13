import { graphql } from 'gatsby'

// 1. Import your slice
import { PageBodyEntryDetails } from './PageBodyEntryDetails'
import { PageBodyEventDetails } from './PageBodyEventDetails'
import { PageBodyFooter } from './PageBodyFooter'
import { PageBodyFullWidthImage } from './PageBodyFullWidthImage'
import { PageBodyHeader } from './PageBodyHeader'
import { PageBodyJudges } from './PageBodyJudges'
import { PageBodyText } from './PageBodyText'

// 2. Add your slice
export const slicesMap = {
  PageBodyEntryDetails,
  PageBodyEventDetails,
  PageBodyFooter,
  PageBodyFullWidthImage,
  PageBodyHeader,
  PageBodyJudges,
  PageBodyText,
}

// 3. Add your slice fragment
export const fragment = graphql`
  fragment SlicesPageBody on Query {
    ...PageBodyEntryDetails
    ...PageBodyEventDetails
    ...PageBodyFooter
    ...PageBodyFullWidthImage
    ...PageBodyHeader
    ...PageBodyJudges
    ...PageBodyText

    prismicPage(uid: { eq: $uid }) {
      uid
    }

    # The following slices do not have fragments:
  }
`

// Used for react-map-to-components
const mapKeys = Object.keys(slicesMap)

export const mapDataToContext = {}
for (let i = 0; i < mapKeys.length; i++)
  mapDataToContext[mapKeys[i]] = slicesMap[mapKeys[i]].mapDataToContext

export const mapDataToProps = {}
for (let i = 0; i < mapKeys.length; i++)
  mapDataToProps[mapKeys[i]] = slicesMap[mapKeys[i]].mapDataToProps

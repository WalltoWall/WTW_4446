import { graphql } from 'gatsby'

// 1. Import your slice
import { PageBodyEntryDetails } from './PageBodyEntryDetails'
import { PageBodyEventDetails } from './PageBodyEventDetails'
import { PageBodyFooter } from './PageBodyFooter'
import { PageBodyFullWidthImage } from './PageBodyFullWidthImage'
import { PageBodyHeader } from './PageBodyHeader'
import { PageBodyJudges } from './PageBodyJudges'
import { PageBodyPastYears } from './PageBodyPastYears'
import { PageBodyText } from './PageBodyText'

// 2. Add your slice
export const slicesMap = {
  PageBodyEntryDetails,
  PageBodyEventDetails,
  PageBodyFooter,
  PageBodyFullWidthImage,
  PageBodyHeader,
  PageBodyJudges,
  PageBodyPastYears,
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
    ...PageBodyPastYears
    ...PageBodyText

    prismicPage(uid: { eq: $uid }) {
      uid
    }

    # The following slices do not have fragments:
  }
`

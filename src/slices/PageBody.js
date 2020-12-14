import { graphql } from 'gatsby'

// 1. Import your slice
import { PageBodyAnchor } from './PageBodyAnchor'
import { PageBodyEntryDetails } from './PageBodyEntryDetails'
import { PageBodyEventDetails } from './PageBodyEventDetails'
import { PageBodyFooter } from './PageBodyFooter'
import { PageBodyFullWidthImage } from './PageBodyFullWidthImage'
import { PageBodyHeader } from './PageBodyHeader'
import { PageBodyJudges } from './PageBodyJudges'
import { PageBodyPastYears } from './PageBodyPastYears'
import { PageBodyText } from './PageBodyText'
import { PageBodyPeopleOfTheYear } from './PageBodyPeopleOfTheYear'
import { PageBodyVideo } from './PageBodyVideo'

// 2. Add your slice
export const slicesMap = {
  PageBodyAnchor,
  PageBodyEntryDetails,
  PageBodyEventDetails,
  PageBodyFooter,
  PageBodyFullWidthImage,
  PageBodyHeader,
  PageBodyJudges,
  PageBodyPastYears,
  PageBodyText,
  PageBodyPeopleOfTheYear,
  PageBodyVideo,
}

// 3. Add your slice fragment
export const fragment = graphql`
  fragment SlicesPageBody on Query {
    ...PageBodyAnchor
    ...PageBodyEntryDetails
    ...PageBodyEventDetails
    ...PageBodyFooter
    ...PageBodyFullWidthImage
    ...PageBodyHeader
    ...PageBodyJudges
    ...PageBodyPastYears
    ...PageBodyText
    ...PageBodyPeopleOfTheYear
    ...PageBodyVideo

    prismicPage(uid: { eq: $uid }) {
      uid
    }

    # The following slices do not have fragments:
  }
`

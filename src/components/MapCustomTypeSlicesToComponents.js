import React, { useMemo } from 'react'
import MapSlicesToComponents from '@walltowall/react-map-slices-to-components'
import { camelCase } from 'tiny-compose-fns/noFp'
import { useLocation } from '@walltowall/hooks'

export const MapCustomTypeSlicesToComponents = ({
  data,
  meta: rawMeta,
  customType: rawCustomType = 'page',
  sliceZoneId = 'body',
  slicesMap,
  slicesMiddleware,
  location: passedLocation,
  ...props
}) => {
  const location = useLocation()

  const customType = camelCase(`prismic ${rawCustomType}`)
  const slices = data?.[customType]?.data?.[sliceZoneId]

  const meta = useMemo(
    () => ({
      rootData: data,
      page: data?.prismicPage,
      location: passedLocation ?? location,
      ...rawMeta,
    }),
    [passedLocation, location, data, rawMeta],
  )

  return (
    <MapSlicesToComponents
      list={slices}
      map={slicesMap}
      meta={meta}
      listMiddleware={slicesMiddleware}
      {...props}
    />
  )
}

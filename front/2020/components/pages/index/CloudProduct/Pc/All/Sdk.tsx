import React from 'react'
import { nameMap, urlMap, Landpage, descMap } from 'constants/landpage'
import Text from '../share/Text'

export default function Sdk() {
  return (
    <Text
      name="SDK"
      url={urlMap[Landpage.Sdk]}
      tooltipTitle={nameMap[Landpage.Sdk]}
      tooltipDesc={descMap[Landpage.Sdk]}
    />
  )
}

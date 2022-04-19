import React from 'react'
import { useQueryValue } from 'hooks/url'
import { Activity, urlMap } from 'constants/activity'
import Redirect from 'components/Redirect'

export default function Detail() {
  const [id] = useQueryValue('id', '')

  if (!id) {
    return (
      <Redirect target="/404" />
    )
  }

  return (
    <Redirect target={`${urlMap[Activity.Detail]}/${id}`} keepQuery={false} />
  )
}

/**
 * @file mongo api relative hooks
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { useMemo } from 'react'
import { useInjection } from 'qn-fe-core/di'

import { MongoApiBaseClient, MongoApiStdClient } from 'apis/mongo-api-client'

export function useMongoApiStdClient(resourcePrefix: string) {
  const mongoApiBaseClient = useInjection(MongoApiBaseClient)
  const mongoApiStdClient = useMemo(
    () => new MongoApiStdClient(resourcePrefix, mongoApiBaseClient),
    [resourcePrefix, mongoApiBaseClient]
  )
  return mongoApiStdClient
}

/**
 * @file mongo api relative hooks
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { useMemo } from 'react'
import { useInjection } from 'qn-fe-core/di'

import { MongoApiBaseClient, MongoApiStdClient } from 'apis/mongo-api-client'

export function useMongoApiStdClient(resource: string) {
  const mongoApiBaseClient = useInjection(MongoApiBaseClient)
  const mongoApiStdClient = useMemo(
    () => new MongoApiStdClient(resource, mongoApiBaseClient),
    [resource, mongoApiBaseClient]
  )
  return mongoApiStdClient
}

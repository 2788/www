export const apiPrefix = '/api/proxy'
export const apiMongo = `${apiPrefix}/mongo`
export const apiBlog = `${apiPrefix}/blog/api`

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

// Mock Fetch
import 'isomorphic-fetch'

const mockDatas = new Map<RegExp, any>()

class MockRepsonse extends Response {
  body: any

  constructor(data: any) {
    super()
    this.body = data
  }

  json() {
    return Promise.resolve(this.body)
  }
}

function transfromUrlToRegex(input: string) {
  input = input.replace('?', '\\?')

  return new RegExp(`^${input}$`)
}

export function addMockData(input: string, data: any) {
  const pattern = transfromUrlToRegex(input)

  mockDatas.set(pattern, data)
}

export function fetch(input: RequestInfo, _init?: RequestInit): Promise<Response> {
  const patterns = Array.from(mockDatas.keys()).reverse()

  const hit = patterns.find((pattern) => !!input.toString().match(pattern))

  if (hit) {
    return Promise.resolve(new MockRepsonse(mockDatas.get(hit)))
  } else {
    return Promise.resolve(new MockRepsonse({
      code: 404,
      message: 'Page not found'
    }))
  }
}

export function genData(data: any) {
  return {
    code: 200,
    data
  }
}

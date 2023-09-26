export function hasCode(data: any): data is { code: number } {
  return Boolean(data?.code) && typeof data.code === 'number'
}

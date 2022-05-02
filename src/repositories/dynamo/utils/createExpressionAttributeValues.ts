export const createExpressionAttributeValues = (filter?: any): any | undefined => {
  if (!filter || JSON.stringify(filter) === '{}') return undefined
  const filterKeys = Object.keys(filter)
  return filterKeys.reduce((pre, cur) => {
    const key = `:${cur}`
    const value = filter[cur]
    return { ...pre, [key]: value }
  }, {})
}

export const createExpressionAttributeNames = (filter?: any): any | undefined => {
  if (!filter || JSON.stringify(filter) === '{}') return undefined
  const filterKeys = Object.keys(filter)
  return filterKeys.reduce((pre, cur) => {
    const key = `#${cur}`
    return { ...pre, [key]: cur }
  }, {})
}

export const createUpdateExpression = (filter?: any): string | undefined => {
  if (!filter || JSON.stringify(filter) === '{}') return undefined
  const tmp: string[] = []
  const filterKeys = Object.keys(filter)
  tmp.push('SET ')
  filterKeys.forEach((key) => {
    tmp.push(`#${key} = :${key}`)
    tmp.push(', ')
  })
  if (tmp.length > 0) {
    tmp.pop()
  }
  return tmp.join('')
}

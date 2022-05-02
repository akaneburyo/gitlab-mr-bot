export const replaceTemplate = (string: string, values: Record<string, string>) => {
  return string.replace(/\$\{(.*?)\}/g, (all, key) => {
    return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : ''
  })
}

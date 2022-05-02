import uuid4 from 'uuid4'

export const createUUID = () => {
  return `${uuid4()}`
}

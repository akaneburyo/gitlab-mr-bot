/* eslint-disable */
import type * as Types from '../@types'

export type Methods = {
  /** Returns an created bot id. */
  post: {
    status: 201
    /** Success */
    resBody: Types.CreateBotResponse
    reqBody: Types.CreateBotRequest
  }
}

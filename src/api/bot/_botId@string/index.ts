/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  /** Returns Bot settings excepting token. */
  get: {
    status: 200
    /** Success */
    resBody: Types.GetBotResponse
  }

  /** Returns an updated bot id. */
  put: {
    status: 201
    /** Success */
    resBody: Types.UpdateBotResponse
    reqBody: Types.UpdateBotRequest
  }

  /** Returns an deleted bot id. */
  delete: {
    status: 200
    /** Success */
    resBody: Types.DeleteBotResponse
  }
}

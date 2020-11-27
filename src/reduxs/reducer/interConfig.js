/**
 * @file actions dispatch reducer
 */

import * as types from '../actionTypes/interConfig'

const interConfig = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case types.GET_CANALIZATION_ELEMENT:
      return Object.assign({}, state, { primitiveInfo: payload })
    default:
      return state
  }
}

export default interConfig
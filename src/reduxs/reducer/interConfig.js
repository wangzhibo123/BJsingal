/**
 * @file actions dispatch reducer
 */

import * as types from '../actionTypes/interConfig'

const interConfig = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case types.GET_CANALIZATION_ELEMENT:
      return Object.assign({}, state, { primitiveInfo: payload })
    case types.GET_DEVICE_PICLIST:
      return Object.assign({}, state, { devicePiclist: payload })
    case types.EDIT_DEVICE_INFO:
      return Object.assign({}, state, { editDeviceInfo: payload })
    case types.POST_START_CONTROL:
      return Object.assign({}, state, { startControl: payload })
    default:
      return state
  }
}

export default interConfig
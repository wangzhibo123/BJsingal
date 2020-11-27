/**
 * @file actions
 */

import * as types from '../actionTypes/interConfig'
import RestUtil from '../../container/utils/getInterfaceData'
import {
  API_CANALIZATION_ELEMENT,
} from '../actionTypes/API'

// 图元信息id
export const getPrimitiveInfo = (interId) => {
  return async (dispatch) => {
    try {
      console.log(API_CANALIZATION_ELEMENT)
      const result = await RestUtil.post(`${API_CANALIZATION_ELEMENT}?unit_id=${interId}`)
      console.log(result)
      if (result.data.code === '1') {
        dispatch({ type: types.GET_CANALIZATION_ELEMENT, payload: result.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

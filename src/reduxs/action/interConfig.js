/**
 * @file actions
 */

import * as types from '../actionTypes/interConfig'
import RestUtil from '../../container/utils/getInterfaceData'
import {
  API_CANALIZATION_ELEMENT, API_DEVICE_LIST, API_IMGURL, API_START_CONTROL,
} from '../actionTypes/API'

// 执行
export const getStartControl = (params) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.post(`${API_START_CONTROL}`, params)
      if (result.data.code === 200) {
        dispatch({ type: types.POST_START_CONTROL, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}
// 图元信息id
export const getPrimitiveInfo = (interId) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.post(`${API_CANALIZATION_ELEMENT}?unit_id=${interId}`)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_CANALIZATION_ELEMENT, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

// 图元列表
export const getDevicePiclist = (ids = [1,3,6,7,9,10]) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.post(API_DEVICE_LIST, ids)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_DEVICE_PICLIST, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

// 发送编辑图元信息
export const getEditDeviceInfo = (obj) => {
  return (dispatch) => {
    dispatch({ type: types.EDIT_DEVICE_INFO, payload: obj })
  }
}



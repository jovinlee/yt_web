import request from '@/utils/request'

export function addBizData(form) {
  return request({
    url: '/statement/yt/addBizData',
    method: 'GET',
    params: form
  })
}
export function bizDataList(form) {
    return request({
      url: '/statement/yt/bizDataList',
      method: 'GET',
      params: form
    })
}
export function updateBizData(form) {
    return request({
      url: '/statement/yt/updateBizData',
      method: 'GET',
      params: form
    })
}
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
export function getReport(form){
  return request({
    url: '/statement/yt/export',
    method: 'GET',
    params: form
  })
}
export function fileList(form){
  return request({
    url: '/statement/yt/fileList',
    method: 'GET',
    params: form
  })
}
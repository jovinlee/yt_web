import request from '@/utils/request'

export function addRechargeRecord(form) {
  return request({
    url: '/statement/yt/addRechargeRecord',
    method: 'GET',
    params: form
  })
}
export function rechargeRecordList(form) {
    return request({
      url: '/statement/yt/rechargeRecordList',
      method: 'GET',
      params: form
    })
}
export function updateRechargeRecord(form) {
    return request({
      url: '/statement/yt/updateRechargeRecord',
      method: 'GET',
      params: form
    })
}
import request from '@/utils/request'

export function addUser(form) {
  return request({
    url: '/statement/yt/addUser',
    method: 'GET',
    params: form
  })
}
export function userList(pageNum, pageSize) {
  return request({
    url: '/statement/yt/userList',
    method: 'GET',
    params: {
      pageNum,
      pageSize
    }
  })
}
export function updateUser(form) {
  return request({
    url: '/statement/yt/updateUser',
    method: 'GET',
    params: form
  })
}
export function deleteUser(rowId) {
  return request({
    url: '/statement/yt/deleteUser',
    method: 'GET',
    params: rowId
  })
}
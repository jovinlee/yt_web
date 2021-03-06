import request from '@/utils/request'

export function findPermissions(params) {
  return request({
    url:'/sys/SysPermission/findPermissions',
    method:'get',
    params:params
  })
}
export function treeList(params) {
  return request({
    url:'/sys/SysPermission/treeList',
    method:'get',
    params:params
  })
}
export function fetchList(params) {
  return request({
    url:'/sys/SysPermission/list',
    method:'get',
    params:params
  })
}
export function createPermission(data) {
  return request({
    url:'/sys/SysPermission/create',
    method:'post',
    data:data
  })
}
export function updateShowStatus(data) {
  return request({
    url:'/sys/SysPermission/update/showStatus',
    method:'post',
    data:data
  })
}

export function updateFactoryStatus(data) {
  return request({
    url:'/sys/SysPermission/update/factoryStatus',
    method:'post',
    data:data
  })
}

export function deletePermission(id) {
  return request({
    url:'/sys/SysPermission/delete/'+id,
    method:'get',
  })
}

export function getPermission(id) {
  return request({
    url:'/sys/SysPermission/'+id,
    method:'get',
  })
}

export function updatePermission(id,data) {
  return request({
    url:'/sys/SysPermission/update/'+id,
    method:'post',
    data:data
  })
}


import request from '@/utils/request'

export function login(name, password) {
  console.log(3);
  return request({
    url: '/statement/yt/login',
    method: 'post',
    data: {
      name,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/sys/sysUser/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/sys/sysUser/logout',
    method: 'post'
  })
}

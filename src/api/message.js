import request from '@/utils/request'

export function addMessage(form) {
    return request({
        url: '/statement/yt/addMsg',
        method: 'GET',
        params: form
    })
}
export function messageList(form) {
    return request({
        url: '/statement/yt/messageList',
        method: 'GET',
        params: form
    })
}

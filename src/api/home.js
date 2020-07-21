import request from '@/utils/request'

export function getHomeData(params) {
    return request({
        url: '/statement/yt/currentBizData',
        method: 'get',
        params
    })
}
import request from '@/utils/request'

export function getPlatInfo() {
    return request({
        url: '/plat/platInfo/myself',
        method: 'get'
    })
}
export function getHomeData() {
    return request({
        url: '/plat/platInfo/getHomeData',
        method: 'get'
    })
}
export function queryStatisticsData(params) {
    return request({
        url: '/plat/platInfo/queryStatisticsData',
        method: 'get',
        params
    })
}
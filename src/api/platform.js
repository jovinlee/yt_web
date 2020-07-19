import request from '@/utils/request'
//购买记录
export function accountAddRecord(params) {
    const {appid, pageNum,pageSize} = params;
    return request({
        url: '/plat/platInfo/accountAddRecord',
        method: 'get',
        params: params
    })
}
//扣积分记录
export function accountSubtractRecord(params) {
    const {appid, pageNum,pageSize} = params;
    return request({
        url: '/plat/platInfo/accountSubtractRecord',
        method: 'get',
        params: params
    })
}
//获取平台下的用户列表	
export function getMembers(params) {
    return request({
        url: '/plat/platInfo/getMembers',
        method: 'get',
        params
    })
}
//获取所有平台
export function getAllPlat() {
    return request({
        url: '/admin/platinfo/selectOption',
        method: 'get'
    })
}
//获取兑换记录
export function getMemberChangeRecord(params) {
    return request({
        url: '/plat/platInfo/getMemberChangeRecord',
        method: 'get',
        params
    })
}
//获取消费记录
export function getMemberBalanceRecord(params) {
    return request({
        url: '/plat/platInfo/getMemberBalanceRecord',
        method: 'get',
        params
    })
}

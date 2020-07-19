import request from '@/utils/request'
//所有平台列表信息
export function getPlatInfoList() {
    return request({
        url: '/admin/platinfo/getPlatInfoList',
        method: 'get'
    })
}



//更新平台信息
export function updatePlatform(params) {
    const {id,appid, appName,appKey,whiteIp} = params;
    return request({
        url: '/admin/platinfo/updatePlatform',
        method: 'post',
        data: params
    })
}


//给平台增加积分 appid  JF积分数   amount 金额
export function addJF(params) {
    const {appid, JF,amount} = params;
    return request({
        url: '/admin/platinfo/addJF',
        method: 'get',
        params: params
    })

}
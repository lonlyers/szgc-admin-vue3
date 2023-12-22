import request from '@/utils/request'

const urlPorxy = '/drsp-patrol'
// 路线规划分页
export function routePlanList(data) {
    return request({
        url: `${urlPorxy}/api/patrol/place/getPatrolPage`,

        data: {
            proCode: '330624000183', // 工程编码
            ...data
        }
    })
}

// 编辑巡查路线

export function upPatrolRouteLine(data) {
    return request({
        url: `${urlPorxy}/api/patrol/place/modify`,
        data: {
            proCode: '330624000183', // 工程编码
            proType: 'att_res_lm_base', // 工程类型
            proName: '钦寸水库',
            ...data
        }
    })
}
// 新增巡查路线

export function addPatrolRouteLine(data) {
    return request({
        url: `${urlPorxy}/api/patrol/place/add`,

        data: {
            proCode: '330624000183', // 工程编码
            proType: 'att_res_lm_base', // 工程类型
            proName: '钦寸水库',
            ...data
        }
    })
}

// 删除巡查路线
export function delPatrolRouteLine(data) {
    return request({
        url: `${urlPorxy}/api/patrol/place/del`,
        data
    })
}

// 获取巡查人员
export function patrolUser() {
    return request({
        url: `${urlPorxy}/api/newPatrol/process/getUserList`,
        method: 'post',
        data: {
            proType: 'att_res_lm_base', // 工程类型
            proCode: '330624000183', // 工程编码
            trueName: ''
        }
    })
}

// 获取详情路线
export function patrolDetail(data) {
    return request({
        url: `${urlPorxy}/api/patrol/place/detail`,
        data,
        timeout: 50000
    })
}

// 新增路线点位

export function addRouteLinePoint(data) {
    return request({
        url: `${urlPorxy}/api/patrol/place/addPoints`,
        data,
        timeout: 50000
    })
}

// 二维码管理
export function qrCodeList() {
    return request({
        url: `${urlPorxy}/api/patrol/place/findQRList`,
        data: {
            proCode: '330624000183', // 工程编码
            proType: 'att_res_lm_base' // 工程类型
        }
    })
}
// 二维码管理获取图片
export function getQrCodeImage(data) {
    return request({
        url: `${urlPorxy}/api/patrol/place/findQR`,
        data
    })
}

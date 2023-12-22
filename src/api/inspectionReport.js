import request from '@/utils/request'

const urlPorxy = '/drsp-patrol'
// 路线规划分页
export function routePlanList(data) {
    return request({
        url: `${urlPorxy}/api/patrol/report/placeList`,

        data: {
            proCode: '330624000183',
            proType: 'att_res_lm_base'
        }
    })
}
// 巡查日历
export function patrolCalendar(data) {
    return request({
        url: `${urlPorxy}/api/patrol/dailyDetail/listPatDay`,

        data: {
            proCode: '330624000183',
            ...data
        }
    })
}

// 查询一天巡查记录
export function oneDayPatrolJl(data) {
    return request({
        url: `${urlPorxy}/api/patrol/report/listByDay`,

        data
    })
}

// 获取巡查记录详情
export function patrolJlDetail(data) {
    return request({
        url: `${urlPorxy}/api/patrol/report`,
        data
    })
}
// 获取巡查轨迹
export function patrolJlTrail(data) {
    return request({
        url: `${urlPorxy}/api/patrol/dailyDetail/listCheckPoint`,
        data
    })
}

// 获取巡查台账列表

export function patrolList(data) {
    return request({
        url: `${urlPorxy}/api/patrol/qincun/pageStandingBook`,
        method: 'post',
        data: {
            proType: 'att_res_lm_base', // 工程类型
            proCode: '330624000183', // 工程编码
            ...data
        }
    })
}
// 获取巡查台账pdf
export function patrolAccountDown(data) {
    return request({
        url: `${urlPorxy}/api/patrol/qincun/downLoadStandingBook`,
        method: 'post',
        data
    })
}

import request from '@/utils/request'

const urlPorxy = '/drsp-patrol'
// 巡查处理分页
export function patrolProcessList(data) {
    return request({
        url: `${urlPorxy}/api/newPatrol/process/pageRemind`,

        data: data
    })
}
// 获取所有巡查事项

export function allPatrolItem(data) {
    return request({
        url: `${urlPorxy}/api/newPatrol/historyQuery/getAllItemList`,
        method: 'post',
        timeout: 20000,
        data
    })
}

// 获取巡查流程
export function patrolProcess(data) {
    return request({
        url: `${urlPorxy}/api/newPatrol/process/getProcessList`,
        method: 'post',
        data
    })
}
export function remindSuperCheckPass(data) {
    return request({
        url: `${urlPorxy}/api/newPatrol/process/doPass`,
        method: 'post',
        data
    })
}

// 审核通过
export function remindSuperExaminePass(data) {
    return request({
        url: `${urlPorxy}/api/newPatrol/process/doJudge`,
        method: 'post',
        data
    })
}
export function problemList(data) {
    return request({
        url: `${urlPorxy}/api/patrol/problem/page`,
        method: 'post',
        data: {
            proType: 'att_res_lm_base', // 工程类型
            proCode: '330624000183', // 工程编码
            ...data
        }
    })
}
// 获取问题详情
export function problemDetail(data) {
    return request({
        url: `${urlPorxy}/api/patrol/problem/detail`,
        method: 'post',
        data
    })
}

// 问题处理
export function hanldProblem(data) {
    return request({
        url: `${urlPorxy}/api/patrol/problem/dispose`,
        method: 'post',
        data
    })
}
// 问题指派
export function assignedProblem(data) {
    return request({
        url: `${urlPorxy}/api/patrol/problem/assign`,
        method: 'post',
        data
    })
}
// 问题整改
export function rectificationProblem(data) {
    return request({
        url: `${urlPorxy}/api/patrol/problem/repair`,
        method: 'post',
        data
    })
}

// 问题确认
export function confirmProblem(data) {
    return request({
        url: `${urlPorxy}/api/patrol/problem/notarize`,
        method: 'post',
        data
    })
}

// 路线详情
export function patrolRouteDerail() {
    return request({
        url: `${urlPorxy}/api/patrol/problem/tree`,
        method: 'post',
        data: {
            proType: 'att_res_lm_base', // 工程类型
            proCode: '330624000183' // 工程编码
        }
    })
}

// 添加问题
export function addProblem(data) {
    return request({
        url: `${urlPorxy}/api/patrol/problem/add`,
        method: 'post',
        data: {
            proType: 'att_res_lm_base', // 工程类型
            proCode: '330624000183', // 工程编码
            proName: '钦寸水库',
            ...data
        }
    })
}

// 获取分管领导列表
export function getLeaderList() {
    return request({
        url: `${urlPorxy}/api/patrol/problem/getSubLeaderList`,
        method: 'post',
        data: {}
    })
}

import { postAxios } from '@/utils/request'
const proxy = '/drsp-api'
// 获取巡查统计分页列表
export const pageFreqMnpdApi = (data) => {
    return postAxios(`${proxy}/api/patrol/freqStat/pageFreqMnpd`, data)
}
// 获取巡查统计数据
export const countFreqMnpdApi = (data) => {
    return postAxios(`${proxy}/api/patrol/freqStat/countFreqMnpd`, data)
}
// 获取巡查日历数据
export const listPatDayApi = (data) => {
    return postAxios(`${proxy}/api/patrol/dailyDetail/listPatDay`, data)
}
// 获取巡查记录列表
export const listCheckApi = (data) => {
    return postAxios(`${proxy}/api/patrol/dailyDetail/listCheck`, data)
}
// 获取记录隐患点为
export const listCheckPointApi = (data) => {
    return postAxios(`${proxy}/api/patrol/dailyDetail/listCheckPoint`, data)
}

// 获取隐患列表
export const problemListByPatrolMainCodeApi = (data) => {
    return postAxios(`${proxy}/api/newPatrol/query/problemListByPatrolMainCode`, data)
}

// 获取台账列表
export const ledgerListApi = (data) => {
    return postAxios(`${proxy}/api/patrol/drspOpt/itemDetail`, data)
}
// 获取导出台账文件
export const generateStbWordApi = (data) => {
    return postAxios(`${proxy}/api/newPatrol/opt/generateStbWord`, data)
}

// 获取巡查统计信息
export const patrolContApi = (data) => {
    return postAxios(`${proxy}/api/patrol/rate/getByProCode`, data)
}

// 巡查提醒列表分页
export const pageFreqMnpdLastApi = (data) => {
    return postAxios(`${proxy}/api/patrol/freqStat/pageFreqMnpdLast`, data)
}

// 巡查提醒统计
export const countFreqMnpdLastApi = (data) => {
    return postAxios(`${proxy}/api/patrol/freqStat/countFreqMnpdLast`, data)
}
// 获取巡查路线
export const getRouteListByProApi = (data) => {
    return postAxios(`${proxy}/api/patrol/drsp/getRouteListByPro`, data)
}
// 获取隐患管理列表
export const getDangerListApi = (data) => {
    return postAxios(`${proxy}/api/defect/pageNew`, data)
}
// 获取隐患管理详情
export function getProblemDetail(data) {
    return postAxios(`${proxy}/api/patrol/problem/getProblemDetail`, data)
}
// 按照行政区划统计巡查率
export function listFreqStatAdcdApi(data) {
    return postAxios(`${proxy}/api/patrol/freqStat/listFreqStatAdcd`, data)
}

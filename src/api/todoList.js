import request from '@/utils/request'

const urlPorxy = '/drsp-patrol'
// 我的待办分页
export function getTodoList(data) {
    return request({
        url: `${urlPorxy}/api/todo/pageTodoInfo`,

        data: {
            proCode: '330624000183', // 工程编码
            proType: 'att_res_lm_base', // 工程类型
            ...data
        }
    })
}
// 删除我的待办
export function delTodoRow(data) {
    return request({
        url: `${urlPorxy}/api/todo/del`,
        data
    })
}

import request from '@/utils/request'

const urlPorxy = '/drsp-patrol'
// 上传文件
export function getKnowledgeList(data) {
    return request({
        url: `${urlPorxy}/api/patrol/qincun/knowledgebase/page`,
        method: 'post',
        data
    })
}

// 新增文件夹
export function addFolder(data) {
    return request({
        url: `${urlPorxy}/api/patrol/qincun/knowledgebase/addDir`,
        method: 'post',
        data
    })
}

// 新增文件
export function addFile(data) {
    return request({
        url: `${urlPorxy}/api/patrol/qincun/knowledgebase/addFile`,
        method: 'post',
        data
    })
}
// 删除文件
export function delFile(data) {
    return request({
        url: `${urlPorxy}/api/patrol/qincun/knowledgebase/delete`,
        method: 'post',
        data
    })
}
// 重命名
export function resetFileName(data) {
    return request({
        url: `${urlPorxy}/api/patrol/qincun/knowledgebase/rename`,
        method: 'post',
        data
    })
}

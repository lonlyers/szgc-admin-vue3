import request from '@/utils/request'

const urlPorxy = '/drsp-storage'
// 上传文件
export function upFile(data) {
    return request({
        url: `${urlPorxy}/api/storage/upload`,
        method: 'post',
        timeout: 50000,
        data
    })
}

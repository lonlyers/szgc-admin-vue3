import request from '@/utils/request'

import { urlPorxy } from '@/config'
// 上传文件
export function upFile(data) {
    return request({
        url: `${urlPorxy}/api/storage/upload`,
        method: 'post',
        timeout: 50000,
        data
    })
}

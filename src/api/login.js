import request from '@/utils/request'
// 得到随机生成的RSA 非对称加密 公钥私钥
export function getRsa(data) {
    return request({
        url: `${'/drsp-upms'}/api/upms/login/getRsa`,
        method: 'post',
        data
    })
}

// app登录
export function appLogin(data) {
    return request({
        url: `${'/drsp-upms'}/api/upms/login/appLogin`,
        method: 'post',
        data
    })
}
export function changePassWord(data) {
    return request({
        url: `${'/drsp-upms'}/api/upms/login/updatePassWord`,
        method: 'post',
        data
    })
}

// 获取手机验证码
export function getCheckCode(data) {
    return request({
        url: `${'/drsp-upms'}/api/upms/login/sendCode`,
        method: 'post',
        data
    })
}
// 重新设置密码
export function editPassword(data) {
    return request({
        url: `${'/drsp-upms'}/api/upms/login/resetPassWord`,
        method: 'post',
        data
    })
}

import request from './request'
import { getToken, setToken } from './tokenInfo'
const urlProxy = '/drsp-auth'
const ticketUrl = '/api/auth/ssoLogin'
const devUrl = '/api/auth/ssoLogin/dev'
const productCode = 'drspQinCun'
// 获取地址栏?后面的参数
const searchParams = window.location.search
    .slice(1)
    .split('&')
    .reduce((prev, cur) => {
        const [key, value] = cur.split('=')
        prev[key] = value
        return prev
    }, {})
// 获取地址栏#后面？附带的参数
const queryStr = window.location.hash.split('?')[1]
const queryParams = queryStr
    ? queryStr.split('&').reduce((prev, cur) => {
          const [key, value] = cur.split('=')
          prev[key] = value
          return prev
      }, {})
    : {}

const haveTicket = searchParams.ticket || queryParams.ticket
// 免登
const singleSign = async (tel) => {
    if (getToken()) return true
    try {
        const { message } = await request({
            url: urlProxy + (haveTicket ? ticketUrl : devUrl),
            data: {
                ticket: haveTicket,
                userName: haveTicket ? null : tel,
                systemCode: productCode,
                productCode: productCode
            }
        })
        setToken(message.token)
        sessionStorage.setItem('userInfo', JSON.stringify(message.userInfo))
        return true
    } catch (error) {
        console.warn(error)
        return false
    }
}

export default singleSign
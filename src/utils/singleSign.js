import { URL_PROXY, PRODUCT_CODE } from '@/config'
import request from './request'
import { getToken, setToken } from './tokenInfo'

const ticketUrl = '/api/auth/ssoLogin'
const devUrl = `/drsp-dev-login/api/upms/login/dev`
console.log()

// 获取地址栏?后面的参数
const searchParams = window.location.search
    .slice(1)
    .split('&')
    .reduce((prev, cur) => {
        const [key, value] = cur.split('=')
        // eslint-disable-next-line no-param-reassign
        prev[key] = value
        return prev
    }, {})
// 获取地址栏#后面？附带的参数
const queryStr = window.location.hash.split('?')[1]
const queryParams = queryStr
    ? queryStr.split('&').reduce((prev, cur) => {
          const [key, value] = cur.split('=')
          // eslint-disable-next-line no-param-reassign
          prev[key] = value
          return prev
      }, {})
    : {}

const haveTicket = searchParams.ticket || queryParams.ticket
const haveOtherToken = searchParams.token || queryParams.token
let haveUserName = searchParams.userName || queryParams.userName
// 免登
const singleSign = async (tel) => {
    if (process.env.NODE_ENV !== 'production') haveUserName = tel
    if (getToken()) return true
    try {
        if (haveOtherToken) {
            setToken(haveOtherToken)
            const { message } = await request({
                url: `${URL_PROXY}/api/upms/user/getUserInfo`,
                data: {
                    token: haveOtherToken
                }
            })
            setToken(message.token)
            sessionStorage.setItem('userInfo', JSON.stringify(message))
            sessionStorage.setItem('loginType', 'singleSign')
            return true
        }
        if (haveTicket || haveUserName) {
            const { message } = await request({
                url: haveTicket ? URL_PROXY + ticketUrl : devUrl,
                data: {
                    ticket: haveTicket,
                    userName: haveTicket ? null : haveUserName,
                    systemCode: PRODUCT_CODE,
                    productCode: PRODUCT_CODE
                }
            })
            setToken(message.token)
            sessionStorage.setItem('userInfo', JSON.stringify(message.userInfo))
            sessionStorage.setItem('loginType', 'singleSign')
            return true
        }
        return false
    } catch (error) {
        return false
    }
}

export default singleSign

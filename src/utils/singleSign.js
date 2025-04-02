import request from './request'
import { getToken, setToken } from './tokenInfo'

const { URL_PROXY, PRODUCT_CODE } = JSON.parse(localStorage.getItem('configs'))

const ticketUrl = '/api/auth/ssoLogin'
const devUrl = `/drsp-dev-login/api/upms/login/dev`

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
const haveOtherTicket = searchParams.otherTicket || queryParams.otherTicket
const haveOtherToken = searchParams.token || queryParams.token
let haveUserName = searchParams.userName || queryParams.userName
// 免登
const singleSign = async (tel) => {
    // if (process.env.NODE_ENV !== 'production') haveUserName = tel
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

        if (haveOtherTicket) {
            const { message } = await request({
                url: `${URL_PROXY}/api/auth/ssoLogin/third`,
                data: {
                    otherTicket: haveOtherTicket,
                    systemCode: PRODUCT_CODE,
                    productCode: PRODUCT_CODE
                }
            })
            setToken(message.token)
            sessionStorage.setItem('userInfo', JSON.stringify(message.userInfo))
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

// 去除地址栏的ticket和userName参数
export const removeLocationParams = () => {
    const { href } = window.location
    const newUrl = href.split('?')[0] + href.split('#')[0].split('?')[1]
    window.history.replaceState({}, '', newUrl)
}
export default singleSign

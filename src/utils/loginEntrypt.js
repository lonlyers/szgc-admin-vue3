// 登陆加密
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min.js' // @3.2.1
import hmacSHA256 from 'crypto-js/hmac-sha256'
import encHex from 'crypto-js/enc-hex'
import { getRsa } from '@/api/login'
export const getmm = () => {
    const chars = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
    ]
    let nums = ''
    for (let i = 0; i < 16; i++) {
        // 这里是几位就要在这里不改变
        const id = parseInt(Math.random() * 61)
        nums += chars[id]
    }
    return nums
}

const entrypt = (userInfo, productCode) => {
    return getRsa({}).then((res) => {
        const key = Object.keys(res.message)[0]
        const t = new Date().getTime()
        const nonce = getmm()
        const r = nonce.substring(0, t % 10)
        const c = '' // 用来存验证码的，水平台登录不需要用到
        const encrypt = new JSEncrypt()
        encrypt.setPublicKey(key)
        const e = encrypt.encrypt(JSON.stringify(userInfo))
        const str = `c=${c}&e=${e}&k=${key}&r=${r}&t=${t}`

        const s = encHex.stringify(hmacSHA256(str, nonce))

        const params = {
            c,
            r: nonce,
            t,
            e,
            k: key,
            s,
            productCode: productCode
        }
        return params
    })
}
export default entrypt

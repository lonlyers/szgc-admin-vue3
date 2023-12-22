const hexToRgba = (hexStr) => {
    // 十六进制颜色值的正则表达式
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    let sColor = hexStr.toLowerCase()
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = '#'
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
            }
            sColor = sColorNew
        }
        // 处理六位的颜色值f
        let sColorChange = []
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`))
        }
        sColorChange.push('0.28')
        let rgbText = `0px 4px 16px 0px rgba(${sColorChange.join(',')})`

        return rgbText
    } else {
        return sColor
    }
}

export default hexToRgba // rgb(0,136,240)

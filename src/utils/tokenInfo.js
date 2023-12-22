const TokenKey = 'qc-res-admin-token'

export function getToken() {
    return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
    return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
    return sessionStorage.remove(TokenKey)
}
export function hasToken() {
    return sessionStorage.getItem(TokenKey)
}

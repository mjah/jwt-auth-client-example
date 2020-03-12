export const ACCESS_TOKEN = "accessToken"
export const REFRESH_TOKEN = "refreshToken"

export const getToken = (tokenId) => {
  return window.localStorage.getItem(tokenId)
}

export const saveToken = (tokenId, token) => {
  window.localStorage.setItem(tokenId, token)
}

export const destroyToken = (tokenId) => {
  window.localStorage.removeItem(tokenId)
}

export default { getToken, saveToken, destroyToken }

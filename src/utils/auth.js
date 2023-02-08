import JsCookie from "js-cookie";

const TokenKey = "niuma-token"
const UserKey = "current-user"
const defaultUser = {
  username: null,
  nickname: null,
  roles: []
}

export const getToken = () => {
  return JsCookie.get(TokenKey)
}

export const setToken = token => {
  return JsCookie.set(TokenKey, token)
}

export const removeToken = () => {
  JsCookie.remove(TokenKey)
}

export const getCurrentUser = () => {
  const user = JsCookie.get(UserKey)
  return user === undefined ? defaultUser : user
}

export const setCurrentUser = currentUser => {
  return JsCookie.set(UserKey, JSON.stringify(currentUser))
}

export const removeCurrentUser = () => {
  JsCookie.remove(UserKey)
}

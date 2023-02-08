import {
  getToken,
  getCurrentUser,
  setToken, removeToken, removeCurrentUser, setCurrentUser,
} from '@/utils/auth.js'
import {createToken} from "@/api/token.js";
import { me } from '@/api/user.js'


const state = () => ({
  token: getToken(),
  currentUser: getCurrentUser()
})

const getters = {
  nicknameFirstWord: state => {
    return state.currentUser ? state.currentUser.nickname.slice(0, 1) : ''
  }
}

const actions = {
  // 登陆操作
  login({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      createToken(username.trim(), password)
        .then(token => {
          // 将 token 存入 state 中
          commit('SET_TOKEN', token)
          // 将 token 存入 cookie 中
          setToken(token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 登出操作
  logout({ commit }) {
    // 重置 state 中的 token 和 roles
    commit('SET_TOKEN', '')
    commit('SET_CURRENT_USER', '')
    // 将 token 从 cookie 中移除
    removeToken()
    removeCurrentUser()
  },
  // 获取当前用户
  fetchCurrentUser({ commit }) {
    return new Promise((resolve, reject) => {
      me()
          .then(currentUser => {
            commit('SET_CURRENT_USER', currentUser)
            setCurrentUser(currentUser)
            resolve(currentUser)
          })
          .catch(error => {
            reject(error)
          })
    })
  }
}

const mutations = {
  // 设置 token 值
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 设置当前用户信息
  SET_CURRENT_USER: (state, currentUser) => {
    state.currentUser = currentUser
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
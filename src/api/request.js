import axios from "axios";
import store from "@/store/index.js";
import {ElMessage} from "element-plus";


const baseURL = 'http://localhost:8080'
const tokenPrefix = "Bearer "

const instance = axios.create({
  baseURL
})

// 请求拦截
instance.interceptors.request.use(
    config => {
      // 判断 store 中的 token 是否存在
      // 如果存在，这将其 token 添加到请求头中
      if (store.state.user.token) {
        config.headers["Authorization"] = tokenPrefix + store.state.user.token
      }
      return config
    },
    error => {
      console.log(error)
      return Promise.reject(error)
    }
)

// 响应拦截
instance.interceptors.response.use(
    response => {
      if (response.data.code) {
        handleErrorResponse(response)
        return Promise.reject(response.data)
      }
      return response.data
    },
    error => {
      handleErrorResponse(error.response)
      return Promise.reject(error)
    }
)

const handleErrorResponse = response => {
  if (response.status === 401 || response.status === 403) {
    store.dispatch('user/logout').then(() => {
      window.location.reload()
    })
  }

  if (response.data instanceof Array) {
    response.data.forEach(item => {
      ElMessage.error(item.message)
    })
  }
  else {
    ElMessage.error(response.data.message)
  }
}

const { get, post, put} = instance

export {get, post, put}

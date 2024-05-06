import axios from "axios";
import { getToken } from "./token";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0', //接口基地址
  timeout: 5000
})

//请求拦截器
request.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

//响应拦截器
request.interceptors.response.use((response) => {
  return response
}, (error) => {
  const navigate = useNavigate()
  let msg = ''
  const status = error.response.status
  switch (status) {
    case 400:
      msg = '请求错误(400)'
      break
    case 401:
      msg = '未授权(401)'
      break
    case 403:
      msg = '拒绝访问(403)'
      break
    case 404:
      msg = '请求出错(404)'
      break
    case 408:
      msg = '请求超时(408)'
      break
    case 500:
      msg = '服务器错误(500)'
      break
    case 501:
      msg = '服务未实现(501)'
      break
    case 502:
      msg = '网络错误(502)'
      break
    case 503:
      msg = '服务不可用(503)'
      break
    case 504:
      msg = '网络超时(504)'
      break
    case 505:
      msg = 'HTTP版本不受支持(505)'
      break
    default:
      msg = `未知错误`
  }
  message.error(msg)
  navigate('/login')
  return Promise.reject(error)
})

export { request }
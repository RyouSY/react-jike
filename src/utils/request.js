import axios from "axios";

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0', //接口基地址
  timeout: 5000
})

//请求拦截器
request.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

//响应拦截器
request.interceptors.response.use((response)=> {
  return response
}, (error)=> {
  return Promise.reject(error)
})

export { request }
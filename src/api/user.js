const { request } = require("@/utils")

export const loginApi = (formData) => {
  return request({
    url: '/authorizations',
    method: 'POST',
    data: formData
  })
}

export const getUserInfoApi = (formData) => {
  return request({
    url: '/user/profile',
    method: 'GET'
  })
}
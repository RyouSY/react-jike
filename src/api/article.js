const { request } = require("@/utils")

export const getChannelApi = () => {
  return request({
    url: '/channels',
    method: 'GET'
  })
}

export const createArticleApi = (data) => {
  return request({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data
  })
}

export const getArticleListApi = (params) => {
  return request({
    url: '/mp/articles',
    method: 'GET',
    params
  })
}

export const deleteArticleListApi = (id) => {
  return request({
    url: `/mp/articles/${id}`,
    method: 'DELETE'
  })
}

export const getArticleApi = (id) => {
  return request({
    url: `/mp/articles/${id}`
  })
}
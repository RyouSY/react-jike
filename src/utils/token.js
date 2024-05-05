export const setToken = (token) => {
  localStorage.setItem('JIKE_TOKEN', token)
}

export const getToken = () => {
  return localStorage.getItem('JIKE_TOKEN')
}

export const removeToken = () => {
  localStorage.removeItem('JIKE_TOKEN')
}

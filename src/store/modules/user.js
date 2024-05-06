import { createSlice } from '@reduxjs/toolkit'
import { getToken, removeToken, setToken } from '@/utils/token'
import { message } from 'antd'
import { getUserInfoApi, loginApi } from '@/api/user'

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  reducers: {
    setUserToken (state, action) {
      state.token = action.payload
      setToken(action.payload)
    },
    getUserInfo (state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo(state){
      state.token = ''
      state.userInfo = {}
      removeToken()
      
    }
  }
})

const { setUserToken, getUserInfo, clearUserInfo } = userStore.actions

const userReducer = userStore.reducer

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    try {
      const result = await loginApi(loginForm)
      dispatch(setUserToken(result.data.data.token))
    } catch (error) {
      message.error('未知错误')
    }
  }
}

const fetchUserInfo = () => {
  return async (dispatch) => {
    try {
      const result = await getUserInfoApi()
    dispatch(getUserInfo(result.data.data))
    } catch (error) {
      message.error('未知错误')
    }
    
  }
}

export { setUserToken, fetchLogin, fetchUserInfo, clearUserInfo }

export default userReducer

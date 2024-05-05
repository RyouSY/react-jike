import { request } from '@/utils'
import { createSlice } from '@reduxjs/toolkit'
import { getToken, setToken } from '@/utils/token'

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: getToken() || ''
  },
  reducers: {
    setUserToken (state, action) {
      state.token = action.payload
      setToken(action.payload)
    }
  }
})

const { setUserToken } = userStore.actions

const userReducer = userStore.reducer

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const result = await request.post('/authorizations', loginForm)
    dispatch(setUserToken(result.data.data.token))
  }
}

export { setUserToken, fetchLogin }

export default userReducer

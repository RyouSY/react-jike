const { getToken } = require("@/utils/token")
const { Navigate } = require("react-router-dom")

export const AuthRoute = ({ children }) => {
  const token = getToken()
  if(token){
    return <>{children}</>
  }else{
    return <Navigate to={'/login'} replace />
  }
}
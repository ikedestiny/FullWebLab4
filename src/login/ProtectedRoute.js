import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"
import useLogin from "../zustandStates/LoginStore"


const ProtectedRoutes = () => {
    //const token = useSelector((state) => state.loginRed.token)
    const token = useLogin(state => state.isLoggedIn)
    return token ? <Outlet /> : <Navigate to={"/"} />
}


export default ProtectedRoutes;
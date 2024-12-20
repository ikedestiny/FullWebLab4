import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

const ProtectedRoutes = () => {
    const token = useSelector((state) => state.loginRed.token)
    return token ? <Outlet /> : <Navigate to={"/"} />
}


export default ProtectedRoutes;
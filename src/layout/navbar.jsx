import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../state/actionCreators/actions";
export default function Navbar() {
    const loginState = useSelector((state)=>state.loginRed)
    const dispatch = useDispatch()
const navigate =  useNavigate()
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <div class="text-center bg-dark text-white p-4 rounded shadow-lg border border-secondary">
                            <h3 class="fw-bold text-uppercase mb-3">Ike Holy Destiny</h3>
                            <h3 class="text-warning mb-3">Variant 374215</h3>
                            <h3 class="text-info">Group P3230</h3>
                        </div>
                    </a>
                    <div > <h1 className="pageTitle">Web Lab 4</h1></div>
                    <div>
                        <button className="btn btn-outline-light mx-2"  onClick={()=>{
                            dispatch(authActions.LOGOUT())
                            navigate("/")
                            
                        }}>{loginState.loggedIn ? "LOGOUT" : "LOGIN"}</button>
                        <Link className="btn btn-outline-light mx-2" to="/register">register</Link>
                        <Link className="btn btn-outline-light mx-2" to="/home">Home</Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}
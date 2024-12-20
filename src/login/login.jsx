import { useDispatch, useSelector } from "react-redux";
import { actions, authActions } from "../state/actionCreators/actions";
import { useEffect } from "react";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const dispatch = useDispatch()
    const state = useSelector((state) => state.authRed)
    const loginReducer = useSelector((state) => state.loginRed)
    console.log(loginReducer)
        let navigate = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch(
            authActions.SEND_CREDS(
                {email:loginReducer.email,password:loginReducer.password},
                () => {
                    // Success callback
                    navigate("/home");
                },
                (error) => {
                    // Failure callback
                    alert(`Login failed: ${error}`);
                }
            )
        );

}

   


    return (

        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header text-center bg-secondary text-white">
                            <h3>Login</h3>
                        </div>
                        <div className="card-body">
                            {/* <form onSubmit={handleSubmit}> */}
                            <form>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={state.email}
                                        onChange={(e) => dispatch(authActions.SET_EMAIL(e.target.value))}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={state.password}
                                        onChange={(e) => dispatch(authActions.SET_PASSWORD(e.target.value))}
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <button onClick={handleLogin} type="submit" className="btn btn-success">
                                        Login!
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
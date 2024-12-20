import { useDispatch, useSelector } from "react-redux";
import Navbar from "../layout/navbar";
import { authActions } from "../state/actionCreators/actions";
import { bindActionCreators } from "redux";





export default function Register() {
    const dispatch = useDispatch()
    const state = useSelector((state) => state.authRed)
    console.log(state)
    let actions = bindActionCreators(authActions,dispatch)
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://127.0.0.1:8080/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(state)

        })

        if (response.status == 201) {
            dispatch(authActions.CLEAR())
            alert("SUCCESS")
            return (
                <p>Sucess</p>
            )
        }
    }







    return (

        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header text-center bg-secondary text-white">
                            <h3>Register</h3>
                        </div>
                        <div className="card-body">
                            {/* <form onSubmit={handleSubmit}> */}
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={state.username}
                                        onChange={(e) => dispatch(authActions.SET_USERNAME(e.target.value))}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={state.email}
                                        onChange={(e) => { dispatch(authActions.SET_EMAIL(e.target.value)) }}
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
                                    <button type="submit" className="btn btn-secondary">
                                        Register
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